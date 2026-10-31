import { next } from "@vercel/functions";
import { Redis } from "@upstash/redis";

export const config = {
  runtime: "nodejs",
  matcher: "/:path*",
};

function getClientIp(request: Request): string | null {
  const rawIp =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!rawIp) return null;

  const ip = rawIp.replace(/^\[|\]$/g, "").trim();
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);

  return mapped ? mapped[1] : ip;
}

function denied(status: number, message: string): Response {
  return new Response(
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Access Restricted</title>
</head>
<body style="font-family:system-ui,sans-serif;background:#090d16;color:#edf2fb;display:grid;min-height:100vh;place-items:center;margin:0;text-align:center">
<main style="max-width:480px;padding:32px">
<h1>Access Restricted</h1>
<p>${message}</p>
</main>
</body>
</html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}

export default async function middleware(
  request: Request,
): Promise<Response> {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();

  if (
    hostname !== "central-london.xyz" &&
    hostname !== "www.central-london.xyz"
  ) {
    return next();
  }

  if (url.pathname.startsWith("/api/")) {
    return next();
  }

  const ip = getClientIp(request);

  if (!ip) {
    console.error("Could not determine visitor IP");
    return denied(403, "We could not verify your IP address.");
  }

  const redisUrl = process.env.clrpc_KV_REST_API_URL;
  const redisToken = process.env.clrpc_KV_REST_API_TOKEN;

  if (!redisUrl || !redisToken) {
    console.error("Redis environment variables are missing");
    return denied(503, "Access verification is temporarily unavailable.");
  }

  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  try {
    const allowed = await redis.sismember("vpn:allowlist", ip);

    if (allowed) {
      console.log("Visitor permitted by Redis allowlist");
      return next();
    }
  } catch (error) {
    console.error("Redis allowlist check failed:", error);
    return denied(503, "Access verification is temporarily unavailable.");
  }

  const apiKey = process.env.IPAPI_KEY;

  if (!apiKey) {
    console.error("IPAPI_KEY is not configured");
    return denied(503, "Access verification is temporarily unavailable.");
  }

  try {
    const response = await fetch("https://api.ipapi.is/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        q: ip,
        key: apiKey,
      }),
      signal: AbortSignal.timeout(7000),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text();

      console.error("ipapi.is request failed:", {
        status: response.status,
        message: errorBody.slice(0, 500),
      });

      return denied(503, "Access verification is temporarily unavailable.");
    }

    const data: {
      is_vpn?: boolean;
      is_proxy?: boolean;
      is_tor?: boolean;
      is_datacenter?: boolean;
    } = await response.json();

    console.log("IP detection results:", {
      vpn: data.is_vpn,
      proxy: data.is_proxy,
      tor: data.is_tor,
      datacenter: data.is_datacenter,
    });

    const blocked =
      data.is_vpn === true ||
      data.is_proxy === true ||
      data.is_tor === true;

    if (blocked) {
      console.log("Visitor blocked by IP detection:", {
        vpn: data.is_vpn === true,
        proxy: data.is_proxy === true,
        tor: data.is_tor === true,
        datacenter: data.is_datacenter === true,
      });

      return denied(
        403,
        "VPNs, proxies, Tor, and hosting network connections are not permitted.",
      );
    }

    console.log("Visitor passed IP detection");

    return next();
  } catch (error) {
    console.error("ipapi.is verification failed:", error);

    return denied(
      503,
      "Access verification is temporarily unavailable.",
    );
  }
}

import { next } from "@vercel/functions";
import { Redis } from "@upstash/redis";

export const config = {
  runtime: "nodejs",
  matcher: "/:path*",
};

const redis = new Redis({
  url: process.env.clrpc_KV_REST_API_URL!,
  token: process.env.clrpc_KV_REST_API_TOKEN!,
});

function getClientIp(request: Request): string | null {
  const rawIp =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!rawIp) return null;

  const ip = rawIp.replace(/^\[|\]$/g, "").trim();

  if (ip.includes(":") && ip.includes(".")) {
    const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
    if (mapped) return mapped[1];
  }

  return ip;
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
    return denied(403, "We could not verify your IP address.");
  }

  try {
    const redisUrl = process.env.clrpc_KV_REST_API_URL;
    const redisToken = process.env.clrpc_KV_REST_API_TOKEN;

    if (!redisUrl || !redisToken) {
      console.error("Redis environment variables are missing");
      return denied(503, "Access verification is temporarily unavailable.");
    }

    const allowed = await redis.sismember("vpn:allowlist", ip);

    if (allowed) {
      return next();
    }

    const token = process.env.IPINFO_TOKEN;

    if (!token) {
      console.error("IPINFO_TOKEN is not configured");
      return denied(503, "Access verification is temporarily unavailable.");
    }

    const response = await fetch(
      `https://api.ipinfo.io/lookup/${encodeURIComponent(ip)}?token=${encodeURIComponent(token)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("IPinfo returned status:", response.status);
      return denied(503, "Access verification is temporarily unavailable.");
    }

    const data: {
      is_anonymous?: boolean;
      is_hosting?: boolean;
    } = await response.json();

    if (data.is_anonymous === true || data.is_hosting === true) {
      return denied(
        403,
        "VPNs, proxies, and anonymous network connections are not permitted.",
      );
    }

    return next();
  } catch (error) {
    console.error("Visitor verification failed:", error);
    return denied(503, "Access verification is temporarily unavailable.");
  }
}

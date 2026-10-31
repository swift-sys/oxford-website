import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { isIP } from "node:net";

const redis = Redis.fromEnv();
const ALLOWLIST_KEY = "vpn:allowlist";

async function verifyAdmin(
  req: VercelRequest,
): Promise<boolean> {
  const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
  const audience = process.env.CF_ACCESS_AUD;
  const token = req.headers["cf-access-jwt-assertion"];

  if (
    !teamDomain ||
    !audience ||
    typeof token !== "string"
  ) {
    return false;
  }

  try {
    const issuer = `https://${teamDomain}`;
    const jwks = createRemoteJWKSet(
      new URL(`${issuer}/cdn-cgi/access/certs`),
    );

    const { payload } = await jwtVerify(token, jwks, {
      issuer,
      audience,
    });

    return (
      typeof payload.email === "string" &&
      payload.email.length > 0
    );
  } catch {
    return false;
  }
}

function normalizeIp(ip: string): string {
  return ip.trim().replace(/^\[|\]$/g, "");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Vary", "Cookie");

  if (req.headers.host?.split(":")[0]?.toLowerCase() !== "admin.central-london.xyz") {
    return res.status(403).json({
      error: "Admin hostname required",
    });
  }

  if (!(await verifyAdmin(req))) {
    return res.status(401).json({
      error: "Cloudflare Access authentication required",
    });
  }

  try {
    if (req.method === "GET") {
      const ips = await redis.smembers<string[]>(ALLOWLIST_KEY);

      return res.status(200).json({
        ips: [...new Set(ips)].sort(),
      });
    }

    if (req.method !== "POST" && req.method !== "DELETE") {
      res.setHeader("Allow", "GET, POST, DELETE");

      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    const rawIp = req.body?.ip;

    if (typeof rawIp !== "string") {
      return res.status(400).json({
        error: "Provide an IP address",
      });
    }

    const ip = normalizeIp(rawIp);

    if (isIP(ip) === 0) {
      return res.status(400).json({
        error: "Enter a valid IPv4 or IPv6 address",
      });
    }

    if (req.method === "POST") {
      await redis.sadd(ALLOWLIST_KEY, ip);

      return res.status(200).json({
        success: true,
        action: "added",
        ip,
      });
    }

    await redis.srem(ALLOWLIST_KEY, ip);

    return res.status(200).json({
      success: true,
      action: "removed",
      ip,
    });
  } catch (error) {
    console.error("Allowlist API error:", error);

    return res.status(500).json({
      error: "Unable to update the IP allowlist",
    });
  }
}

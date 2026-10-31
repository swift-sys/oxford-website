import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ error: "Webhook not configured" });
  }

  try {
    const { visitorId, url, title, referrer, timestamp } = req.body ?? {};

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Invalid page URL" });
    }

    const content = [
      "# <:warning:1565982209008205975> Page View",
      "",
      `<:paper:1565982319678857236> **Page:** ${url}`,
      `**Title:** ${String(title || "Unknown")}`,
      `<:ID:1565982429632532610> **Visitor ID:** ${String(visitorId || "Unknown")}`,
      `**Referrer:** ${String(referrer || "Direct visit")}`,
      `**Time:** ${String(timestamp || new Date().toISOString())}`,
    ].join("\n");

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flags: 1 << 15,
        components: [
          {
            type: 10,
            content: content.slice(0, 4000),
          },
        ],
      }),
    });

    if (!discordResponse.ok) {
      const error = await discordResponse.text();
      console.error("Discord webhook failed:", discordResponse.status, error);
      return res.status(502).json({ error: "Discord webhook failed" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Page view handler failed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

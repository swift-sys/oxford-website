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

    if (typeof url !== "string" || !url) {
      return res.status(400).json({ error: "Invalid page URL" });
    }

    const discordUrl = new URL(webhookUrl);
    discordUrl.searchParams.set("with_components", "true");

    const content = [
      "## Website Page View",
      "",
      `**Page:** ${url}`,
      `**Title:** ${String(title || "Unknown")}`,
      `**Visitor ID:** ${String(visitorId || "Unknown")}`,
      `**Referrer:** ${String(referrer || "Direct visit")}`,
      `**Time:** ${String(timestamp || new Date().toISOString())}`,
    ].join("\n");

    const discordResponse = await fetch(discordUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flags: 32768,
        components: [
          {
            type: 17,
            accent_color: 3447003,
            components: [
              {
                type: 10,
                content: content.slice(0, 4000),
              },
            ],
          },
        ],
      }),
    });

    if (!discordResponse.ok) {
      const details = await discordResponse.text();

      console.error(
        "Discord webhook failed:",
        discordResponse.status,
        details,
      );

      return res.status(502).json({
        error: "Discord webhook failed",
        discordStatus: discordResponse.status,
        details: details.slice(0, 1000),
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Page view handler failed:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

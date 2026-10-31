import { useState } from "react";
import "../styles/maintenance.css";

export default function Maintenance() {
  const [testStatus, setTestStatus] = useState("");

  async function testDiscordWebhook() {
    setTestStatus("Sending test...");

    try {
      const response = await fetch("/api/page-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitorId: "manual-test",
          url: window.location.pathname,
          title: "Discord Webhook Test",
          referrer: document.referrer || "Manual test",
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.text();

      if (!response.ok) {
        setTestStatus(`Failed (${response.status}): ${result}`);
        return;
      }

      setTestStatus(`API responded successfully: ${result}`);
    } catch (error) {
      setTestStatus(
        `Request error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  return (
    <main className="maintenance-page">
      <div className="maintenance-background" />
      <div className="maintenance-overlay" />
      <div className="maintenance-grid" />

      <div className="maintenance-glow maintenance-glow-one" />
      <div className="maintenance-glow maintenance-glow-two" />

      <div className="maintenance-corner-logo">
        <img src="/clrpc_wm.png" alt="Oxford Roleplay" />
      </div>

      <section className="maintenance-content">
        <div className="maintenance-accent-line" />

        <h1>
          This website
          <br />
          <span>is under maintenance.</span>
        </h1>

        <p className="maintenance-description">
          We're making a few improvements behind the scenes
          <br className="desktop-break" />
          to bring you a better experience.
        </p>

        <div className="maintenance-divider" />

        <p className="maintenance-footer">
          Thank you for your patience.
        </p>

        <button
          type="button"
          onClick={testDiscordWebhook}
          disabled={testStatus === "Sending test..."}
          className="discord-test-button"
        >
          Test Discord Webhook
        </button>

        {testStatus && (
          <p role="status" aria-live="polite">
            {testStatus}
          </p>
        )}
      </section>

      <div className="maintenance-bottom-accent" />

      <div className="maintenance-watermark">
        Coded by{" "}
        <a
          href="https://github.com/duckyvxbes"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ducky
        </a>
      </div>
    </main>
  );
}

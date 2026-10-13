import { useEffect, useState } from "react";
import "../styles/maintenance.css";

type ServiceStatus =
  | "operational"
  | "degraded"
  | "outage"
  | "unknown";

export default function Maintenance() {
  const [status, setStatus] =
    useState<ServiceStatus>("unknown");

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch("/api/status");

        if (!response.ok) {
          throw new Error("Status API unavailable");
        }

        const data = await response.json();

        if (
          data.status === "operational" ||
          data.status === "degraded" ||
          data.status === "outage"
        ) {
          setStatus(data.status);
        } else {
          setStatus("unknown");
        }
      } catch {
        setStatus("unknown");
      }
    }

    fetchStatus();

    const interval = setInterval(fetchStatus, 30_000);

    return () => clearInterval(interval);
  }, []);

  const statusText = {
    operational: "All systems operational",
    degraded: "Some systems degraded",
    outage: "Service outage",
    unknown: "Checking system status...",
  }[status];

  return (
    <main className="swft-page">
      <div className="swft-grid" />
      <div className="swft-glow swft-glow-one" />
      <div className="swft-glow swft-glow-two" />

      <header className="swft-header">
        <a href="/" className="swft-brand">
          <div className="swft-brand-mark">
            <span>S</span>
          </div>

          <span className="swft-brand-name">
            Swift
          </span>
        </a>

        <a
          href="/support"
          className="swft-header-link"
        >
          Support
        </a>
      </header>

      <section className="maintenance-content">
        <div className="maintenance-card">
          <div className="maintenance-status">
            <span className="maintenance-status-dot" />
            Maintenance in progress
          </div>

          <h1>
            We&apos;re making
            <span> Swift better.</span>
          </h1>

          <p className="maintenance-description">
            Our website is currently undergoing updates
            and improvements. We&apos;ll be back shortly.
          </p>

          <div className="maintenance-divider" />

          <div className="maintenance-actions">
            <a
              href="/support"
              className="maintenance-primary"
            >
              Get support

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>

            <span className="maintenance-domain">
              swft-bot.xyz
            </span>
          </div>
        </div>
      </section>

      <footer className="swft-footer">
        <span>© 2026 Swift</span>

        <div className="swft-footer-right">
          <span
            className={`swft-footer-dot status-${status}`}
          />

          {statusText}
        </div>
      </footer>
    </main>
  );
}
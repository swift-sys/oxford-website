import { useEffect } from "react";
import "../styles/support.css";

export default function Support() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace("https://discord.gg/f4MnhnQcMT");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="support-page">
      <div className="support-background">
        <div className="support-glow support-glow-left" />
        <div className="support-glow support-glow-right" />
        <div className="support-grid" />
      </div>

      <header className="support-header">
        <a href="/" className="support-back-button">
          Home
        </a>
      </header>

      <section className="support-hero">
        <div className="support-content">
          <div className="support-spinner" />

          <h1>
            Redirecting you
            <br />
            to support.
          </h1>

          <p>
            You&apos;re being redirected to the official SWFT support server.
          </p>

          <a
            href="https://discord.gg/f4MnhnQcMT"
            className="support-manual-link"
          >
            Click here if you aren&apos;t redirected automatically.
          </a>
        </div>
      </section>
    </main>
  );
}
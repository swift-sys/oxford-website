import { useEffect } from "react";
import "../styles/support.css";

export default function Support() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace(
        "https://discord.gg/f4MnhnQcMT",
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="support-page">
      <div className="support-grid" />
      <div className="support-glow" />

      <div className="support-wrap">
        <div className="support-spinner" />

        <h1>Redirecting...</h1>

        <p>
          You&apos;re being redirected to the Swift
          support server.
        </p>

        <a
          href="https://discord.gg/f4MnhnQcMT"
          className="support-link"
        >
          Click here if you aren&apos;t redirected
          automatically.
        </a>
      </div>

      <div className="support-domain">
        swft-bot.xyz
      </div>
    </main>
  );
}
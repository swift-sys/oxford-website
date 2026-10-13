import "../styles/maintenance.css";

export default function Maintenance() {
  return (
    <main className="maintenance-page">
      <div className="maintenance-glow" />

      <div className="maintenance-wrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="maintenance-icon"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>

        <p>This website is currently undergoing changes.</p>

        <div className="maintenance-actions">
          <a className="maintenance-button" href="/support">
            Support
          </a>
        </div>
      </div>

      <div className="maintenance-domain">
        swft-bot.xyz
      </div>
    </main>
  );
}
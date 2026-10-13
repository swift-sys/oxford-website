import "../styles/notfound.css";

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-grid" />
      <div className="notfound-glow" />

      <section className="notfound-wrap">
        <span className="notfound-label">
          ERROR 404
        </span>

        <h1>
          This page doesn&apos;t
          <span> exist.</span>
        </h1>

        <p>
          The page you&apos;re looking for may have been
          moved, deleted, or never existed.
        </p>

        <a href="/" className="notfound-button">
          Return home

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
      </section>

      <div className="notfound-domain">
        swft-bot.xyz
      </div>
    </main>
  );
}
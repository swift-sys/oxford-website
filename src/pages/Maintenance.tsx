import "../styles/maintenance.css";

export default function Maintenance() {
  return (
    <main className="maintenance-page">
      <div className="maintenance-background">
        <div className="maintenance-image" />
        <div className="maintenance-overlay" />

        <div className="maintenance-glow maintenance-glow-left" />
        <div className="maintenance-glow maintenance-glow-right" />
        <div className="maintenance-grid" />
      </div>

      <section className="maintenance-hero">
        <div className="maintenance-content">
          <span className="maintenance-badge">
            <span className="maintenance-status-dot" />
            UNDER CONSTRUCTION
          </span>

          <h1>
            Something better
            <br />
            is <span>on the way.</span>
          </h1>

          <p>
            We&apos;re currently making a few improvements to the site.
            <br />
            We&apos;ll be back before you know it.
          </p>

          <div className="maintenance-divider" />
        </div>
      </section>
    </main>
  );
}

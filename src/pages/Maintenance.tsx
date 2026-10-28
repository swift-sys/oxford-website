import "../styles/maintenance.css";

export default function Maintenance() {
  return (
    <main className="maintenance-page">
      <div className="maintenance-background" aria-hidden="true">
        <div className="maintenance-image" />
        <div className="maintenance-overlay" />
        <div className="maintenance-glow maintenance-glow-left" />
        <div className="maintenance-glow maintenance-glow-right" />
        <div className="maintenance-grid" />
      </div>

      <section className="maintenance-hero">
        <div className="maintenance-content">
          <h1>
            Something better
            <br />
            is <span>on the way.</span>
          </h1>

          <p className="maintenance-description">
            We&apos;re making a few improvements behind the scenes
            <br className="desktop-break" />
            to bring you a better experience.
          </p>

          <div className="maintenance-divider" />

          <p className="maintenance-footer">
            Thank you for your patience.
          </p>
        </div>
      </section>

      <div className="maintenance-bottom-line" aria-hidden="true" />
    </main>
  );
}

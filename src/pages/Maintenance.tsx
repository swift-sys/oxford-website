import "../styles/maintenance.css";

export default function Maintenance() {
  return (
    <main className="maintenance-page">
      {/* Background */}
      <div className="maintenance-background" aria-hidden="true">
        <div className="maintenance-image" />
        <div className="maintenance-overlay" />
        <div className="maintenance-glow maintenance-glow-left" />
        <div className="maintenance-glow maintenance-glow-right" />
        <div className="maintenance-grid" />
      </div>

      {/* Main content */}
      <section className="maintenance-hero">
        <div className="maintenance-content">
          <div className="maintenance-status">
            <span className="maintenance-status-dot" />
            <span>We’ll be back soon</span>
          </div>

          <p className="maintenance-eyebrow">
            A LITTLE PATIENCE. A BETTER EXPERIENCE.
          </p>

          <h1>
            Something better
            <br />
            is <span>on the way.</span>
          </h1>

          <p className="maintenance-description">
            We’re making a few improvements behind the scenes
            <br className="desktop-break" />
            to bring you a better experience.
          </p>

          <div className="maintenance-divider" />

          <p className="maintenance-footer">
            Thank you for your patience.
          </p>
        </div>
      </section>

      {/* Bottom accent */}
      <div className="maintenance-bottom-line" aria-hidden="true" />
    </main>
  );
}

import "../styles/maintenance.css";

export default function Maintenance() {
  return (
    <main className="maintenance-page">
      {/* Background */}
      <div className="maintenance-background" />
      <div className="maintenance-overlay" />
      <div className="maintenance-grid" />

      {/* Decorative lighting */}
      <div className="maintenance-glow maintenance-glow-one" />
      <div className="maintenance-glow maintenance-glow-two" />

      {/* Oxford Roleplay Logo */}
      <div className="maintenance-corner-logo">
        <img
          src="/clrpc_wm.png"
          alt="Oxford Roleplay"
        />
      </div>

      {/* Main Content */}
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
      </section>

      {/* Bottom Accent */}
      <div className="maintenance-bottom-accent" />
    </main>
  );
}

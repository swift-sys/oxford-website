import "../styles/maintenance.css";

export default function Maintenance() {
  return (
    <main className="maintenance-page">
      <div className="maintenance-background">
        <div className="maintenance-glow maintenance-glow-left" />
        <div className="maintenance-glow maintenance-glow-right" />
        <div className="maintenance-grid" />
      </div>

      <header className="maintenance-header">
        <a href="/support" className="maintenance-support-button">
          Support
        </a>
      </header>

      <section className="maintenance-hero">
        <div className="maintenance-content">
          <h1>
            Something better
            <br />
            is on the way.
          </h1>

          <p>
            We&apos;re currently making a few improvements to the site.
          </p>
        </div>
      </section>
    </main>
  );
}
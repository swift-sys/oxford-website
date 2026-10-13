import "../styles/notfound.css";

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-background">
        <div className="notfound-glow notfound-glow-left" />
        <div className="notfound-glow notfound-glow-right" />
        <div className="notfound-grid" />
      </div>

      <header className="notfound-header">
        <a href="/support" className="notfound-support-button">
          Support
        </a>
      </header>

      <section className="notfound-hero">
        <div className="notfound-content">
          <span className="notfound-code">404</span>

          <h1>
            This page doesn&apos;t
            <br />
            exist.
          </h1>

          <p>
            The page you&apos;re looking for may have been moved,
            deleted, or never existed.
          </p>

          <a href="/" className="notfound-home-button">
            Return home
          </a>
        </div>
      </section>
    </main>
  );
}
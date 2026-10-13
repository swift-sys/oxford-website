import "../styles/notfound.css";

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-glow" />

      <div className="notfound-wrap">
        <div className="notfound-code">404</div>

        <h1>Page not found</h1>

        <p>
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <a href="/" className="notfound-button">
          Go home
        </a>
      </div>

      <div className="notfound-domain">
        swft-bot.xyz
      </div>
    </main>
  );
}
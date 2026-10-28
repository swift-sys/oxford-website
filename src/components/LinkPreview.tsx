import "./LinkPreview.css";

type LinkPreviewProps = {
  url: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonUrl: string;
};

export default function LinkPreview({
  url,
  title,
  description,
  image,
  buttonText,
  buttonUrl,
}: LinkPreviewProps) {
  return (
    <article className="link-preview">
      <a
        className="link-preview-url"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
      </a>

      <div className="link-preview-card">
        <div className="link-preview-content">
          <h2>{title}</h2>

          <p>{description}</p>

          <a
            className="link-preview-image-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${title}`}
          >
            <img
              className="link-preview-image"
              src={image}
              alt=""
              loading="lazy"
            />
          </a>

          <a
            className="link-preview-button"
            href={buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{buttonText}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M14 4h6v6M20 4l-9 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

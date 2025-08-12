import React, { useState, useMemo } from "react";

function NewsCard({ article = {}, darkMode }) {
  const { urlToImage, title, description, url, source, publishedAt } = article;

  const fallback =
    "https://via.placeholder.com/800x450.png?text=No+Image+Available";

  // Image URL validator
  const isValidImageUrl = (link) => {
    return (
      link &&
      (link.startsWith("http://") || link.startsWith("https://")) &&
      !link.includes("null") &&
      !link.includes("undefined")
    );
  };

  const [imageSrc, setImageSrc] = useState(
    isValidImageUrl(urlToImage) ? urlToImage : fallback
  );

  // Improved Time Ago
  const timeAgo = useMemo(() => {
    if (!publishedAt) return "";
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const diffSeconds = Math.floor((now - publishedDate) / 1000);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;

    // 1 din se zyada purani news ke liye full date format dikhayein
    return publishedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [publishedAt]);

  return (
    <div
      className={`card h-100 border-0 shadow-sm ${
        darkMode ? "bg-dark text-light" : ""
      }`}
      style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={imageSrc}
          alt={title || "News Image"}
          className="card-img-top"
          style={{
            height: "200px",
            objectFit: "cover",
            width: "100%",
          }}
          loading="lazy"
          onError={() => setImageSrc(fallback)}
        />
        {source?.name && (
          <span
            className="badge bg-primary"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              padding: "6px 10px",
              fontSize: "0.8rem",
            }}
          >
            {source.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title || "Untitled article"}</h5>

        <p
          className="card-text"
          style={{
            flexGrow: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description || "No description available."}
        </p>

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small
            className="text-muted"
            title={publishedAt ? new Date(publishedAt).toLocaleString() : ""}
          >
            {timeAgo}
          </small>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsCard;

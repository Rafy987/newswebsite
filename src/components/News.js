import React, { useEffect, useState } from "react";
import newsData from "../news.json"; // local JSON import

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(newsData); // JSON data state me set
  }, []);

  return (
    <div>
      <h2 className="mb-4">Latest News</h2>
      <div className="row">
        {articles.map((article, index) => {
          const validUrl = article.url && article.url.startsWith("http")
            ? article.url
            : null;

          return (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={article.urlToImage || "https://via.placeholder.com/800x450.png?text=No+Image"}
                  className="card-img-top"
                  alt={article.title || "News image"}
                />
                <div className="card-body">
                  <h5 className="card-title">{article.title || "Untitled News"}</h5>
                  <p className="card-text">{article.description || "No description available."}</p>

                  {validUrl ? (
                   <a
  href={article.url ? article.url : "#"}
  target={article.url ? "_blank" : "_self"}
  rel={article.url ? "noopener noreferrer" : undefined}
  className="btn btn-primary"
>
  Read more
</a>
                  ) : (
                    <button className="btn btn-secondary" disabled>
                      No link available
                    </button>
                  )}
                </div>
                <div className="card-footer text-muted">
                  {article.source || "Unknown Source"} — {article.publishedAt || "Unknown Date"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default News;

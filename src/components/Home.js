  import React, { useState, useEffect } from "react";
  import NewsCard from "./NewsCard";

  export default function Home({ darkMode, searchQuery, category }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [displayCount, setDisplayCount] = useState(6);

    useEffect(() => {
      setLoading(true);

      const API_KEY = "4d2dc9a1c07d4c53aab4a3c55e3ac555";
      const cacheKey = `news_${category}_${searchQuery}`;
      const cacheExpiryKey = `${cacheKey}_expiry`;
      const now = Date.now();

      // Check cached data & expiry
      const cachedData = localStorage.getItem(cacheKey);
      const cacheExpiry = localStorage.getItem(cacheExpiryKey);

      if (cachedData && cacheExpiry && now < parseInt(cacheExpiry, 10)) {
        setArticles(JSON.parse(cachedData));
        setLoading(false);
        setDisplayCount(6);
        return;  // Use cached data, skip fetch
      }

      let apiUrl = "";

      if (searchQuery.trim()) {
        apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          searchQuery
        )}&language=en&apiKey=${API_KEY}`;
      } else {
        apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
      }

      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok" && Array.isArray(data.articles)) {
            const filtered = data.articles.filter(
              (article) =>
                article.url &&
                article.url.startsWith("http") &&
                article.urlToImage &&
                article.urlToImage.startsWith("http")
            );
            setArticles(filtered);

            // Save to localStorage with 1 hour expiry
            localStorage.setItem(cacheKey, JSON.stringify(filtered));
            localStorage.setItem(cacheExpiryKey, (now + 3600000).toString()); // 1 hour = 3600000 ms
          } else {
            setArticles([]);
          }
          setLoading(false);
          setDisplayCount(6);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
          setLoading(false);
          setArticles([]);
        });
    }, [category, searchQuery]);

    const loadMore = () => {
      setDisplayCount((prev) => prev + 6);
    };

    const articlesToShow = articles.slice(0, displayCount);
    const hasMore = displayCount < articles.length;

    if (loading) {
      return (
        <div className="container my-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading latest news...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container my-4">
        <div className="mb-4">
          <h2 className={`mb-2 ${darkMode ? "text-light" : "text-dark"}`}>
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : `Top Headlines - ${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </h2>
          <p className="text-muted">
            {articles.length} article{articles.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-5">
            <div className="display-1 mb-3">📰</div>
            <h4 className={darkMode ? "text-light" : "text-dark"}>No articles found</h4>
            <p className="text-muted">
              Try adjusting your search terms or browse different categories.
            </p>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {articlesToShow.map((article, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <NewsCard article={article} darkMode={darkMode} />
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center load-more-wrap">
                <button className="btn btn-outline-primary btn-lg" onClick={loadMore}>
                  Load More Articles
                </button>
              </div>
            )}

            {!hasMore && articles.length > 6 && (
              <div className="text-center mt-4">
                <p className="text-muted">You've reached the end of the results.</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

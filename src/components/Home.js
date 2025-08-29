import React, { useState, useEffect, useRef } from "react";
import NewsCard from "./NewsCard";
import LoadingBar from "react-top-loading-bar";

export default function Home({ darkMode, searchQuery, category, initialArticles = [] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const loadingBarRef = useRef(null);

  useEffect(() => {
    document.title = searchQuery.trim()
      ? `NewsHub - ${searchQuery}`
      : `NewsHub - ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }, [category, searchQuery]);

  useEffect(() => {
    if (initialArticles.length > 0 && !searchQuery.trim()) {
      setArticles(initialArticles);
      return;
    }

    const fetchNews = async () => {
      setLoading(true);
      loadingBarRef.current.continuousStart();

      try {
        // ✅ Instead of NewsAPI direct URL → Call Netlify Function
        const baseUrl = searchQuery.trim()
  ? `/.netlify/functions/fetchNews?type=search&q=${encodeURIComponent(searchQuery)}`
  : `/.netlify/functions/fetchNews?type=top&category=${category}`;


        console.log("Fetching:", baseUrl);
        const res = await fetch(baseUrl);

        if (!res.ok) {
          throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("API Response:", data);

        if (data.status === "ok" && Array.isArray(data.articles)) {
          const filtered = data.articles.filter(
            (article) =>
              article.url?.startsWith("http") &&
              article.urlToImage?.startsWith("http")
          );
          setArticles(filtered);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("❌ Error fetching news:", error.message);
        setArticles([]);
      } finally {
        setLoading(false);
        loadingBarRef.current.complete();
        setCurrentPage(1);
      }
    };

    fetchNews();
  }, [category, searchQuery, initialArticles]);

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="container my-4">
      <LoadingBar color="#f11946" height={3} ref={loadingBarRef} />

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

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading news...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-5">
          <div className="display-1 mb-3">📰</div>
          <h4 className={darkMode ? "text-light" : "text-dark"}>No articles found</h4>
          <p className="text-muted">Try adjusting your search terms or browse different categories.</p>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {currentArticles.map((article, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-4"
                style={{
                  animation: "fadeInUp 0.6s ease-in-out",
                  animationFillMode: "forwards",
                  opacity: 0,
                }}
              >
                <NewsCard article={article} darkMode={darkMode} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className={darkMode ? "text-light" : "text-dark"}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-primary"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import NewsCard from "./NewsCard";
import LoadingBar from "react-top-loading-bar";

export default function Home({ darkMode, searchQuery, category, initialArticles = [] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const loadingBarRef = useRef(null); // 🔹 Loading bar ka ref

  useEffect(() => {
    if (searchQuery.trim()) {
      document.title = `NewsHub - ${searchQuery}`;
    } else {
      document.title = `NewsHub - ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    }
  }, [category, searchQuery]);

  useEffect(() => {
    if (initialArticles.length > 0 && !searchQuery.trim()) {
      setArticles(initialArticles);
      return;
    }

    const fetchNews = async () => {
      setLoading(true);
      loadingBarRef.current.continuousStart(); // 🔹 Start loading bar
      try {
        const API_KEY = "4d2dc9a1c07d4c53aab4a3c55e3ac555";
        const apiUrl = searchQuery.trim()
          ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&language=en&apiKey=${API_KEY}`
          : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

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
        console.error("Error fetching news:", error);
        setArticles([]);
      } finally {
        setLoading(false);
        loadingBarRef.current.complete(); // 🔹 End loading bar
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

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="container my-4">
      {/* 🔹 Top Loading Bar */}
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
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className={darkMode ? "text-light" : "text-dark"}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-primary"
              onClick={goToNextPage}
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

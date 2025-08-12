import React, { useState, useEffect } from "react";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState({});
  const [ratings, setRatings] = useState({});
  const postsPerPage = 6;
  const API_KEY = "4d2dc9a1c07d4c53aab4a3c55e3ac555";

  useEffect(() => {
    setLoading(true);
    fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setPosts(data.articles);
        } else {
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddComment = (postUrl, commentText) => {
    if (!commentText.trim()) return;

    setComments((prev) => {
      const postComments = prev[postUrl] || [];
      return {
        ...prev,
        [postUrl]: [...postComments, commentText.trim()]
      };
    });
  };

  const handleRatingChange = (postUrl, ratingValue) => {
    setRatings((prev) => ({
      ...prev,
      [postUrl]: ratingValue
    }));
  };

  if (loading) {
    return <div className="text-center my-5">Loading latest blog posts...</div>;
  }

  // Function to encode URL params for sharing
  const encodeParam = (param) => encodeURIComponent(param);

  return (
    <div className="container my-4">
      <h1 className="mb-4">📚  Blogs</h1>

      <div className="row">
        {currentPosts.length > 0 ? (
          currentPosts.map((post, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0 d-flex flex-column">
                <img
                  src={post.urlToImage || "https://via.placeholder.com/800x450.png?text=No+Image"}
                  alt={post.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x450.png?text=No+Image";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted small">
                    {new Date(post.publishedAt).toLocaleDateString()} — {post.author || "Unknown"}
                  </p>
                  <p className="card-text">{post.description}</p>
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary mt-auto w-100 mb-3">
                    Read More →
                  </a>

                  {/* Social Sharing Buttons */}
                  <div className="mb-3 d-flex justify-content-center gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeParam(post.url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on Facebook"
                      style={{ fontSize: "1.2rem", color: "#3b5998" }}
                    >
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeParam(post.url)}&text=${encodeParam(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on Twitter"
                      style={{ fontSize: "1.2rem", color: "#1da1f2" }}
                    >
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeParam(post.url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on LinkedIn"
                      style={{ fontSize: "1.2rem", color: "#0077b5" }}
                    >
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeParam(post.title)}%20${encodeParam(post.url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on WhatsApp"
                      style={{ fontSize: "1.2rem", color: "#25d366" }}
                    >
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </div>

                  {/* Rating */}
                  <div className="mb-2">
                    <strong>Rate this post:</strong>
                    <div>
                      {[1,2,3,4,5].map((star) => (
                        <span
                          key={star}
                          style={{
                            cursor: "pointer",
                            color: (ratings[post.url] || 0) >= star ? "#ffc107" : "#e4e5e9",
                            fontSize: "1.2rem",
                            marginRight: "4px"
                          }}
                          onClick={() => handleRatingChange(post.url, star)}
                          aria-label={`${star} star`}
                        >
                          ★
                        </span>
                      ))}
                      {ratings[post.url] ? <span className="ms-2">({ratings[post.url]} / 5)</span> : null}
                    </div>
                  </div>

                  {/* Comments */}
                  <CommentSection
                    postUrl={post.url}
                    comments={comments[post.url] || []}
                    onAddComment={handleAddComment}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No posts found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

function CommentSection({ postUrl, comments, onAddComment }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComment(postUrl, newComment);
    setNewComment("");
  };

  return (
    <div className="mt-3">
      <h6>Comments ({comments.length})</h6>

      <ul className="list-group mb-2" style={{ maxHeight: "150px", overflowY: "auto" }}>
        {comments.length === 0 && <li className="list-group-item text-muted">No comments yet.</li>}
        {comments.map((comment, i) => (
          <li key={i} className="list-group-item">{comment}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Blog;

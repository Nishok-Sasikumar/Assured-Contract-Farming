import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Sustainable Farming Practices for Better Yields",
      excerpt: "Learn about modern sustainable farming techniques that can improve your crop yields while protecting the environment.",
      image: "/blog.jpg",
      date: "December 10, 2024",
      author: "Dr. Rajesh Kumar",
      category: "Sustainability"
    },
    {
      id: 2,
      title: "Contract Farming: A Win-Win Solution",
      excerpt: "Discover how contract farming benefits both farmers and contractors, creating stable income and reliable supply chains.",
      image: "/feature1.jpg",
      date: "December 8, 2024",
      author: "Priya Sharma",
      category: "Business"
    },
    {
      id: 3,
      title: "Organic Certification Process Simplified",
      excerpt: "A step-by-step guide to getting your farm certified organic and accessing premium markets.",
      image: "/feature2.jpg",
      date: "December 5, 2024",
      author: "Arjun Patel",
      category: "Certification"
    },
    {
      id: 4,
      title: "Technology in Modern Agriculture",
      excerpt: "Explore how IoT, AI, and precision farming technologies are revolutionizing agriculture.",
      image: "/p1.jpg",
      date: "December 3, 2024",
      author: "Tech Team",
      category: "Technology"
    },
    {
      id: 5,
      title: "Market Trends in Vegetable Farming",
      excerpt: "Current market analysis and future trends in vegetable farming and pricing.",
      image: "/p2.jpg",
      date: "December 1, 2024",
      author: "Market Analyst",
      category: "Market Analysis"
    },
    {
      id: 6,
      title: "Water Conservation Techniques",
      excerpt: "Effective water management strategies for sustainable crop production.",
      image: "/p3.jpg",
      date: "November 28, 2024",
      author: "Water Expert",
      category: "Conservation"
    }
  ];

  return (
    <div className="blog-page">
      <div className="blog-header">
        <div className="container">
          <Link to="/" className="back-btn">
            <i className="fas fa-home"></i> Back to Home
          </Link>
          <h1>From Our Blog</h1>
        </div>
      </div>

      <div className="blog-content">
        <div className="container">
          <div className="blog-intro">
            <h2>Latest Insights on Agriculture & Farming</h2>
            <p>Stay updated with the latest trends, tips, and insights in modern agriculture and contract farming.</p>
          </div>

          <div className="blog-grid">
            {blogPosts.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-category">{post.category}</div>
                </div>
                
                <div className="blog-content-area">
                  <div className="blog-meta">
                    <span className="blog-date">
                      <i className="fas fa-calendar"></i>
                      {post.date}
                    </span>
                    <span className="blog-author">
                      <i className="fas fa-user"></i>
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className="blog-title">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="blog-excerpt">{post.excerpt}</p>
                  
                  <Link to={`/blog/${post.id}`} className="read-more">
                    Read More
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="blog-newsletter">
            <div className="newsletter-content">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for the latest farming tips and industry insights.</p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

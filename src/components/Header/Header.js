import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, userType, logout } = useAuth();
  const { getTotalQuantity } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <button 
            className="nav-open-btn" 
            aria-label="open menu" 
            onClick={toggleMenu}
          >
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>

          <Link to="/" className="logo">
            <img src="/images/logo.jpg" alt="Assured Farming" />
            <span>Assured Farming</span>
          </Link>

          <div className="header-actions">
            {isAuthenticated && userType === 'contractor' && (
              <Link to="/buy" className="cart-btn">
                <i className="fas fa-shopping-cart"></i>
                {getTotalQuantity() > 0 && (
                  <span className="cart-count">{getTotalQuantity()}</span>
                )}
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : null}
          </div>

          <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-list">
              <li>
                <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link to="/signup" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                      Sign up
                    </Link>
                  </li>
                  <li>
                    <Link to="/farmer-login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                      Login Farmers
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                      Login Contractors
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {userType === 'contractor' && (
                    <>
                      <li>
                        <Link to="/vendor-request" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                          Submit Request
                        </Link>
                      </li>
                      <li>
                        <Link to="/buy" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                          Browse Products
                        </Link>
                      </li>
                    </>
                  )}
                  {userType === 'farmer' && (
                    <>
                      <li>
                        <Link to="/farmer-dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/sell" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                          My Contracts
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link to="/contract" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                      Contracts
                    </Link>
                  </li>
                  <li>
                    <Link to="/disaster-management" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                      Disaster Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                      Services
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </header>
  );
};

export default Header;

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo-icon">
              <i className="fas fa-seedling"></i>
              <span>Assured Farming</span>
            </div>
            <h4>Contact</h4>
            <div className="contact-info">
              <p><strong>Address:</strong> Kongu Engineering College, Perundurai</p>
              <p><strong>Phone:</strong> +91 9043038902</p>
            </div>
            <div className="social-links">
              <h4>Follow us</h4>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="Pinterest">
                  <i className="fab fa-pinterest-p"></i>
                </a>
                <a href="#" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-section payment-section">
            <h4>Secured Payment Gateways</h4>
            <div className="payment-icons">
              <div className="payment-icon">
                <i className="fab fa-cc-visa"></i>
              </div>
              <div className="payment-icon">
                <i className="fab fa-cc-mastercard"></i>
              </div>
              <div className="payment-icon">
                <i className="fab fa-cc-paypal"></i>
              </div>
              <div className="payment-icon">
                <i className="fas fa-credit-card"></i>
              </div>
              <div className="payment-icon">
                <i className="fab fa-google-pay"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2024 ALL RIGHTS RESERVED CROP CONTRACT</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

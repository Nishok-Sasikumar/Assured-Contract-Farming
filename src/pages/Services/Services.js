import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Contract Farming",
      description: "Connect farmers with contractors for guaranteed crop sales and stable income.",
      icon: "fas fa-handshake",
      features: [
        "Guaranteed market access",
        "Advance payment options",
        "Quality assurance support",
        "Technical guidance"
      ]
    },
    {
      id: 2,
      title: "Quality Assurance",
      description: "Ensure your crops meet the highest quality standards with our certification process.",
      icon: "fas fa-certificate",
      features: [
        "Organic certification",
        "Quality testing",
        "Standards compliance",
        "Documentation support"
      ]
    },
    {
      id: 3,
      title: "Market Intelligence",
      description: "Get real-time market data and pricing information to make informed decisions.",
      icon: "fas fa-chart-line",
      features: [
        "Price forecasting",
        "Market trends analysis",
        "Demand prediction",
        "Competitive analysis"
      ]
    },
    {
      id: 4,
      title: "Technical Support",
      description: "Access expert agricultural advice and modern farming techniques.",
      icon: "fas fa-tools",
      features: [
        "Crop management advice",
        "Pest control guidance",
        "Irrigation planning",
        "Soil health assessment"
      ]
    },
    {
      id: 5,
      title: "Financial Services",
      description: "Flexible payment options and financial support for farmers and contractors.",
      icon: "fas fa-credit-card",
      features: [
        "Secure payment gateway",
        "Advance payment options",
        "Insurance support",
        "Credit facilities"
      ]
    },
    {
      id: 6,
      title: "Logistics Support",
      description: "Efficient transportation and delivery services across Tamil Nadu and Puducherry.",
      icon: "fas fa-truck",
      features: [
        "Timely delivery",
        "Cold chain management",
        "GPS tracking",
        "Flexible scheduling"
      ]
    }
  ];

  return (
    <div className="services-page">
      <div className="services-header">
        <div className="container">
          <Link to="/" className="back-btn">
            <i className="fas fa-home"></i> Back to Home
          </Link>
          <h1>Our Services</h1>
        </div>
      </div>

      <div className="services-content">
        <div className="container">
          <div className="services-intro">
            <h2>Comprehensive Agricultural Solutions</h2>
            <p>We provide end-to-end services to support farmers and contractors in building successful agricultural partnerships.</p>
          </div>

          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  <ul className="service-features">
                    {service.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="services-cta">
            <div className="cta-content">
              <h3>Ready to Get Started?</h3>
              <p>Join thousands of farmers and contractors who trust our platform for their agricultural needs.</p>
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-primary">Join as Farmer</Link>
                <Link to="/signup" className="btn btn-secondary">Join as Contractor</Link>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Address</h4>
                    <p>Kongu Engineering College, Perundurai</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 9043038902</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email</h4>
                    <p>info@cropcontract.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="service-areas">
              <h3>Service Areas</h3>
              <div className="areas-grid">
                <div className="area-item">
                  <i className="fas fa-map"></i>
                  <span>Tamil Nadu</span>
                </div>
                <div className="area-item">
                  <i className="fas fa-map"></i>
                  <span>Puducherry</span>
                </div>
                <div className="area-item">
                  <i className="fas fa-map"></i>
                  <span>Kerala (Select Areas)</span>
                </div>
                <div className="area-item">
                  <i className="fas fa-map"></i>
                  <span>Karnataka (Select Areas)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

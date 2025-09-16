import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { systemAnalytics, vendorRequests, activeContracts, disasterAlerts } from '../../data/products';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/banner-1.avif',
      title: 'Automated Contract Farming',
      subtitle: 'Smart Distribution • Disaster Recovery • Assured Supply',
      description: 'Revolutionary platform that automatically distributes vendor requests among farmers and ensures supply continuity through disaster recovery'
    },
    {
      image: '/images/banner2.jpg',
      title: 'Intelligent Allocation System',
      subtitle: 'AI-Powered Farmer Matching • Real-time Monitoring',
      description: 'Our system intelligently allocates crop requests based on farmer capacity, location, and specialization for optimal results'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Vendor Request',
      description: 'Vendors submit crop requirements with quantity, quality specs, and delivery timeline',
      icon: '📋',
      color: 'primary'
    },
    {
      step: '02',
      title: 'Smart Allocation',
      description: 'AI system automatically distributes requests among suitable farmers based on capacity and location',
      icon: '🤖',
      color: 'secondary'
    },
    {
      step: '03',
      title: 'Contract Execution',
      description: 'Farmers receive allocated contracts with advance payments and cultivation guidelines',
      icon: '🌱',
      color: 'accent'
    },
    {
      step: '04',
      title: 'Disaster Recovery',
      description: 'If disasters affect crops, system automatically redistributes from unaffected areas',
      icon: '🛡️',
      color: 'primary'
    }
  ];

  const liveStats = [
    { number: systemAnalytics.totalFarmers.toLocaleString(), label: 'Registered Farmers', trend: '+12%' },
    { number: systemAnalytics.activeContracts.toLocaleString(), label: 'Active Contracts', trend: '+8%' },
    { number: `${systemAnalytics.totalLandUnderContract.toLocaleString()} acres`, label: 'Land Under Contract', trend: '+15%' },
    { number: `${systemAnalytics.successRate}%`, label: 'Success Rate', trend: '+2%' }
  ];

  const recentActivity = [
    { type: 'request', message: 'New request: 50 tons Tomatoes from Fresh Mart Pvt Ltd', time: '2 mins ago', status: 'pending' },
    { type: 'allocation', message: 'Auto-allocated Rice contract to 3 farmers in Punjab', time: '15 mins ago', status: 'success' },
    { type: 'disaster', message: 'Flood alert in Bihar - Redistribution initiated', time: '1 hour ago', status: 'warning' },
    { type: 'completion', message: 'Contract completed: 40 tons Rice delivered successfully', time: '3 hours ago', status: 'success' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
              <div className="slide-background">
                <img src={slide.image} alt={slide.title} />
                <div className="slide-overlay"></div>
              </div>
              <div className="slide-content">
                <div className="container">
                  <div className="hero-content">
                    <h1 className="hero-title">{slide.title}</h1>
                    <p className="hero-subtitle">{slide.subtitle}</p>
                    <p className="hero-description">{slide.description}</p>
                    <div className="hero-actions">
                      {!user ? (
                        <>
                          <Link to="/login" className="btn btn-primary btn-lg">
                            <span>Join Platform</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="m9 18 6-6-6-6"></path>
                            </svg>
                          </Link>
                          <Link to="/contract" className="btn btn-outline btn-lg">View Demo</Link>
                        </>
                      ) : (
                        <>
                          {user.type === 'vendor' && (
                            <Link to="/vendor-request" className="btn btn-primary btn-lg">Submit Request</Link>
                          )}
                          {user.type === 'farmer' && (
                            <Link to="/farmer-dashboard" className="btn btn-primary btn-lg">View Allocations</Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Live Stats Dashboard */}
      <section className="live-stats">
        <div className="container">
          <div className="stats-header">
            <h2>Live Platform Statistics</h2>
            <div className="live-indicator">
              <span className="pulse"></span>
              <span>Real-time Data</span>
            </div>
          </div>
          <div className="stats-grid">
            {liveStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-trend positive">{stat.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="workflow">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How Automated Contract Farming Works</h2>
            <p className="section-subtitle">Our intelligent system ensures seamless crop production and supply chain management</p>
          </div>
          <div className="workflow-steps">
            {workflowSteps.map((step, index) => (
              <div key={index} className={`workflow-step ${step.color}`}>
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                {index < workflowSteps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="activity-feed">
        <div className="container">
          <div className="activity-content">
            <div className="activity-header">
              <h2>Live Activity Feed</h2>
              <div className="activity-controls">
                <button className="btn btn-ghost btn-sm">View All</button>
              </div>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className={`activity-item ${activity.status}`}>
                  <div className="activity-icon">
                    {activity.type === 'request' && '📋'}
                    {activity.type === 'allocation' && '🤖'}
                    {activity.type === 'disaster' && '⚠️'}
                    {activity.type === 'completion' && '✅'}
                  </div>
                  <div className="activity-content">
                    <p className="activity-message">{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                  <div className={`activity-status ${activity.status}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="platform-features">
        <div className="container">
          <div className="features-content">
            <div className="features-text">
              <h2>Revolutionary Features</h2>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">🎯</div>
                  <div className="feature-content">
                    <h4>Smart Allocation Algorithm</h4>
                    <p>AI-powered system matches vendor requests with optimal farmers based on capacity, location, and expertise</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🌍</div>
                  <div className="feature-content">
                    <h4>Geographic Distribution</h4>
                    <p>Intelligent geographic spread reduces risk and ensures supply continuity across regions</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🛡️</div>
                  <div className="feature-content">
                    <h4>Disaster Recovery System</h4>
                    <p>Automatic redistribution from unaffected areas when disasters impact crop production</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <div className="feature-content">
                    <h4>Real-time Monitoring</h4>
                    <p>Live tracking of contract progress, crop health, and delivery timelines</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="features-visual">
              <div className="system-diagram">
                <div className="diagram-node vendor">
                  <span>Vendors</span>
                  <div className="node-count">89</div>
                </div>
                <div className="diagram-flow"></div>
                <div className="diagram-node system">
                  <span>AI System</span>
                  <div className="node-status active"></div>
                </div>
                <div className="diagram-flow"></div>
                <div className="diagram-node farmers">
                  <span>Farmers</span>
                  <div className="node-count">156</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join the Future of Agriculture</h2>
            <p>Be part of the revolutionary contract farming system that ensures food security and farmer prosperity</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get Started Today
              </Link>
              <Link to="/demo" className="btn btn-outline btn-lg">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

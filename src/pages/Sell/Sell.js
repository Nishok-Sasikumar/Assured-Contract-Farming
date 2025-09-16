import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { contractRequests, currentContracts, completedContracts } from '../../data/products';
import './Sell.css';

const Sell = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const renderContractCard = (contract) => (
    <div key={contract.id} className="contract-card">
      <div className="contract-header">
        <div className="contractor-info">
          <div className="contractor-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div>
            <h3>{contract.contractorName}</h3>
            <p className="crop-info">{contract.crop} - {contract.quantity}</p>
          </div>
        </div>
        <div className="contract-amount">
          <div className="amount">₹{contract.amount}</div>
          <div className="time">{contract.time || contract.completedDate || contract.startDate}</div>
        </div>
      </div>

      <div className="contract-overview">
        <h4>Contract Overview</h4>
        <p>{contract.description}</p>
        
        {contract.status === 'pending' && (
          <div className="contract-details">
            <p><strong>Total Amount:</strong> ₹{contract.totalAmount?.toLocaleString()}</p>
            <p><strong>Price per kg:</strong> ₹{contract.pricePerKg}</p>
            <p><strong>Advance:</strong> ₹{contract.advance?.toLocaleString()}</p>
            <p><strong>Duration:</strong> {contract.duration}</p>
            <p><strong>Deadline:</strong> {contract.deadline}</p>
          </div>
        )}

        {contract.status === 'in_progress' && (
          <div className="contract-progress">
            <p><strong>Progress:</strong> {contract.progress}%</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${contract.progress}%` }}
              ></div>
            </div>
            <p><strong>Expected Completion:</strong> {contract.expectedCompletion}</p>
          </div>
        )}
      </div>

      {contract.status === 'pending' && (
        <div className="contract-actions">
          <button className="decline-btn">DECLINE</button>
          <Link to="/contract" className="view-contract-btn">
            VIEW FULL CONTRACT
          </Link>
          <button className="accept-btn">ACCEPT</button>
        </div>
      )}

      {contract.status === 'completed' && (
        <div className="completed-badge">
          <i className="fas fa-check-circle"></i>
          Completed
        </div>
      )}
    </div>
  );

  const getContractsForTab = () => {
    switch (activeTab) {
      case 'upcoming':
        return contractRequests.filter(c => c.status === 'pending');
      case 'current':
        return currentContracts.filter(c => c.status === 'in_progress');
      case 'completed':
        return completedContracts.filter(c => c.status === 'completed');
      default:
        return [];
    }
  };

  const renderContracts = () => {
    if (getContractsForTab().length === 0) {
      return (
        <div className="no-contracts">
          <p>No contracts found for this category.</p>
        </div>
      );
    } else {
      return getContractsForTab().map(renderContractCard);
    }
  };

  return (
    <div className="sell-page">
      <div className="sell-header">
        <div className="container">
          <Link to="/" className="back-btn">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
          <div className="logo-icon">
            <i className="fas fa-handshake"></i>
            <span>Order Management</span>
          </div>
        </div>
      </div>

      <div className="sell-content">
        <div className="container">
          <h1 className="page-title">Order Requests</h1>

          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              <span>Pending ({contractRequests.length})</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => setActiveTab('current')}
            >
              <span>Current ({currentContracts.length})</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              <span>Completed ({completedContracts.length})</span>
            </button>
          </div>

          <div className="contracts-list">
            {renderContracts()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;

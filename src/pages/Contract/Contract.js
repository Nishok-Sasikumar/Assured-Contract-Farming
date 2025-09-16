import React from 'react';
import { Link } from 'react-router-dom';
import './Contract.css';

const Contract = () => {
  return (
    <div className="contract-page">
      <div className="contract-header">
        <div className="container">
          <Link to="/sell" className="back-btn">
            <i className="fas fa-arrow-left"></i> BACK TO SELL
          </Link>
          
          <div className="page-logo">
            <div className="logo-icon">
              <i className="fas fa-file-contract"></i>
              <span>Contract Agreement</span>
            </div>
          </div>
        </div>
      </div>

      <div className="contract-content">
        <div className="container">
          <section className="contract-document">
            <h2 className="contract-title">ASSURED CONTRACT FARMING AGREEMENT</h2>
            
            <p className="contract-intro">
              This Assured Contract Farming Agreement (the "Agreement") is made and entered into as of [Date], by and between:
            </p>

            <div className="contract-section">
              <h3>RECITALS</h3>
              <p>
                WHEREAS, the Buyer desires to purchase certain agricultural products from the Farmer under specified conditions to ensure a stable supply and market access;
              </p>
              <p>
                WHEREAS, the Farmer desires to grow and supply these products to the Buyer under the terms and conditions set forth herein;
              </p>
              <p>
                NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:
              </p>
            </div>

            <div className="contract-section">
              <h3>SUPPLY AND PURCHASE OBLIGATIONS</h3>
              <div className="contract-points">
                <p><strong>1. Supply Commitment:</strong> The Farmer agrees to grow and supply the Products as specified in Schedule A during the Growing Season.</p>
                <p><strong>2. Quality Standards:</strong> The Products must meet the quality standards set forth in Schedule B.</p>
                <p><strong>3. Quantity and Delivery:</strong> The Farmer agrees to deliver [Quantity] of the Products to [Delivery Location] on or before [Delivery Date(s)]</p>
              </div>
            </div>

            <div className="contract-section">
              <h3>COMPENSATION AND PAYMENT</h3>
              <div className="contract-points">
                <p><strong>3.1 Purchase Price:</strong> The Buyer agrees to pay the Farmer [Price per Unit] for the Products delivered.</p>
                <p><strong>3.2 Payment Terms:</strong> Payment shall be made within [Number] days of receipt of the Products and an invoice from the Farmer.</p>
                <p><strong>3.3 Advance Payment:</strong> The Buyer may provide an advance payment of [Advance Amount] to the Farmer upon execution of this Agreement to support the Farmer's production costs.</p>
              </div>
            </div>

            <div className="contract-section">
              <h3>CONFIDENTIAL INFORMATION</h3>
              <p>
                <strong>1. Confidential Information:</strong> Any proprietary or sensitive information exchanged during the course of this agreement are agreed to be kept confidential by both parties. Such information should not be disclosed with third parties without prior written consent.
              </p>
            </div>

            <div className="contract-section">
              <h3>FARM MANAGEMENT AND SUPPORT</h3>
              <div className="contract-points">
                <p><strong>1. Technical Assistance:</strong> The Buyer shall provide the Farmer with technical support and advice regarding the cultivation of the Products as specified in Schedule C.</p>
                <p><strong>2. Inputs:</strong> The Buyer may supply or subsidize agricultural inputs such as seeds, fertilizers, and pesticides as detailed in Schedule D.</p>
              </div>
            </div>

            <div className="contract-signature">
              <p className="witness-text">
                IN WITNESS WHEREOF, the parties hereto have executed this Assured Contract Farming Agreement as of the date first above written.
              </p>
            </div>

            <div className="contract-schedules">
              <h4>Schedules:</h4>
              <ul>
                <li>Schedule A: Description of Products</li>
                <li>Schedule B: Quality Standards</li>
                <li>Schedule C: Technical Assistance</li>
                <li>Schedule D: Agricultural Inputs</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contract;

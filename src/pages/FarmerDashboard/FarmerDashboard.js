import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { vendorRequests, activeContracts, disasterAlerts } from '../../data/products';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [farmerData, setFarmerData] = useState(null);
  const [allocations, setAllocations] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState('allocations');

  useEffect(() => {
    // Simulate fetching farmer data
    const mockFarmerData = {
      id: 1,
      name: user?.name || 'Rajesh Kumar',
      location: { state: 'Punjab', district: 'Ludhiana', pincode: '141001' },
      totalLand: 25,
      availableLand: 15,
      specializations: ['Wheat', 'Rice', 'Cotton'],
      rating: 4.8,
      totalContracts: 45,
      completedContracts: 42,
      earnings: 2850000
    };

    // Get allocations for this farmer
    const farmerAllocations = vendorRequests.filter(request => 
      request.allocations?.some(allocation => allocation.farmerId === mockFarmerData.id)
    ).map(request => ({
      ...request,
      allocation: request.allocations.find(allocation => allocation.farmerId === mockFarmerData.id)
    }));

    // Get active contracts for this farmer
    const farmerContracts = activeContracts.filter(contract => 
      contract.farmerId === mockFarmerData.id
    );

    // Get relevant disaster alerts
    const relevantAlerts = disasterAlerts.filter(alert => 
      alert.affectedAreas.some(area => 
        area.state === mockFarmerData.location.state ||
        area.district === mockFarmerData.location.district
      )
    );

    setFarmerData(mockFarmerData);
    setAllocations(farmerAllocations);
    setContracts(farmerContracts);
    setAlerts(relevantAlerts);
  }, [user]);

  const handleAllocationResponse = (requestId, response) => {
    setAllocations(prev => prev.map(allocation => 
      allocation.id === requestId 
        ? { ...allocation, allocation: { ...allocation.allocation, status: response } }
        : allocation
    ));
    
    alert(`Allocation ${response === 'accepted' ? 'accepted' : 'declined'} successfully!`);
  };

  const updateContractMilestone = (contractId, milestoneIndex, status) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId 
        ? {
            ...contract,
            milestones: contract.milestones.map((milestone, index) =>
              index === milestoneIndex ? { ...milestone, status } : milestone
            )
          }
        : contract
    ));
  };

  if (!farmerData) {
    return <div className="loading">Loading farmer dashboard...</div>;
  }

  return (
    <div className="farmer-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="farmer-info">
            <div className="farmer-avatar">
              <span>{farmerData.name.charAt(0)}</span>
            </div>
            <div className="farmer-details">
              <h1>Welcome, {farmerData.name}</h1>
              <p>{farmerData.location.district}, {farmerData.location.state}</p>
              <div className="farmer-stats">
                <span className="stat">
                  <strong>{farmerData.rating}</strong> Rating
                </span>
                <span className="stat">
                  <strong>{farmerData.totalLand}</strong> Acres Total
                </span>
                <span className="stat">
                  <strong>{farmerData.availableLand}</strong> Acres Available
                </span>
              </div>
            </div>
          </div>
          
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-number">₹{(farmerData.earnings / 100000).toFixed(1)}L</div>
              <div className="stat-label">Total Earnings</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{farmerData.completedContracts}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{allocations.length}</div>
              <div className="stat-label">New Requests</div>
            </div>
          </div>
        </div>

        {/* Disaster Alerts */}
        {alerts.length > 0 && (
          <div className="disaster-alerts">
            <h3>⚠️ Disaster Alerts</h3>
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-card ${alert.severity}`}>
                <div className="alert-content">
                  <h4>{alert.type} - {alert.severity.toUpperCase()}</h4>
                  <p>{alert.description}</p>
                  <small>Affected: {alert.affectedAreas.map(area => `${area.district}, ${area.state}`).join('; ')}</small>
                </div>
                {alert.redistributionEnabled && (
                  <div className="redistribution-notice">
                    <span>🔄 Auto-redistribution enabled</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'allocations' ? 'active' : ''}`}
            onClick={() => setActiveTab('allocations')}
          >
            New Allocations ({allocations.filter(a => a.allocation.status === 'pending').length})
          </button>
          <button 
            className={`tab ${activeTab === 'contracts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contracts')}
          >
            Active Contracts ({contracts.length})
          </button>
          <button 
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile & Capacity
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'allocations' && (
            <div className="allocations-section">
              <h2>New Allocation Requests</h2>
              {allocations.length === 0 ? (
                <div className="empty-state">
                  <p>No new allocation requests at the moment.</p>
                </div>
              ) : (
                <div className="allocations-grid">
                  {allocations.map(request => (
                    <div key={request.id} className="allocation-card">
                      <div className="allocation-header">
                        <h3>{request.crop}</h3>
                        <span className={`status ${request.allocation.status}`}>
                          {request.allocation.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="allocation-details">
                        <div className="detail-row">
                          <span>Vendor:</span>
                          <strong>{request.vendorName}</strong>
                        </div>
                        <div className="detail-row">
                          <span>Quantity:</span>
                          <strong>{request.allocation.allocatedQuantity} tons</strong>
                        </div>
                        <div className="detail-row">
                          <span>Price:</span>
                          <strong>₹{request.pricePerTon}/ton</strong>
                        </div>
                        <div className="detail-row">
                          <span>Delivery:</span>
                          <strong>{request.deliveryDate}</strong>
                        </div>
                        <div className="detail-row">
                          <span>Location:</span>
                          <strong>{request.location.district}, {request.location.state}</strong>
                        </div>
                        <div className="detail-row">
                          <span>Total Value:</span>
                          <strong>₹{(request.allocation.allocatedQuantity * request.pricePerTon).toLocaleString()}</strong>
                        </div>
                      </div>

                      {request.qualitySpecs && (
                        <div className="quality-specs">
                          <h4>Quality Requirements:</h4>
                          <p>{request.qualitySpecs}</p>
                        </div>
                      )}

                      {request.allocation.status === 'pending' && (
                        <div className="allocation-actions">
                          <button 
                            className="btn btn-primary"
                            onClick={() => handleAllocationResponse(request.id, 'accepted')}
                          >
                            Accept Contract
                          </button>
                          <button 
                            className="btn btn-secondary"
                            onClick={() => handleAllocationResponse(request.id, 'declined')}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="contracts-section">
              <h2>Active Contracts</h2>
              {contracts.length === 0 ? (
                <div className="empty-state">
                  <p>No active contracts at the moment.</p>
                </div>
              ) : (
                <div className="contracts-grid">
                  {contracts.map(contract => (
                    <div key={contract.id} className="contract-card">
                      <div className="contract-header">
                        <h3>{contract.crop}</h3>
                        <span className={`status ${contract.status}`}>
                          {contract.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="contract-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                        <span>{contract.progress}% Complete</span>
                      </div>

                      <div className="contract-details">
                        <div className="detail-row">
                          <span>Quantity:</span>
                          <strong>{contract.quantity} tons</strong>
                        </div>
                        <div className="detail-row">
                          <span>Value:</span>
                          <strong>₹{contract.totalValue.toLocaleString()}</strong>
                        </div>
                        <div className="detail-row">
                          <span>Delivery:</span>
                          <strong>{contract.deliveryDate}</strong>
                        </div>
                      </div>

                      <div className="milestones">
                        <h4>Milestones</h4>
                        {contract.milestones.map((milestone, index) => (
                          <div key={index} className={`milestone ${milestone.status}`}>
                            <div className="milestone-info">
                              <span className="milestone-name">{milestone.name}</span>
                              <span className="milestone-date">{milestone.targetDate}</span>
                            </div>
                            {milestone.status === 'pending' && (
                              <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => updateContractMilestone(contract.id, index, 'completed')}
                              >
                                Mark Complete
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {contract.riskFactors && contract.riskFactors.length > 0 && (
                        <div className="risk-factors">
                          <h4>Risk Factors</h4>
                          {contract.riskFactors.map((risk, index) => (
                            <div key={index} className={`risk-item ${risk.level}`}>
                              <span>{risk.factor}</span>
                              <span className="risk-level">{risk.level}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Farmer Profile & Capacity</h2>
              
              <div className="profile-grid">
                <div className="profile-card">
                  <h3>Land Information</h3>
                  <div className="land-stats">
                    <div className="land-item">
                      <span>Total Land:</span>
                      <strong>{farmerData.totalLand} acres</strong>
                    </div>
                    <div className="land-item">
                      <span>Available Land:</span>
                      <strong>{farmerData.availableLand} acres</strong>
                    </div>
                    <div className="land-item">
                      <span>Utilization:</span>
                      <strong>{((farmerData.totalLand - farmerData.availableLand) / farmerData.totalLand * 100).toFixed(1)}%</strong>
                    </div>
                  </div>
                  
                  <div className="capacity-chart">
                    <div className="chart-bar">
                      <div 
                        className="used-capacity" 
                        style={{ width: `${((farmerData.totalLand - farmerData.availableLand) / farmerData.totalLand) * 100}%` }}
                      ></div>
                    </div>
                    <div className="chart-labels">
                      <span>Used: {farmerData.totalLand - farmerData.availableLand} acres</span>
                      <span>Available: {farmerData.availableLand} acres</span>
                    </div>
                  </div>
                </div>

                <div className="profile-card">
                  <h3>Specializations</h3>
                  <div className="specializations">
                    {farmerData.specializations.map((crop, index) => (
                      <span key={index} className="specialization-tag">
                        {crop}
                      </span>
                    ))}
                  </div>
                  
                  <h4>Performance Metrics</h4>
                  <div className="metrics">
                    <div className="metric">
                      <span>Success Rate:</span>
                      <strong>{((farmerData.completedContracts / farmerData.totalContracts) * 100).toFixed(1)}%</strong>
                    </div>
                    <div className="metric">
                      <span>Average Rating:</span>
                      <strong>{farmerData.rating}/5</strong>
                    </div>
                    <div className="metric">
                      <span>Total Earnings:</span>
                      <strong>₹{(farmerData.earnings / 100000).toFixed(1)}L</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;

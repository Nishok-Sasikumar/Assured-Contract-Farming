import React, { useState, useEffect } from 'react';
import { disasterAlerts, farmers, vendorRequests } from '../../data/products';
import './DisasterManagement.css';

const DisasterManagement = () => {
  const [alerts, setAlerts] = useState([]);
  const [redistributions, setRedistributions] = useState([]);
  const [affectedFarmers, setAffectedFarmers] = useState([]);

  useEffect(() => {
    // Load disaster alerts and calculate redistributions
    const activeAlerts = disasterAlerts.filter(alert => alert.status === 'active');
    setAlerts(activeAlerts);

    // Find affected farmers and contracts
    const affected = [];
    const redistributionQueue = [];

    activeAlerts.forEach(alert => {
      alert.affectedAreas.forEach(area => {
        // Find farmers in affected areas
        const areaFarmers = farmers.filter(farmer => 
          farmer.location.state === area.state && 
          farmer.location.district === area.district
        );

        affected.push(...areaFarmers);

        // Find contracts that need redistribution
        vendorRequests.forEach(request => {
          if (request.allocations) {
            request.allocations.forEach(allocation => {
              const farmer = areaFarmers.find(f => f.id === allocation.farmerId);
              if (farmer && allocation.status === 'accepted') {
                redistributionQueue.push({
                  requestId: request.id,
                  originalFarmerId: farmer.id,
                  originalFarmerName: farmer.name,
                  crop: request.crop,
                  quantity: allocation.allocatedQuantity,
                  urgency: request.urgency,
                  disasterType: alert.type,
                  affectedArea: `${area.district}, ${area.state}`
                });
              }
            });
          }
        });
      });
    });

    setAffectedFarmers(affected);
    setRedistributions(redistributionQueue);
  }, []);

  const executeRedistribution = (redistributionItem) => {
    // Find alternative farmers for redistribution
    const alternativeFarmers = farmers.filter(farmer => 
      farmer.specializations.includes(redistributionItem.crop) &&
      farmer.status === 'active' &&
      farmer.availableLand > 0 &&
      !affectedFarmers.some(af => af.id === farmer.id) // Not in affected areas
    ).sort((a, b) => {
      // Sort by rating and available capacity
      const scoreA = a.rating * 0.6 + (a.availableLand / a.totalLand) * 0.4;
      const scoreB = b.rating * 0.6 + (b.availableLand / b.totalLand) * 0.4;
      return scoreB - scoreA;
    });

    if (alternativeFarmers.length > 0) {
      const selectedFarmer = alternativeFarmers[0];
      
      // Update redistributions list to show completed redistribution
      setRedistributions(prev => prev.map(item => 
        item.requestId === redistributionItem.requestId && 
        item.originalFarmerId === redistributionItem.originalFarmerId
          ? {
              ...item,
              status: 'redistributed',
              newFarmerId: selectedFarmer.id,
              newFarmerName: selectedFarmer.name,
              newFarmerLocation: `${selectedFarmer.location.district}, ${selectedFarmer.location.state}`,
              redistributionDate: new Date().toISOString().split('T')[0]
            }
          : item
      ));

      alert(`Successfully redistributed ${redistributionItem.quantity} tons of ${redistributionItem.crop} to ${selectedFarmer.name} in ${selectedFarmer.location.district}, ${selectedFarmer.location.state}`);
    } else {
      alert('No suitable alternative farmers found for redistribution');
    }
  };

  const getAlertSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="disaster-management">
      <div className="container">
        <div className="management-header">
          <h1>Disaster Management & Auto-Redistribution</h1>
          <p>Real-time monitoring and automatic contract redistribution system</p>
        </div>

        {/* Active Alerts */}
        <div className="alerts-section">
          <h2>Active Disaster Alerts</h2>
          {alerts.length === 0 ? (
            <div className="no-alerts">
              <div className="success-icon">✅</div>
              <h3>All Clear</h3>
              <p>No active disaster alerts at the moment</p>
            </div>
          ) : (
            <div className="alerts-grid">
              {alerts.map(alert => (
                <div key={alert.id} className={`alert-card ${alert.severity}`}>
                  <div className="alert-header">
                    <div className="alert-type">
                      <span className="alert-icon">⚠️</span>
                      <h3>{alert.type}</h3>
                    </div>
                    <div 
                      className="severity-badge"
                      style={{ backgroundColor: getAlertSeverityColor(alert.severity) }}
                    >
                      {alert.severity.toUpperCase()}
                    </div>
                  </div>
                  
                  <p className="alert-description">{alert.description}</p>
                  
                  <div className="affected-areas">
                    <h4>Affected Areas:</h4>
                    <div className="areas-list">
                      {alert.affectedAreas.map((area, index) => (
                        <span key={index} className="area-tag">
                          {area.district}, {area.state}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="alert-stats">
                    <div className="stat">
                      <span className="stat-number">
                        {affectedFarmers.filter(farmer => 
                          alert.affectedAreas.some(area => 
                            farmer.location.state === area.state && 
                            farmer.location.district === area.district
                          )
                        ).length}
                      </span>
                      <span className="stat-label">Affected Farmers</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">
                        {redistributions.filter(r => r.disasterType === alert.type).length}
                      </span>
                      <span className="stat-label">Contracts to Redistribute</span>
                    </div>
                  </div>

                  {alert.redistributionEnabled && (
                    <div className="redistribution-status">
                      <span className="status-icon">🔄</span>
                      <span>Auto-redistribution enabled</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Redistribution Queue */}
        {redistributions.length > 0 && (
          <div className="redistribution-section">
            <h2>Contract Redistributions</h2>
            <div className="redistribution-stats">
              <div className="stat-card">
                <span className="stat-number">
                  {redistributions.filter(r => !r.status).length}
                </span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {redistributions.filter(r => r.status === 'redistributed').length}
                </span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {redistributions.reduce((sum, r) => sum + r.quantity, 0)}
                </span>
                <span className="stat-label">Total Tons</span>
              </div>
            </div>

            <div className="redistribution-list">
              {redistributions.map((item, index) => (
                <div key={index} className={`redistribution-card ${item.status || 'pending'}`}>
                  <div className="redistribution-header">
                    <div className="contract-info">
                      <h3>{item.crop}</h3>
                      <span className="quantity">{item.quantity} tons</span>
                    </div>
                    <div className={`status-badge ${item.status || 'pending'}`}>
                      {item.status === 'redistributed' ? 'Redistributed' : 'Pending'}
                    </div>
                  </div>

                  <div className="redistribution-details">
                    <div className="original-farmer">
                      <h4>Original Allocation</h4>
                      <p><strong>Farmer:</strong> {item.originalFarmerName}</p>
                      <p><strong>Area:</strong> {item.affectedArea}</p>
                      <p><strong>Disaster:</strong> {item.disasterType}</p>
                    </div>

                    {item.status === 'redistributed' && (
                      <div className="new-farmer">
                        <h4>New Allocation</h4>
                        <p><strong>Farmer:</strong> {item.newFarmerName}</p>
                        <p><strong>Location:</strong> {item.newFarmerLocation}</p>
                        <p><strong>Date:</strong> {item.redistributionDate}</p>
                      </div>
                    )}
                  </div>

                  {!item.status && (
                    <div className="redistribution-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={() => executeRedistribution(item)}
                      >
                        Execute Redistribution
                      </button>
                    </div>
                  )}

                  {item.status === 'redistributed' && (
                    <div className="success-indicator">
                      <span className="success-icon">✅</span>
                      <span>Successfully redistributed</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Status */}
        <div className="system-status">
          <h2>System Status</h2>
          <div className="status-grid">
            <div className="status-card">
              <div className="status-icon monitoring">📡</div>
              <h3>Monitoring Active</h3>
              <p>Real-time disaster monitoring across all regions</p>
            </div>
            <div className="status-card">
              <div className="status-icon ai">🤖</div>
              <h3>AI Redistribution</h3>
              <p>Automated contract redistribution based on farmer capacity</p>
            </div>
            <div className="status-card">
              <div className="status-icon recovery">🛡️</div>
              <h3>Disaster Recovery</h3>
              <p>Ensuring supply continuity through geographic distribution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterManagement;

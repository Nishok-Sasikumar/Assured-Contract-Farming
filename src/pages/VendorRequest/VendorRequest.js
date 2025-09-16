import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { availableCrops, farmers, vendorRequests, activeContracts, disasterAlerts } from '../../data/products';
import './VendorRequest.css';

const VendorRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorContact: '',
    crop: '',
    totalQuantity: '',
    pricePerTon: '',
    deliveryDate: '',
    location: {
      state: '',
      district: '',
      pincode: ''
    },
    qualitySpecs: '',
    urgency: 'medium'
  });

  const [allocationPreview, setAllocationPreview] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateAllocation = () => {
    const selectedCrop = availableCrops.find(crop => crop.name === formData.crop);
    if (!selectedCrop || !formData.totalQuantity) return;

    // Filter farmers who can grow this crop
    const suitableFarmers = farmers.filter(farmer => 
      farmer.specializations.includes(formData.crop) && 
      farmer.status === 'active' &&
      farmer.availableLand > 0
    );

    // Calculate allocation based on capacity and location proximity
    const totalQuantity = parseInt(formData.totalQuantity);
    let remainingQuantity = totalQuantity;
    const allocations = [];

    // Sort farmers by rating and available land
    const sortedFarmers = suitableFarmers.sort((a, b) => {
      const scoreA = a.rating * 0.6 + (a.availableLand / a.totalLand) * 0.4;
      const scoreB = b.rating * 0.6 + (b.availableLand / b.totalLand) * 0.4;
      return scoreB - scoreA;
    });

    sortedFarmers.forEach(farmer => {
      if (remainingQuantity <= 0) return;

      // Calculate max quantity this farmer can produce
      const avgYield = parseInt(selectedCrop.avgYieldPerAcre.split('-')[1]) || 10;
      const maxQuantity = Math.min(
        farmer.availableLand * avgYield,
        Math.ceil(remainingQuantity * 0.4) // Max 40% to any single farmer
      );

      if (maxQuantity > 0) {
        const allocatedQuantity = Math.min(maxQuantity, remainingQuantity);
        allocations.push({
          farmerId: farmer.id,
          farmerName: farmer.name,
          location: farmer.location,
          allocatedQuantity,
          landRequired: Math.ceil(allocatedQuantity / avgYield),
          rating: farmer.rating,
          estimatedValue: allocatedQuantity * formData.pricePerTon
        });
        remainingQuantity -= allocatedQuantity;
      }
    });

    setAllocationPreview(allocations);
    setShowPreview(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call to submit request
    const newRequest = {
      id: Date.now(),
      ...formData,
      totalQuantity: parseInt(formData.totalQuantity),
      pricePerTon: parseInt(formData.pricePerTon),
      status: 'pending_allocation',
      requestDate: new Date().toISOString().split('T')[0],
      allocations: allocationPreview.map(allocation => ({
        farmerId: allocation.farmerId,
        allocatedQuantity: allocation.allocatedQuantity,
        status: 'pending'
      }))
    };

    // Show success message and redirect
    alert('Request submitted successfully! Our AI system will automatically allocate to suitable farmers.');
    navigate('/');
  };

  const selectedCrop = availableCrops.find(crop => crop.name === formData.crop);

  return (
    <div className="vendor-request">
      <div className="container">
        <div className="request-header">
          <h1>Submit Crop Request</h1>
          <p>Our AI system will automatically distribute your request among suitable farmers</p>
        </div>

        <div className="request-content">
          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-section">
              <h3>Vendor Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company/Vendor Name *</label>
                  <input
                    type="text"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your company name"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number *</label>
                  <input
                    type="tel"
                    name="vendorContact"
                    value={formData.vendorContact}
                    onChange={handleInputChange}
                    required
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Crop Requirements</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Crop Type *</label>
                  <select
                    name="crop"
                    value={formData.crop}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Crop</option>
                    {availableCrops.map(crop => (
                      <option key={crop.id} value={crop.name}>
                        {crop.name} ({crop.category})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Total Quantity (tons) *</label>
                  <input
                    type="number"
                    name="totalQuantity"
                    value={formData.totalQuantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="Enter quantity in tons"
                  />
                </div>
                <div className="form-group">
                  <label>Price per Ton (₹) *</label>
                  <input
                    type="number"
                    name="pricePerTon"
                    value={formData.pricePerTon}
                    onChange={handleInputChange}
                    required
                    min="1000"
                    placeholder="Enter price per ton"
                  />
                </div>
                <div className="form-group">
                  <label>Delivery Date *</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {selectedCrop && (
                <div className="crop-info">
                  <h4>Crop Information</h4>
                  <div className="crop-details">
                    <span><strong>Growth Period:</strong> {selectedCrop.growthPeriod}</span>
                    <span><strong>Seasons:</strong> {selectedCrop.seasons.join(', ')}</span>
                    <span><strong>Avg Yield:</strong> {selectedCrop.avgYieldPerAcre}/acre</span>
                    <span><strong>Price Range:</strong> ₹{selectedCrop.priceRange.min}-{selectedCrop.priceRange.max}/kg</span>
                  </div>
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>Delivery Location</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter state"
                  />
                </div>
                <div className="form-group">
                  <label>District *</label>
                  <input
                    type="text"
                    name="location.district"
                    value={formData.location.district}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter district"
                  />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    name="location.pincode"
                    value={formData.location.pincode}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{6}"
                    placeholder="Enter 6-digit pincode"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Details</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Quality Specifications</label>
                  <textarea
                    name="qualitySpecs"
                    value={formData.qualitySpecs}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Specify quality requirements, grading standards, etc."
                  />
                </div>
                <div className="form-group">
                  <label>Urgency Level</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={calculateAllocation}
                className="btn btn-secondary"
                disabled={!formData.crop || !formData.totalQuantity}
              >
                Preview Allocation
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!showPreview}
              >
                Submit Request
              </button>
            </div>
          </form>

          {showPreview && (
            <div className="allocation-preview">
              <h3>AI Allocation Preview</h3>
              <p>Our system has identified the following optimal farmer allocation:</p>
              
              <div className="allocation-summary">
                <div className="summary-stats">
                  <div className="stat">
                    <span className="stat-number">{allocationPreview.length}</span>
                    <span className="stat-label">Farmers</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">
                      {allocationPreview.reduce((sum, a) => sum + a.allocatedQuantity, 0)}
                    </span>
                    <span className="stat-label">Total Tons</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">
                      ₹{allocationPreview.reduce((sum, a) => sum + a.estimatedValue, 0).toLocaleString()}
                    </span>
                    <span className="stat-label">Total Value</span>
                  </div>
                </div>
              </div>

              <div className="farmer-allocations">
                {allocationPreview.map((allocation, index) => (
                  <div key={index} className="farmer-card">
                    <div className="farmer-info">
                      <h4>{allocation.farmerName}</h4>
                      <p>{allocation.location.district}, {allocation.location.state}</p>
                      <div className="farmer-rating">
                        <span>Rating: {allocation.rating}/5</span>
                      </div>
                    </div>
                    <div className="allocation-details">
                      <div className="allocation-item">
                        <span>Allocated:</span>
                        <strong>{allocation.allocatedQuantity} tons</strong>
                      </div>
                      <div className="allocation-item">
                        <span>Land Required:</span>
                        <strong>{allocation.landRequired} acres</strong>
                      </div>
                      <div className="allocation-item">
                        <span>Estimated Value:</span>
                        <strong>₹{allocation.estimatedValue.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="disaster-note">
                <div className="note-icon">🛡️</div>
                <div className="note-content">
                  <h4>Disaster Recovery Enabled</h4>
                  <p>If any allocated farmer faces disasters, our system will automatically redistribute their allocation to other available farmers in unaffected areas.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorRequest;

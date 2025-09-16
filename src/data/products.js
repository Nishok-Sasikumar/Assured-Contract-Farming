// Available crops for contract farming
export const availableCrops = [
  { 
    id: 1, 
    name: 'Tomatoes', 
    category: 'Vegetables', 
    image: '/images/tomato.jpg',
    growthPeriod: '90-120 days',
    seasons: ['Kharif', 'Rabi'],
    avgYieldPerAcre: '15-20 tons',
    priceRange: { min: 45, max: 65 }
  },
  { 
    id: 2, 
    name: 'Potatoes', 
    category: 'Vegetables', 
    image: '/images/potato.jpg',
    growthPeriod: '70-120 days',
    seasons: ['Rabi'],
    avgYieldPerAcre: '8-12 tons',
    priceRange: { min: 25, max: 40 }
  },
  { 
    id: 3, 
    name: 'Onions', 
    category: 'Vegetables', 
    image: '/images/onion.jpg',
    growthPeriod: '120-150 days',
    seasons: ['Kharif', 'Rabi'],
    avgYieldPerAcre: '10-15 tons',
    priceRange: { min: 35, max: 50 }
  },
  { 
    id: 4, 
    name: 'Wheat', 
    category: 'Grains', 
    image: '/images/corn.jpg',
    growthPeriod: '120-150 days',
    seasons: ['Rabi'],
    avgYieldPerAcre: '2.5-4 tons',
    priceRange: { min: 20, max: 30 }
  },
  { 
    id: 5, 
    name: 'Rice', 
    category: 'Grains', 
    image: '/images/beans.jpg',
    growthPeriod: '120-150 days',
    seasons: ['Kharif'],
    avgYieldPerAcre: '3-5 tons',
    priceRange: { min: 25, max: 35 }
  }
];

// Registered farmers with their capacity and location
export const farmers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: { state: 'Punjab', district: 'Ludhiana', pincode: '141001' },
    totalLand: 25, // acres
    availableLand: 15,
    specializations: ['Wheat', 'Rice', 'Potatoes'],
    rating: 4.8,
    completedContracts: 12,
    phone: '+91-9876543210',
    status: 'active',
    lastActive: '2024-01-15'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: { state: 'Maharashtra', district: 'Pune', pincode: '411001' },
    totalLand: 18,
    availableLand: 10,
    specializations: ['Tomatoes', 'Onions', 'Cabbage'],
    rating: 4.6,
    completedContracts: 8,
    phone: '+91-9876543211',
    status: 'active',
    lastActive: '2024-01-14'
  },
  {
    id: 3,
    name: 'Suresh Patel',
    location: { state: 'Gujarat', district: 'Ahmedabad', pincode: '380001' },
    totalLand: 30,
    availableLand: 20,
    specializations: ['Tomatoes', 'Potatoes', 'Onions'],
    rating: 4.9,
    completedContracts: 15,
    phone: '+91-9876543212',
    status: 'active',
    lastActive: '2024-01-15'
  },
  {
    id: 4,
    name: 'Lakshmi Devi',
    location: { state: 'Tamil Nadu', district: 'Chennai', pincode: '600001' },
    totalLand: 12,
    availableLand: 8,
    specializations: ['Rice', 'Tomatoes'],
    rating: 4.7,
    completedContracts: 6,
    phone: '+91-9876543213',
    status: 'active',
    lastActive: '2024-01-13'
  }
];

// Vendor requests for agricultural products
export const vendorRequests = [
  {
    id: 1,
    vendorName: 'Fresh Mart Pvt Ltd',
    vendorContact: '+91-9876543220',
    crop: 'Tomatoes',
    totalQuantity: 50, // tons
    pricePerTon: 55000,
    deliveryDate: '2024-06-15',
    location: { state: 'Maharashtra', district: 'Mumbai', pincode: '400001' },
    qualitySpecs: 'Grade A, Fresh, No pesticide residue',
    status: 'pending_allocation',
    requestDate: '2024-01-15',
    urgency: 'high',
    allocations: [] // Will be populated by auto-allocation system
  },
  {
    id: 2,
    vendorName: 'Agro Export Co.',
    vendorContact: '+91-9876543221',
    crop: 'Rice',
    totalQuantity: 100,
    pricePerTon: 32000,
    deliveryDate: '2024-08-20',
    location: { state: 'West Bengal', district: 'Kolkata', pincode: '700001' },
    qualitySpecs: 'Basmati, Premium quality',
    status: 'partially_allocated',
    requestDate: '2024-01-10',
    urgency: 'medium',
    allocations: [
      { farmerId: 1, allocatedQuantity: 40, status: 'confirmed' },
      { farmerId: 4, allocatedQuantity: 30, status: 'confirmed' }
    ]
  }
];

// Active farming contracts
export const activeContracts = [
  {
    id: 1,
    vendorRequestId: 2,
    farmerId: 1,
    farmerName: 'Rajesh Kumar',
    vendorName: 'Agro Export Co.',
    crop: 'Rice',
    allocatedQuantity: 40,
    landAllocated: 10, // acres
    pricePerTon: 32000,
    totalValue: 1280000,
    advancePayment: 256000, // 20%
    plantingDate: '2024-02-01',
    expectedHarvest: '2024-07-15',
    deliveryDate: '2024-08-20',
    status: 'in_progress',
    progress: 65,
    location: { state: 'Punjab', district: 'Ludhiana', pincode: '141001' },
    riskFactors: ['weather', 'pest'],
    insuranceCovered: true,
    milestones: [
      { stage: 'Land Preparation', date: '2024-02-01', status: 'completed' },
      { stage: 'Sowing', date: '2024-02-15', status: 'completed' },
      { stage: 'Growth Monitoring', date: '2024-04-01', status: 'in_progress' },
      { stage: 'Harvesting', date: '2024-07-15', status: 'pending' },
      { stage: 'Delivery', date: '2024-08-20', status: 'pending' }
    ]
  }
];

// Disaster alerts and affected areas
export const disasterAlerts = [
  {
    id: 1,
    type: 'flood',
    severity: 'high',
    affectedAreas: [
      { state: 'Bihar', districts: ['Patna', 'Gaya'], pincode: ['800001', '823001'] }
    ],
    affectedContracts: [],
    dateReported: '2024-01-14',
    status: 'active',
    redistributionRequired: false
  }
];

// System analytics and insights
export const systemAnalytics = {
  totalFarmers: 156,
  activeFarmers: 142,
  totalVendors: 89,
  activeContracts: 234,
  totalLandUnderContract: 2840, // acres
  successRate: 94.2,
  avgContractValue: 850000,
  disasterRecoveryRate: 87.5
};

export const contractRequests = [
  {
    id: 1,
    contractorName: "SUBRAMANIAN",
    crop: "Tomato",
    quantity: "1 ton",
    totalQuantity: "10 tons",
    amount: 1003.54,
    time: "09.50",
    pricePerKg: 38,
    totalAmount: 380000,
    advance: 8000,
    duration: "6 months",
    deadline: "20/12/2024",
    location: "Coimbatore",
    description: "I am Subramanian. I am a vendor from Coimbatore. I need 10 tons of tomatoes after the period of 6 months, within (20/12/2024). A part of 10 ton[1 ton] will be given to you.",
    status: "pending"
  },
  {
    id: 2,
    contractorName: "Kannan",
    crop: "Onion",
    quantity: "1 ton",
    totalQuantity: "10 tons",
    amount: 1210.34,
    time: "11.20",
    pricePerKg: 38,
    totalAmount: 380000,
    advance: 8000,
    duration: "3 months",
    deadline: "20/12/2024",
    location: "Salem",
    description: "I am Kannan. I am a vendor from Salem. I need 10 tons of onion after the period of 3 months, within (20/12/2024). A part of 10 ton[1 ton] will be given to you.",
    status: "pending"
  }
];

export const completedContracts = [
  {
    id: 3,
    contractorName: "Rajesh Kumar",
    crop: "Potato",
    quantity: "2 tons",
    amount: 76000,
    completedDate: "15/10/2024",
    status: "completed"
  }
];

export const currentContracts = [
  {
    id: 4,
    contractorName: "Priya Sharma",
    crop: "Carrot",
    quantity: "1.5 tons",
    amount: 60000,
    startDate: "01/11/2024",
    expectedCompletion: "01/02/2025",
    progress: 65,
    status: "in_progress"
  }
];

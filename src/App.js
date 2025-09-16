import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import FarmerLogin from './pages/Login/FarmerLogin';
import Signup from './pages/Signup/Signup';
import Buy from './pages/Buy/Buy';
import Sell from './pages/Sell/Sell';
import Contract from './pages/Contract/Contract';
import Checkout from './pages/Checkout/Checkout';
import Blog from './pages/Blog/Blog';
import Services from './pages/Services/Services';
import VendorRequest from './pages/VendorRequest/VendorRequest';
import FarmerDashboard from './pages/FarmerDashboard/FarmerDashboard';
import DisasterManagement from './components/DisasterManagement/DisasterManagement';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/farmer-login" element={<FarmerLogin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/contract" element={<Contract />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/services" element={<Services />} />
                <Route path="/vendor-request" element={<VendorRequest />} />
                <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                <Route path="/disaster-management" element={<DisasterManagement />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

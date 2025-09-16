import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { availableCrops } from '../../data/products';
import Cart from '../../components/Cart/Cart';
import './Buy.css';

const Buy = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, getTotalQuantity } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="buy-page">
      <div className="buy-header">
        <div className="container">
          <Link to="/" className="back-btn">
            <i className="fas fa-home"></i> BACK TO HOME
          </Link>
          
          <div className="page-logo">
            <img src="/logo.jpg" alt="Crop Contract" />
          </div>
        </div>
      </div>

      <div className="buy-content">
        <div className="container">
          <header className="products-header">
            <h1>LIST OF PRODUCTS</h1>
            <div className="cart-icon" onClick={toggleCart}>
              <img src="/sicon.jpg" alt="Cart" />
              <div className="cart-quantity">{getTotalQuantity()}</div>
            </div>
          </header>

          <div className="products-grid">
            {availableCrops.map(crop => {
              const product = {
                id: crop.id,
                name: crop.name,
                price: crop.priceRange.max * 1000, // Convert to per ton price
                image: crop.image,
                description: `${crop.category} - ${crop.growthPeriod} growth period. Seasons: ${crop.seasons.join(', ')}`
              };
              return (
                <div key={crop.id} className="product-card">
                  <div className="product-image">
                    <img src={crop.image} alt={crop.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{crop.name}</h3>
                    <div className="product-price">
                      <span className="currency">₹</span>
                      {product.price.toLocaleString()}/ton
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="crop-details">
                      <span className="yield">Yield: {crop.avgYieldPerAcre}/acre</span>
                      <span className="category">{crop.category}</span>
                    </div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Buy;

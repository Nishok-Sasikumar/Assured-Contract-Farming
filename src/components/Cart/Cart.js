import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const handleQuantityChange = (productId, change) => {
    const item = items.find(item => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}
      <div className={`cart ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>CART</h2>
          <button className="close-cart" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-content">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">
                    <span>₹</span>{item.price} / 1 product
                  </div>
                </div>
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <strong>Total: ₹{getTotalPrice().toLocaleString()}</strong>
            </div>
            <div className="cart-buttons">
              <button className="close-btn" onClick={onClose}>
                CLOSE
              </button>
              <Link to="/checkout" className="checkout-btn" onClick={onClose}>
                CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const FarmerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const result = await login(formData.email, formData.password, 'farmer');
      if (result.success) {
        navigate('/sell');
      }
    } catch (error) {
      setErrors(['Invalid email or password']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-form-wrapper">
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">Login Form for Farmers</h2>
              <p className="text-center">Login with your email and password.</p>
              
              {errors.length > 0 && (
                <div className="error">
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}

              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <div className="form-group">
                <button
                  className="form-control btn btn-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <div className="signup-link text-center">
                Not yet a member? <Link to="/signup">Signup now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerLogin;

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        userType: action.payload.userType
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userType: null
      };

    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        userType: action.payload.userType
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    userType: null // 'farmer' or 'contractor'
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('cropContractAuth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        dispatch({ type: 'LOAD_USER', payload: authData });
      } catch (error) {
        console.error('Error loading auth from localStorage:', error);
      }
    }
  }, []);

  // Save auth to localStorage whenever it changes
  useEffect(() => {
    const authData = {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      userType: state.userType
    };
    localStorage.setItem('cropContractAuth', JSON.stringify(authData));
  }, [state.isAuthenticated, state.user, state.userType]);

  const login = (email, password, userType) => {
    // Mock authentication - in real app, this would call an API
    const mockUser = {
      id: 1,
      email: email,
      name: userType === 'farmer' ? 'John Farmer' : 'Jane Contractor',
      phone: '+91 9043038902'
    };

    dispatch({
      type: 'LOGIN',
      payload: {
        user: mockUser,
        userType: userType
      }
    });

    return Promise.resolve({ success: true, user: mockUser });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('cropContractAuth');
  };

  const signup = (userData) => {
    // Mock signup - in real app, this would call an API
    const mockUser = {
      id: Date.now(),
      ...userData
    };

    dispatch({
      type: 'LOGIN',
      payload: {
        user: mockUser,
        userType: userData.userType
      }
    });

    return Promise.resolve({ success: true, user: mockUser });
  };

  const value = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    userType: state.userType,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

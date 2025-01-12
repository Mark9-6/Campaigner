// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AppContext);

  if (!isLoggedIn) {
   
    return <Navigate to="/" />;
  }

  return children;  
}

export default ProtectedRoute;

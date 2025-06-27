import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';
import React from 'react';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Debug: Verifica los valores en consola
  console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  console.log('PrivateRoute - current location:', location.pathname);

  if (!isAuthenticated) {
    // Debug
    console.log('Redirigiendo a /auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
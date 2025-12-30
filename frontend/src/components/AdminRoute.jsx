import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store';

const AdminRoute = () => {
  const { userInfo } = useAuthStore();

  if (userInfo && userInfo.isAdmin) {
    // Authorized Admin
    return <Outlet />;
  } else if (userInfo && !userInfo.isAdmin) {
    // Logged in, but NOT Admin -> 403 Forbidden
    return <Navigate to="/403" replace />;
  } else {
    // Not logged in at all -> Go to Login
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
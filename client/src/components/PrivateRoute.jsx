import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PrivateRoute({ children, adminOnly = false, user }) {
  const location = useLocation();

  console.log('PrivateRoute >> user:', user); // ✅ Debug log

  if (!user) {
    toast.info('Please log in first');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = String(user.role || '').toLowerCase();

  if (adminOnly && role !== 'admin') {
    toast.error('You are not authorized to access this page');
    return <Navigate to="/" replace />;
  }

  return children;
}

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-deep)',
          color: 'var(--text-primary)',
          gap: 16,
        }}
      >
        <div
          className="spinner"
          style={{
            width: 36,
            height: 36,
            border: '3px solid rgba(139, 92, 246, 0.25)',
            borderTopColor: 'var(--violet-bright)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Verifying authorization…</p>
      </div>
    );
  }

  // Not authenticated: redirect to login and preserve target location
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role requirement
  if (requiredRole && user.role !== requiredRole) {
    if (user.role === 'organizer') {
      return <Navigate to="/dashboard/organizer" replace />;
    }
    return <Navigate to="/dashboard/student" replace />;
  }

  return <>{children}</>;
};

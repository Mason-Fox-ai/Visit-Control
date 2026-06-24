// src/router/router.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/pages/login/login';
import MainTeacher from '../components/pages/mainTeacher/mainTeacher';
import MainStudent from '../components/pages/mainStudent/mainStudent';
import { isAuthenticated, getUserRole, type UserRole } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/teacher" 
        element={
          <ProtectedRoute role="teacher">
            <MainTeacher />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/student" 
        element={
          <ProtectedRoute role="student">
            <MainStudent />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;  // ← ОБЯЗАТЕЛЬНО!
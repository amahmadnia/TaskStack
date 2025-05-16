// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy loading pages for better performance
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const TaskList = React.lazy(() => import('../pages/TaskList'));
const TaskDetail = React.lazy(() => import('../pages/TaskDetail'));
const NewTask = React.lazy(() => import('../pages/NewTask'));
const Categories = React.lazy(() => import('../pages/Categories'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Loading component for suspense fallback
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    Loading...
  </div>
);

// Auth guard component
const PrivateRoute = ({ children }) => {
  // Check if user is logged in (for demo purposes we'll just check localStorage)
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/tasks" 
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route 
          path="/tasks/:id" 
          element={
            <PrivateRoute>
              <TaskDetail />
            </PrivateRoute>
          }
        />
        <Route 
          path="/new-task" 
          element={
            <PrivateRoute>
              <NewTask />
            </PrivateRoute>
          }
        />
        <Route 
          path="/categories" 
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route 
          path="/settings" 
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        
        {/* Redirect to dashboard if logged in, otherwise to login */}
        <Route 
          path="/" 
          element={
            localStorage.getItem('user') ? 
              <Navigate to="/dashboard" /> : 
              <Navigate to="/login" />
          } 
        />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
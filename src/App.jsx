import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Pages
import Dashboard from './pages/Dashboard';
import TasksList from './pages/TasksList';
import TaskDetail from './pages/TaskDetail';
import CategoryManagement from './pages/CategoryManagement';
import Settings from './pages/Settings';

// Context Providers
import { ThemeContext, ThemeContextProvider } from './context/ThemeContext';
import { TaskContextProvider } from './context/TaskContext';

// Layout
import Layout from './components/layout/Layout';

// Components
import QuickAddTask from './components/ui/QuickAddTask';

function App() {
  return (
    <ThemeContextProvider>
      <TaskContextProvider>
        <AppContent />
      </TaskContextProvider>
    </ThemeContextProvider>
  );
}

function AppContent() {
  // Get the theme from ThemeContext
  const { theme } = useContext(ThemeContext);
  
  // Create MUI theme based on our theme context
  const muiTheme = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TasksList />} />
            <Route path="/tasks/:taskId" element={<TaskDetail />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <QuickAddTask />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
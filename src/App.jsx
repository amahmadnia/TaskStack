// src/App.js
import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AppLayout from './components/layout/AppLayout';
import { useThemeMode } from './contexts/ThemeContext';

function App() {
  const { mode, toggleColorMode } = useThemeMode();
  
  return (
    <>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <AppLayout toggleColorMode={toggleColorMode} mode={mode}>
            <AppRoutes />
          </AppLayout>
        </Box>
      </Router>
    </>
  );
}

export default App;
// src/contexts/ThemeContext.js
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// Create context
const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

// Custom hook to use the theme context
export const useThemeMode = () => useContext(ThemeContext);

// Color palette and theme configuration (same as in App.js)
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          primary: {
            main: '#6366f1',
            light: '#818cf8',
            dark: '#4f46e5',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#ec4899',
            light: '#f472b6',
            dark: '#db2777',
            contrastText: '#ffffff',
          },
          background: {
            default: '#f9fafb',
            paper: '#ffffff',
            appBar: '#ffffff',
            sidebar: '#ffffff',
          },
          text: {
            primary: '#111827',
            secondary: '#4b5563',
            disabled: '#9ca3af',
          },
          divider: 'rgba(0, 0, 0, 0.12)',
          success: {
            main: '#22c55e',
            light: '#4ade80',
            dark: '#16a34a',
          },
          warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
          },
          error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
          },
          info: {
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#2563eb',
          },
        }
      : {
          // Dark mode palette
          primary: {
            main: '#818cf8',
            light: '#a5b4fc',
            dark: '#6366f1',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#f472b6',
            light: '#f9a8d4',
            dark: '#ec4899',
            contrastText: '#ffffff',
          },
          background: {
            default: '#111827',
            paper: '#1f2937',
            appBar: '#1f2937',
            sidebar: '#1f2937',
          },
          text: {
            primary: '#f9fafb',
            secondary: '#d1d5db',
            disabled: '#6b7280',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
          success: {
            main: '#4ade80',
            light: '#86efac',
            dark: '#22c55e',
          },
          warning: {
            main: '#fbbf24',
            light: '#fcd34d',
            dark: '#f59e0b',
          },
          error: {
            main: '#f87171',
            light: '#fca5a5',
            dark: '#ef4444',
          },
          info: {
            main: '#60a5fa',
            light: '#93c5fd',
            dark: '#3b82f6',
          },
        }),
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: mode === 'light' ? '#4f46e5' : '#6366f1',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0px 4px 20px rgba(0, 0, 0, 0.05)' 
            : '0px 4px 20px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check system preference for dark/light mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  // Get stored theme mode from localStorage or use system preference
  const getInitialMode = () => {
    const storedMode = localStorage.getItem('themeMode');
    return storedMode ? storedMode : prefersDarkMode ? 'dark' : 'light';
  };
  
  const [mode, setMode] = useState(getInitialMode);
  
  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);
  
  // Toggle between dark and light mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Create theme based on current mode
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  // Context value
  const contextValue = useMemo(() => ({
    mode,
    toggleColorMode,
  }), [mode]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
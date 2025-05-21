// src/theme.js
import { createTheme } from '@mui/material/styles';

// Custom color palette
const customColors = {
  primary: {
    main: '#219ebc',
    light: '#8ecae6',
    dark: '#023047',
    contrastText: '#fff',
  },
  secondary: {
    main: '#ffb703',
    light: '#ffcb47',
    dark: '#fb8500',
    contrastText: '#000',
  },
  error: {
    main: '#fb8500',
    light: '#ff9e2c',
    dark: '#d96e00',
    contrastText: '#fff',
  },
  warning: {
    main: '#ffb703',
    light: '#ffce45',
    dark: '#cc9200',
    contrastText: '#000',
  },
  info: {
    main: '#8ecae6',
    light: '#b5dcef',
    dark: '#5ba2c7',
    contrastText: '#000',
  },
  success: {
    main: '#4caf50',
    light: '#80e27e',
    dark: '#087f23',
    contrastText: '#fff',
  },
};

// Create theme function that can be used with different modes
export const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...customColors,
      background: {
        default: mode === 'dark' ? '#021b2f' : '#f5f9fc',
        paper: mode === 'dark' ? '#022b4a' : '#fff',
      },
      text: {
        primary: mode === 'dark' ? '#fff' : '#023047',
        secondary: mode === 'dark' ? '#8ecae6' : '#5a6978',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Arial", sans-serif',
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
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
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
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark' 
              ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
              : '0 4px 20px rgba(8, 78, 110, 0.1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#023047' : '#219ebc',
          },
        },
      },
    },
  });
};

export default createAppTheme;
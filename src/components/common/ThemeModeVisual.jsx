// src/components/common/ThemeModeVisual.js
import React from 'react';
import { Box, Typography, useTheme, Paper } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';
import ThemeSwitch from './ThemeSwitch';

const ThemeModeVisual = () => {
  const theme = useTheme();
  const { mode } = useThemeMode();
  
  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: 4,
        borderRadius: 4,
        background: mode === 'light'
          ? 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)'
          : 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Sun/Moon icons */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: mode === 'light'
            ? 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)'
            : 'radial-gradient(circle, #e5e7eb 0%, #d1d5db 100%)',
          boxShadow: mode === 'light'
            ? '0 0 40px rgba(251, 191, 36, 0.5)'
            : 'none',
          transition: 'all 0.5s ease',
        }}
      >
        {mode === 'dark' && (
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              background: '#1f2937',
              transform: 'translateX(-15%) translateY(-5%)',
            }}
          />
        )}
      </Box>
      
      {/* Stars (only visible in dark mode) */}
      {mode === 'dark' && (
        <>
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 3 + 1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            
            return (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  backgroundColor: '#f9fafb',
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `twinkle ${animationDuration}s infinite ease-in-out alternate`,
                  '@keyframes twinkle': {
                    '0%': { opacity: 0.3 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            );
          })}
        </>
      )}
      
      {/* Clouds (only visible in light mode) */}
      {mode === 'light' && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              right: '35%',
              width: 80,
              height: 30,
              borderRadius: 15,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              animation: 'floatCloud 9s infinite ease-in-out',
              '@keyframes floatCloud': {
                '0%': { transform: 'translateX(0)' },
                '50%': { transform: 'translateX(-30px)' },
                '100%': { transform: 'translateX(0)' },
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              right: '15%',
              width: 60,
              height: 25,
              borderRadius: 12.5,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              animation: 'floatCloud2 7s infinite ease-in-out',
              '@keyframes floatCloud2': {
                '0%': { transform: 'translateX(0)' },
                '50%': { transform: 'translateX(20px)' },
                '100%': { transform: 'translateX(0)' },
              },
            }}
          />
        </>
      )}
      
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '60%',
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          fontWeight={700}
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 3,
          }}
        >
          {mode === 'light'
            ? 'Clean and bright interface for optimal readability during daytime.'
            : 'Easy on the eyes with reduced brightness, perfect for nighttime work.'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ThemeSwitch variant="icon" />
          <Typography
            variant="body2"
            sx={{
              ml: 2,
              color: theme.palette.text.secondary,
            }}
          >
            Toggle Theme Mode
          </Typography>
        </Box>
      </Box>
      
      {/* Decoration element */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-5%',
          left: '-5%',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          background: mode === 'light'
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 50%, rgba(99, 102, 241, 0) 70%)'
            : 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, rgba(129, 140, 248, 0.05) 50%, rgba(129, 140, 248, 0) 70%)',
          zIndex: 0,
        }}
      />
    </Paper>
  );
};

export default ThemeModeVisual;
// src/pages/NotFound.js
import React from 'react';
import { Box, Typography, Button, Container, useTheme, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 4,
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(129, 140, 248, 0.05) 0%, rgba(244, 114, 182, 0.05) 100%)',
            border: `1px solid ${theme.palette.divider}`,
            width: '100%',
            maxWidth: 600,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontWeight={700}
            sx={{
              fontSize: { xs: '6rem', sm: '8rem' },
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)'
                : 'linear-gradient(90deg, #818cf8 0%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            component="h2"
            fontWeight={600}
            gutterBottom
          >
            Page Not Found
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 450, mx: 'auto' }}
          >
            The page you're looking for doesn't exist or has been moved. 
            Please check the URL or return to the dashboard.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Back to Home
          </Button>
        </Paper>
        
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(129, 140, 248, 0.1) 0%, rgba(129, 140, 248, 0.05) 100%)',
            zIndex: -1,
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '15%',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(244, 114, 182, 0.1) 0%, rgba(244, 114, 182, 0.05) 100%)',
            zIndex: -1,
          }}
        />
      </Box>
    </Container>
  );
};

export default NotFound;
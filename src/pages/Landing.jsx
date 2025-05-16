// src/pages/Landing.js
import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  useTheme, 
  useMediaQuery,
  Avatar
} from '@mui/material';
import { 
  CheckCircle, 
  AccessTime, 
  Category, 
  Settings, 
  DarkMode,
  Analytics
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ThemeSwitch from '../components/common/ThemeSwitch';

const Feature = ({ icon, title, description }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.palette.mode === 'light' 
            ? '0 16px 30px rgba(0, 0, 0, 0.1)' 
            : '0 16px 30px rgba(0, 0, 0, 0.4)',
        }
      }}
    >
      <CardContent>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Box>
        <Typography 
          variant="h6" 
          component="h3" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Landing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const features = [
    {
      icon: <CheckCircle />,
      title: 'Task Management',
      description: 'Create, organize, and track your tasks with ease. Set priorities and deadlines to stay on top of your work.'
    },
    {
      icon: <Category />,
      title: 'Custom Categories',
      description: 'Organize tasks with custom categories and labels. Color-code your tasks for better visual organization.'
    },
    {
      icon: <AccessTime />,
      title: 'Due Dates & Reminders',
      description: 'Never miss a deadline with our reminder system. Set due dates and get notified when tasks are approaching.'
    },
    {
      icon: <Analytics />,
      title: 'Progress Tracking',
      description: 'Monitor your productivity with visual statistics and reports. See how much you\'ve accomplished over time.'
    },
    {
      icon: <DarkMode />,
      title: 'Dark & Light Mode',
      description: 'Work comfortably day or night with our customizable theme options. Easy on the eyes, always.'
    },
    {
      icon: <Settings />,
      title: 'Fully Customizable',
      description: 'Tailor the app to your workflow with customizable views, filters, and settings.'
    }
  ];
  
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Header with navigation */}
      <Box 
        component="header" 
        sx={{ 
          py: 2, 
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main
          }}
        >
          TaskFlow
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ThemeSwitch variant="simple" compact />
          
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{ mr: 1 }}
          >
            Login
          </Button>
          
          <Button
            variant="contained"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      
      {/* Hero section */}
      <Box 
        sx={{ 
          pt: isMobile ? 8 : 12, 
          pb: isMobile ? 10 : 16,
          textAlign: 'center',
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0) 100%)'
            : 'linear-gradient(180deg, rgba(129, 140, 248, 0.08) 0%, rgba(129, 140, 248, 0) 100%)',
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 3,
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)'
                : 'linear-gradient(90deg, #818cf8 0%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Manage Your Tasks with Ease
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p"
            color="text.secondary"
            sx={{ 
              mb: 5,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Stay organized, focused, and in control of your tasks with our powerful yet simple task management application.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/register')}
              sx={{ 
                px: 4, 
                py: 1.5,
                fontWeight: 600,
                background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #4f46e5 0%, #db2777 100%)',
                }
              }}
            >
              Get Started - It's Free
            </Button>
            
            <Button 
              variant="outlined" 
              size="large"
              sx={{ px: 4, py: 1.5 }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Features section */}
      <Container sx={{ py: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Features
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Feature {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* CTA section */}
      <Box 
        sx={{ 
          py: 8, 
          mt: 4,
          bgcolor: theme.palette.primary.main,
          color: '#fff',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Ready to Get Organized?
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Sign up today and take control of your tasks and productivity.
          </Typography>
          
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/register')}
            sx={{ 
              bgcolor: '#fff',
              color: theme.palette.primary.main,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            Start for Free
          </Button>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          textAlign: 'center',
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper
        }}
      >
        <Container>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
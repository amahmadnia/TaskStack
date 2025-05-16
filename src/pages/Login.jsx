// src/pages/Login.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  useTheme,
  Divider
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  GitHub,
  Google
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import ThemeSwitch from '../components/common/ThemeSwitch';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // For demo purposes, we'll use localStorage to simulate login
      try {
        // In a real app, you would send a request to your API
        // Example API call: await api.login(formData.email, formData.password)
        
        // For demo, we'll just check for any user with matching credentials
        const user = {
          id: '123',
          email: formData.email,
          name: 'Demo User'
        };
        
        // Store user information in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        setLoginError('Invalid email or password. Please try again.');
      }
    }
  };
  
  const handleDemoLogin = () => {
    // Set demo credentials and login
    const demoUser = {
      id: 'demo123',
      email: 'demo@example.com',
      name: 'Demo User'
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    navigate('/dashboard');
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.default
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <RouterLink to="/" style={{ textDecoration: 'none' }}>
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
        </RouterLink>
        
        <ThemeSwitch variant="simple" compact />
      </Box>
      
      {/* Login Form */}
      <Container 
        component="main" 
        maxWidth="sm" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          py: 4
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            boxShadow: theme.palette.mode === 'light'
              ? '0px 4px 20px rgba(0, 0, 0, 0.05)'
              : '0px 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Welcome Back
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mb: 4 }}
          >
            Sign in to continue to TaskFlow
          </Typography>
          
          {/* Show login error if any */}
          {loginError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {loginError}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Link 
                component={RouterLink} 
                to="/forgot-password" 
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                py: 1.5,
                mb: 2,
                fontWeight: 600
              }}
              startIcon={<LoginIcon />}
            >
              Sign In
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              sx={{ 
                py: 1.5,
                mb: 3,
                fontWeight: 600
              }}
              onClick={handleDemoLogin}
            >
              Try Demo Account
            </Button>
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
            
            {/* Social login buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{ py: 1.2 }}
              >
                Google
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHub />}
                sx={{ py: 1.2 }}
              >
                GitHub
              </Button>
            </Box>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 500
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
      
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          mt: 'auto'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
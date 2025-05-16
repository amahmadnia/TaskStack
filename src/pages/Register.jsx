// src/pages/Register.js
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
  Divider,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  PersonAdd as PersonAddIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  Google,
  GitHub
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import ThemeSwitch from '../components/common/ThemeSwitch';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Form steps
  const steps = ['Account Details', 'Personal Information', 'Preferences'];
  const [activeStep, setActiveStep] = useState(0);
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: '',
    acceptTerms: false
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Registration error
  const [registerError, setRegisterError] = useState('');
  
  // Handle form input change
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'acceptTerms' ? checked : value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    if (activeStep === 0) {
      // Validate email
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      // Validate password
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      // Validate confirm password
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (activeStep === 1) {
      // Validate first name
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      
      // Validate last name
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      
      // Validate username
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }
    } else if (activeStep === 2) {
      // Validate terms acceptance
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      try {
        // For demo purposes, we'll just store the user in localStorage
        const user = {
          id: Date.now(),
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username
        };
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        setRegisterError('Registration failed. Please try again.');
      }
    }
  };
  
  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              margin="normal"
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="body1" paragraph>
              We're almost done! Just a few more preferences to set up your account.
            </Typography>
            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={formData.acceptTerms} 
                  onChange={handleChange} 
                  name="acceptTerms" 
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I accept the{' '}
                  <Link href="#" underline="hover">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="#" underline="hover">
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
            {errors.acceptTerms && (
              <Typography color="error" variant="caption" display="block">
                {errors.acceptTerms}
              </Typography>
            )}
          </Box>
        );
      default:
        return 'Unknown step';
    }
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
      
      {/* Registration form */}
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
            Create Account
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mb: 4 }}
          >
            Join TaskFlow to start organizing your tasks
          </Typography>
          
          {/* Show registration error if any */}
          {registerError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {registerError}
            </Alert>
          )}
          
          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<CheckIcon />}
                >
                  Complete Registration
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                >
                  Continue
                </Button>
              )}
            </Box>
          </form>
          
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          {/* Social registration buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{ py: 1.2 }}
            >
              Sign up with Google
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHub />}
              sx={{ py: 1.2 }}
            >
              Sign up with GitHub
            </Button>
          </Box>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                component={RouterLink} 
                to="/login" 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 500
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
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

export default Register;
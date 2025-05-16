// src/pages/ThemeDemo.js
import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
  Slider,
  CircularProgress,
  LinearProgress,
  Alert,
  Chip,
  Avatar,
  useTheme,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Favorite,
  Share,
  MoreVert,
  Delete,
  Check,
  Star,
  Add,
  Send,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { useThemeMode } from '../contexts/ThemeContext';
import ThemeSwitch from '../components/common/ThemeSwitch';
import ThemeModeVisual from '../components/common/ThemeModeVisual';

// ColorSection component to display color swatches
const ColorSection = ({ title, colors }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        {title}
      </Typography>
      <Grid container spacing={1}>
        {Object.entries(colors).map(([name, color]) => (
          <Grid item key={name}>
            <Tooltip title={`${name}: ${color}`}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: color,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: theme.shadows[1],
                  color: 
                    name.includes('light') || name === 'main' && title.includes('background') 
                      ? 'rgba(0, 0, 0, 0.87)' 
                      : '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                }}
              >
                {name}
              </Box>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Component to showcase different UI elements with the current theme
const ThemeDemo = () => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeMode();
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Theme Showcase
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleColorMode} sx={{ mr: 1 }}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <ThemeSwitch variant="icon" />
          </Box>
        </Box>
        
        <Typography variant="body1" paragraph color="text.secondary">
          This page demonstrates the visual components of our application theme in both light and dark modes.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ThemeModeVisual />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Current Theme: {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
              </Typography>
              <Typography variant="body2" paragraph>
                The theme provides consistent styling across the application with a focus on 
                accessibility and visual appeal in both light and dark environments.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained">Primary Button</Button>
                <Button variant="outlined">Outlined Button</Button>
                <Button variant="text">Text Button</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        <Typography variant="h5" sx={{ mt: 4, mb: 3, fontWeight: 600 }}>
          Color Palette
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ColorSection 
              title="Primary Colors" 
              colors={{
                light: theme.palette.primary.light,
                main: theme.palette.primary.main,
                dark: theme.palette.primary.dark
              }} 
            />
            
            <ColorSection 
              title="Secondary Colors" 
              colors={{
                light: theme.palette.secondary.light,
                main: theme.palette.secondary.main,
                dark: theme.palette.secondary.dark
              }} 
            />
            
            <ColorSection 
              title="Error Colors" 
              colors={{
                light: theme.palette.error.light,
                main: theme.palette.error.main,
                dark: theme.palette.error.dark
              }} 
            />
            
            <ColorSection 
              title="Warning Colors" 
              colors={{
                light: theme.palette.warning.light,
                main: theme.palette.warning.main,
                dark: theme.palette.warning.dark
              }} 
            />
            
            <ColorSection 
              title="Success Colors" 
              colors={{
                light: theme.palette.success.light,
                main: theme.palette.success.main,
                dark: theme.palette.success.dark
              }} 
            />
            
            <ColorSection 
              title="Info Colors" 
              colors={{
                light: theme.palette.info.light,
                main: theme.palette.info.main,
                dark: theme.palette.info.dark
              }} 
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <ColorSection 
              title="Background Colors" 
              colors={{
                default: theme.palette.background.default,
                paper: theme.palette.background.paper,
                appBar: theme.palette.background.appBar,
                sidebar: theme.palette.background.sidebar
              }} 
            />
            
            <ColorSection 
              title="Text Colors" 
              colors={{
                primary: theme.palette.text.primary,
                secondary: theme.palette.text.secondary,
                disabled: theme.palette.text.disabled
              }} 
            />
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Typography
              </Typography>
              
              <Typography variant="h1" gutterBottom>h1. Heading</Typography>
              <Typography variant="h2" gutterBottom>h2. Heading</Typography>
              <Typography variant="h3" gutterBottom>h3. Heading</Typography>
              <Typography variant="h4" gutterBottom>h4. Heading</Typography>
              <Typography variant="h5" gutterBottom>h5. Heading</Typography>
              <Typography variant="h6" gutterBottom>h6. Heading</Typography>
              <Typography variant="subtitle1" gutterBottom>subtitle1. Lorem ipsum dolor sit amet.</Typography>
              <Typography variant="subtitle2" gutterBottom>subtitle2. Lorem ipsum dolor sit amet.</Typography>
              <Typography variant="body1" gutterBottom>body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
              <Typography variant="body2" gutterBottom>body2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
              <Typography variant="button" display="block" gutterBottom>BUTTON TEXT</Typography>
              <Typography variant="caption" display="block" gutterBottom>caption text</Typography>
              <Typography variant="overline" display="block" gutterBottom>OVERLINE TEXT</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          UI Components
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Input Components
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <TextField label="Standard" variant="outlined" fullWidth sx={{ mb: 2 }} />
                <TextField label="With Helper Text" helperText="Helper text" variant="outlined" fullWidth sx={{ mb: 2 }} />
                <TextField label="Disabled" disabled variant="outlined" fullWidth sx={{ mb: 2 }} />
                <TextField label="Error" error helperText="Error message" variant="outlined" fullWidth sx={{ mb: 2 }} />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel control={<Checkbox />} label="Checkbox" />
                <FormControlLabel control={<Checkbox checked />} label="Checked" />
                <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <RadioGroup defaultValue="option1" name="radio-buttons-group">
                  <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                  <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                  <FormControlLabel value="option3" control={<Radio disabled />} label="Disabled" />
                </RadioGroup>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel control={<Switch />} label="Switch" />
                <FormControlLabel control={<Switch checked />} label="Checked" />
                <FormControlLabel control={<Switch disabled />} label="Disabled" />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>Slider</Typography>
                <Slider defaultValue={30} />
                <Slider disabled defaultValue={30} />
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Card Component
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Cards contain content and actions about a single subject. They are used for dashboards, 
                  data visualization, and information display.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label="Tag 1" />
                  <Chip label="Tag 2" color="primary" />
                  <Chip label="Tag 3" color="secondary" />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<Favorite />}>Like</Button>
                <Button size="small" startIcon={<Share />}>Share</Button>
                <IconButton size="small" sx={{ ml: 'auto' }}>
                  <MoreVert />
                </IconButton>
              </CardActions>
            </Card>
            
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Status Components
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>Progress Indicators</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CircularProgress />
                  <CircularProgress color="secondary" />
                  <CircularProgress color="success" />
                </Box>
                <Box sx={{ width: '100%', mb: 2 }}>
                  <LinearProgress />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <LinearProgress variant="determinate" value={75} />
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>Alerts</Typography>
                <Alert severity="error" sx={{ mb: 1 }}>Error Alert — This is an error alert!</Alert>
                <Alert severity="warning" sx={{ mb: 1 }}>Warning Alert — This is a warning alert!</Alert>
                <Alert severity="info" sx={{ mb: 1 }}>Info Alert — This is an info alert!</Alert>
                <Alert severity="success" sx={{ mb: 1 }}>Success Alert — This is a success alert!</Alert>
              </Box>
              
              <Box>
                <Typography gutterBottom>Badges</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Badge badgeContent={4} color="primary">
                    <Avatar>P</Avatar>
                  </Badge>
                  <Badge badgeContent={4} color="secondary">
                    <Avatar>N</Avatar>
                  </Badge>
                  <Badge badgeContent={0} showZero color="error">
                    <Avatar>Z</Avatar>
                  </Badge>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<Send />}
            sx={{ px: 4 }}
          >
            Apply Theme
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ThemeDemo;
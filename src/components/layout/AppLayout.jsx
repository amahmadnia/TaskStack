// src/components/layout/AppLayout.js
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  AppBar as MuiAppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  useTheme, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton, 
  Divider, 
  Avatar, 
  styled, 
  useMediaQuery, 
  Menu, 
  MenuItem,
  Badge
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Dashboard, 
  CheckCircle, 
  Label, 
  Settings,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import ThemeSwitch from '../common/ThemeSwitch';
import { useTaskContext } from '../../contexts/TaskContext';

// Drawer width
const drawerWidth = 260;

// Styled components
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, isMobile }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: theme.palette.background.appBar,
  color: theme.palette.text.primary,
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && !isMobile && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const AppLayout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleColorMode } = useThemeMode();
  const { getOverdueTasks } = useTaskContext();
  
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  
  // Count overdue tasks for notification badge
  useEffect(() => {
    const overdueTasks = getOverdueTasks();
    setNotificationCount(overdueTasks.length);
  }, [getOverdueTasks]);
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    // Clear localStorage for demo purposes
    localStorage.removeItem('user');
    navigate('/login');
    handleMenuClose();
  };
  
  // Define navigation menu items
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Tasks', icon: <CheckCircle />, path: '/tasks' },
    { text: 'Categories', icon: <Label />, path: '/categories' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];
  
  return (
    <>
      <AppBar position="fixed" open={open} isMobile={isMobile}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {open && !isMobile ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {/* Display current page title based on route */}
            {menuItems.find(item => item.path === location.pathname)?.text || 'TaskFlow'}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeSwitch variant="simple" compact />
            
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: theme.palette.primary.main 
                }}
              >
                <PersonIcon fontSize="small" />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: theme.palette.background.sidebar,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              TaskFlow
            </Typography>
          </Box>
          {!isMobile && (
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </DrawerHeader>
        
        <Divider />
        
        {/* Add Task Button */}
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: '8px',
              color: 'white',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
            onClick={() => navigate('/new-task')}
          >
            <AddIcon sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight="medium">
              Add New Task
            </Typography>
          </Box>
        </Box>
        
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  py: 1.5,
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(99, 102, 241, 0.08)'
                      : 'rgba(129, 140, 248, 0.08)',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'light'
                        ? 'rgba(99, 102, 241, 0.12)'
                        : 'rgba(129, 140, 248, 0.12)',
                    },
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    }
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40,
                    color: location.pathname === item.path
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: 14,
                    fontWeight: location.pathname === item.path ? 600 : 500
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Divider />
        
        {/* User profile section */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: theme.palette.primary.main,
              mr: 2
            }}
          >
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              User Name
            </Typography>
            <Typography variant="caption" color="text.secondary">
              user@example.com
            </Typography>
          </Box>
        </Box>
      </Drawer>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 10,
          backgroundColor: theme.palette.background.default,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && !isMobile && {
            marginLeft: drawerWidth,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        {children}
      </Box>
      
      {/* Profile menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 200,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
          <PersonIcon fontSize="small" sx={{ mr: 1.5 }} />
          My Profile
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
          <Settings fontSize="small" sx={{ mr: 1.5 }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppLayout;
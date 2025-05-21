// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import { Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', 
      background: 'blue',
      height: '100vh',
     width: '97vw' }}>
      <Navbar toggleDrawer={toggleDrawer} />
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          maxWidth: '100%',
          width: '100%',
          // marginLeft: isSmUp ? `${drawerWidth}px` : 0,
          background: 'yellow'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
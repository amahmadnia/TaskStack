// src/pages/Settings.js
import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import { TaskContext } from '../context/TaskContext';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { exportData, importData, clearAllData } = useContext(TaskContext);
  
  // This will be implemented fully later
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      {/* Settings UI will go here */}
    </Box>
  );
};

export default Settings;
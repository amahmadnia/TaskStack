// src/pages/Settings.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Switch,
  FormControlLabel,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Avatar
} from '@mui/material';
import {
  Palette,
  Notifications,
  Security,
  Storage,
  AccountCircle
} from '@mui/icons-material';
import ThemeModeVisual from '../components/common/ThemeModeVisual';

const SettingSection = ({ icon, title, children }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.mode === 'light' 
                ? 'rgba(99, 102, 241, 0.1)' 
                : 'rgba(129, 140, 248, 0.1)',
              color: theme.palette.primary.main,
              mr: 2
            }}
          >
            {icon}
          </Avatar>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
        
        {children}
      </CardContent>
    </Card>
  );
};

const SettingItem = ({ title, description, control }) => {
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="subtitle1" fontWeight={500}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
        {control}
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

const Settings = () => {
  const theme = useTheme();
  
  // App settings state
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    soundEffects: true,
    autoSave: true,
    showCompletedTasks: true,
    defaultTaskView: 'list',
    dataRetention: '1year'
  });
  
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };
  
  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your app preferences and account settings
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Theme Settings */}
          <SettingSection icon={<Palette />} title="Appearance">
            <ThemeModeVisual />
          </SettingSection>
          
          {/* Notification Settings */}
          <SettingSection icon={<Notifications />} title="Notifications">
            <SettingItem
              title="Enable Notifications"
              description="Receive notifications for task deadlines and reminders"
              control={
                <Switch
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  color="primary"
                />
              }
            />
            
            <SettingItem
              title="Email Notifications"
              description="Receive task notifications via email"
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  color="primary"
                  disabled={!settings.notifications}
                />
              }
            />
            
            <SettingItem
              title="Sound Effects"
              description="Play sound when completing tasks or receiving notifications"
              control={
                <Switch
                  checked={settings.soundEffects}
                  onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
                  color="primary"
                />
              }
            />
          </SettingSection>
          
          {/* Data & Privacy Settings */}
          <SettingSection icon={<Storage />} title="Data & Privacy">
            <SettingItem
              title="Auto-Save Tasks"
              description="Automatically save changes to tasks as you work"
              control={
                <Switch
                  checked={settings.autoSave}
                  onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  color="primary"
                />
              }
            />
            
            <SettingItem
              title="Show Completed Tasks"
              description="Display completed tasks in task lists"
              control={
                <Switch
                  checked={settings.showCompletedTasks}
                  onChange={(e) => handleSettingChange('showCompletedTasks', e.target.checked)}
                  color="primary"
                />
              }
            />
            
            <SettingItem
              title="Default Task View"
              description="Choose how tasks are displayed by default"
              control={
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <Select
                    value={settings.defaultTaskView}
                    onChange={(e) => handleSettingChange('defaultTaskView', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="list">List View</MenuItem>
                    <MenuItem value="grid">Grid View</MenuItem>
                    <MenuItem value="calendar">Calendar View</MenuItem>
                  </Select>
                </FormControl>
              }
            />
            
            <SettingItem
              title="Data Retention"
              description="Choose how long to keep your task history"
              control={
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <Select
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="1month">1 Month</MenuItem>
                    <MenuItem value="6months">6 Months</MenuItem>
                    <MenuItem value="1year">1 Year</MenuItem>
                    <MenuItem value="forever">Forever</MenuItem>
                  </Select>
                </FormControl>
              }
            />
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="error">
                Clear All Data
              </Button>
              
              <Button variant="outlined">
                Export Data
              </Button>
            </Box>
          </SettingSection>
          
          {/* Account Settings */}
          <SettingSection icon={<AccountCircle />} title="Account">
            <Box sx={{ py: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Name
                    </Typography>
                    <Typography variant="body1">
                      Demo User
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Email
                    </Typography>
                    <Typography variant="body1">
                      demo@example.com
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="outlined">
                  Change Password
                </Button>
                
                <Button variant="outlined" color="error">
                  Delete Account
                </Button>
              </Box>
              
              <Divider sx={{ mt: 3 }} />
            </Box>
          </SettingSection>
        </Grid>
        
        <Grid item xs={12} md={4}>
          {/* Security Settings */}
          <SettingSection icon={<Security />} title="Security">
            <SettingItem
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              control={
                <Switch
                  color="primary"
                />
              }
            />
            
            <SettingItem
              title="Session Timeout"
              description="Automatically log out after period of inactivity"
              control={
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <Select
                    defaultValue="30min"
                    displayEmpty
                  >
                    <MenuItem value="never">Never</MenuItem>
                    <MenuItem value="15min">15 Minutes</MenuItem>
                    <MenuItem value="30min">30 Minutes</MenuItem>
                    <MenuItem value="1hour">1 Hour</MenuItem>
                    <MenuItem value="4hours">4 Hours</MenuItem>
                  </Select>
                </FormControl>
              }
            />
            
            <Box sx={{ py: 2 }}>
              <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                Login History
              </Typography>
              
              <Box sx={{ py: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  Current Session
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Started: Today, 10:30 AM
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  IP: 192.168.1.1
                </Typography>
              </Box>
              
              <Button variant="text" size="small" sx={{ mt: 1 }}>
                View All Sessions
              </Button>
            </Box>
          </SettingSection>
          
          {/* App Info */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                About TaskFlow
              </Typography>
              
              <Typography variant="body2" paragraph>
                Version: 1.0.0
              </Typography>
              
              <Typography variant="body2" paragraph>
                TaskFlow is a powerful task management application designed to help you stay organized and productive.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button variant="text" size="small">
                  Terms of Service
                </Button>
                
                <Button variant="text" size="small">
                  Privacy Policy
                </Button>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" fullWidth>
                  Save Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { Box, Typography, Paper, Grid, Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import TaskStats from '../components/ui/TaskStats';
import RecentActivity from '../components/ui/RecentActivity';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

const Dashboard = () => {
  const navigate = useNavigate();
  const { getTaskStatistics, tasks } = useContext(TaskContext);
  const stats = getTaskStatistics();
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="600">
          Dashboard
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/tasks', { state: { openNewTaskDialog: true } })}
          sx={{ borderRadius: '8px', boxShadow: '0 4px 10px rgba(33, 158, 188, 0.3)' }}
        >
          New Task
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {/* Statistics Overview */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 230,
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '4px',
                backgroundColor: theme.palette.primary.main,
              }
            }}
            elevation={2}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AssignmentIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
              <Typography component="h2" variant="h6" color="primary" fontWeight="600">
                Total Tasks
              </Typography>
            </Box>
            <Typography component="p" variant="h3" fontWeight="600" sx={{ my: 2 }}>
              {stats.total}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              {stats.completed} completed
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 230,
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '4px',
                backgroundColor: theme.palette.success.main,
              }
            }}
            elevation={2}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircleOutlineIcon color="success" sx={{ mr: 1, fontSize: 28 }} />
              <Typography component="h2" variant="h6" color="success.main" fontWeight="600">
                Completed
              </Typography>
            </Box>
            <Typography component="p" variant="h3" fontWeight="600" sx={{ my: 2 }}>
              {stats.completed}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% of all tasks
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 230,
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '4px',
                backgroundColor: theme.palette.info.main,
              }
            }}
            elevation={2}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ErrorOutlineIcon color="info" sx={{ mr: 1, fontSize: 28 }} />
              <Typography component="h2" variant="h6" color="info.main" fontWeight="600">
                Pending
              </Typography>
            </Box>
            <Typography component="p" variant="h3" fontWeight="600" sx={{ my: 2 }}>
              {stats.pending - stats.overdue}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Tasks waiting to be completed
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 230,
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '4px',
                backgroundColor: theme.palette.error.main,
              }
            }}
            elevation={2}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AssignmentLateIcon color="error" sx={{ mr: 1, fontSize: 28 }} />
              <Typography component="h2" variant="h6" color="error" fontWeight="600">
                Overdue
              </Typography>
            </Box>
            <Typography component="p" variant="h3" fontWeight="600" sx={{ my: 2 }}>
              {stats.overdue}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Tasks past their due date
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Task Statistics Charts */}
      <TaskStats />
      
      {/* Recent Activity */}
      <RecentActivity />
    </Box>
  );
};

export default Dashboard;
// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import TaskStats from '../components/ui/TaskStats';
import RecentActivity from '../components/ui/RecentActivity';

const Dashboard = () => {
  const navigate = useNavigate();
  const { getTaskStatistics, tasks } = useContext(TaskContext);
  const stats = getTaskStatistics();
  
  return (
    <Box sx={{ width: '100%',  }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Dashboard
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/tasks', { state: { openNewTaskDialog: true } })}
        >
          New Task
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {/* Statistics Overview */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 180,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Tasks
            </Typography>
            <Typography component="p" variant="h3">
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
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 180,
            }}
          >
            <Typography component="h2" variant="h6" color="success.main" gutterBottom>
              Completed
            </Typography>
            <Typography component="p" variant="h3">
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
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 180,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Pending
            </Typography>
            <Typography component="p" variant="h3">
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
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 180,
              borderLeft: '4px solid',
              borderColor: 'error.main',
            }}
          >
            <Typography component="h2" variant="h6" color="error" gutterBottom>
              Overdue
            </Typography>
            <Typography component="p" variant="h3">
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
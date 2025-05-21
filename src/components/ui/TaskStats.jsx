// src/components/ui/TaskStats.js
import React, { useContext } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import WarningIcon from '@mui/icons-material/Warning';
import { TaskContext } from '../../context/TaskContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TaskStats = () => {
  const { getTaskStatistics, categories } = useContext(TaskContext);
  const stats = getTaskStatistics();
  
  // Data for pie chart
  const statusData = [
    { name: 'Completed', value: stats.completed, color: '#4caf50' },
    { name: 'Pending', value: stats.pending - stats.overdue, color: '#3f51b5' },
    { name: 'Overdue', value: stats.overdue, color: '#f44336' },
  ].filter(item => item.value > 0);
  
  // Data for category pie chart
  const categoryData = categories.map(category => ({
    name: category.name,
    value: stats.byCategoryId[category.id] || 0,
    color: category.color,
  })).filter(item => item.value > 0);
  
  return (
    <Grid container spacing={3} mt={3}>
      {/* Task Count Stats */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Task Status
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <CheckCircleIcon color="success" sx={{ mr: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
              <Typography variant="h6">
                {stats.completed} of {stats.total} tasks
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.total > 0 ? (stats.completed / stats.total) * 100 : 0} 
                color="success"
                sx={{ mt: 1, height: 8, borderRadius: 5 }}
              />
            </Box>
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <PendingIcon color="primary" sx={{ mr: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
              <Typography variant="h6">
                {stats.pending - stats.overdue} of {stats.total} tasks
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.total > 0 ? ((stats.pending - stats.overdue) / stats.total) * 100 : 0} 
                color="primary"
                sx={{ mt: 1, height: 8, borderRadius: 5 }}
              />
            </Box>
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <WarningIcon color="error" sx={{ mr: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Overdue
              </Typography>
              <Typography variant="h6">
                {stats.overdue} of {stats.total} tasks
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.total > 0 ? (stats.overdue / stats.total) * 100 : 0} 
                color="error"
                sx={{ mt: 1, height: 8, borderRadius: 5 }}
              />
            </Box>
          </Box>
        </Paper>
      </Grid>
      
      {/* Status Pie Chart */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Status Distribution
          </Typography>
          
          {stats.total > 0 ? (
            <Box sx={{ flex: 1, minHeight: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No tasks to display
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
      
      {/* Category Distribution */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Category Distribution
          </Typography>
          
          {categoryData.length > 0 ? (
            <Box sx={{ flex: 1, minHeight: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No categories with tasks
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TaskStats;
// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  useTheme,
  LinearProgress,
  Paper,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery
} from '@mui/material';
import {
  CheckCircle,
  AccessTime,
  PriorityHigh,
  DoNotDisturb,
  MoreVert,
  Add as AddIcon,
  Dashboard as DashboardIcon,
  CalendarToday,
  TrendingUp,
  FilterList
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample data for the dashboard
const sampleTasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    priority: 'high',
    dueDate: '2025-05-20',
    category: 'Work',
    categoryColor: '#6366f1',
    completed: false
  },
  {
    id: 2,
    title: 'Review team presentations',
    priority: 'medium',
    dueDate: '2025-05-18',
    category: 'Work',
    categoryColor: '#6366f1',
    completed: false
  },
  {
    id: 3,
    title: 'Order anniversary gift',
    priority: 'high',
    dueDate: '2025-05-25',
    category: 'Personal',
    categoryColor: '#ec4899',
    completed: false
  },
  {
    id: 4,
    title: 'Schedule dentist appointment',
    priority: 'low',
    dueDate: '2025-05-30',
    category: 'Health',
    categoryColor: '#22c55e',
    completed: false
  },
  {
    id: 5,
    title: 'Update portfolio website',
    priority: 'medium',
    dueDate: '2025-06-05',
    category: 'Career',
    categoryColor: '#f59e0b',
    completed: true
  },
  {
    id: 6,
    title: 'Research new tech stack',
    priority: 'low',
    dueDate: '2025-06-10',
    category: 'Learning',
    categoryColor: '#3b82f6',
    completed: true
  }
];

// Summary stats data
const summaryData = {
  totalTasks: 6,
  completedTasks: 2,
  pendingTasks: 4,
  overdueTasks: 1,
  progress: 33
};

// Task priority icon mapping
const priorityIcons = {
  high: <PriorityHigh color="error" fontSize="small" />,
  medium: <PriorityHigh color="warning" fontSize="small" />,
  low: <PriorityHigh color="success" fontSize="small" />
};

// Task status icon mapping
const statusIcons = {
  completed: <CheckCircle color="success" fontSize="small" />,
  pending: <AccessTime color="warning" fontSize="small" />,
  overdue: <DoNotDisturb color="error" fontSize="small" />
};

// Task item component
const TaskItem = ({ task, onTaskClick, onToggleComplete, onDeleteTask }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = (event) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
  };
  
  const handleToggleComplete = (event) => {
    event.stopPropagation();
    onToggleComplete(task.id);
    handleMenuClose();
  };
  
  const handleDeleteTask = (event) => {
    event.stopPropagation();
    onDeleteTask(task.id);
    handleMenuClose();
  };
  
  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
  
  // Format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <Card 
      onClick={() => onTaskClick(task.id)}
      sx={{ 
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4]
        },
        opacity: task.completed ? 0.7 : 1,
        position: 'relative',
        overflow: 'visible',
        height: '100%'
      }}
    >
      {/* Category indicator */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '6px', 
          bgcolor: task.categoryColor,
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }} 
      />
      
      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip 
            label={task.category} 
            size="small" 
            sx={{ 
              bgcolor: `${task.categoryColor}20`,
              color: task.categoryColor,
              fontWeight: 500
            }} 
          />
          
          <Box>
            <IconButton 
              size="small" 
              onClick={handleMenuOpen}
              sx={{ ml: 1 }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuItem onClick={handleToggleComplete}>
                {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </MenuItem>
              <MenuItem onClick={() => {}}>Edit</MenuItem>
              <Divider />
              <MenuItem onClick={handleDeleteTask} sx={{ color: 'error.main' }}>
                Delete
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            mb: 2, 
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'text.secondary' : 'text.primary'
          }}
        >
          {task.title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarToday fontSize="small" sx={{ mr: 1, color: 'text.secondary', fontSize: '0.875rem' }} />
            <Typography 
              variant="body2" 
              color={isOverdue ? 'error.main' : 'text.secondary'}
              fontWeight={isOverdue ? 500 : 400}
            >
              {formatDate(task.dueDate)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {task.completed ? (
              statusIcons.completed
            ) : isOverdue ? (
              statusIcons.overdue
            ) : (
              priorityIcons[task.priority]
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Dashboard component
const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(summaryData);
  
  // Load tasks from localStorage or use sample data
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(sampleTasks);
      localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    }
  }, []);
  
  // Update stats when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      const completed = tasks.filter(task => task.completed).length;
      const pending = tasks.filter(task => !task.completed).length;
      const overdue = tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date()).length;
      const progress = Math.round((completed / tasks.length) * 100);
      
      setStats({
        totalTasks: tasks.length,
        completedTasks: completed,
        pendingTasks: pending,
        overdueTasks: overdue,
        progress
      });
    }
  }, [tasks]);
  
  // Handle task click
  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  
  // Handle toggle task complete
  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  
  // Handle delete task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  
  // Get tasks for today and upcoming
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => 
    !task.completed && task.dueDate === today
  );
  
  const upcomingTasks = tasks.filter(task => 
    !task.completed && new Date(task.dueDate) > new Date() && task.dueDate !== today
  ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0, 4);
  
  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's an overview of your tasks.
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/new-task')}
          sx={{ px: 3, py: 1 }}
        >
          Add Task
        </Button>
      </Box>
      
      {/* Summary cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total Tasks Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 48,
                  height: 48,
                  mb: 2
                }}
              >
                <DashboardIcon />
              </Avatar>
              
              <Typography variant="h5" component="div" fontWeight={600}>
                {stats.totalTasks}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                Total Tasks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Completed Tasks Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.success.main,
                  width: 48,
                  height: 48,
                  mb: 2
                }}
              >
                <CheckCircle />
              </Avatar>
              
              <Typography variant="h5" component="div" fontWeight={600}>
                {stats.completedTasks}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Pending Tasks Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.warning.main,
                  width: 48,
                  height: 48,
                  mb: 2
                }}
              >
                <AccessTime />
              </Avatar>
              
              <Typography variant="h5" component="div" fontWeight={600}>
                {stats.pendingTasks}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Overdue Tasks Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.error.main,
                  width: 48,
                  height: 48,
                  mb: 2
                }}
              >
                <DoNotDisturb />
              </Avatar>
              
              <Typography variant="h5" component="div" fontWeight={600}>
                {stats.overdueTasks}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                Overdue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Progress card */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Task Completion Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stats.completedTasks} of {stats.totalTasks} tasks completed
            </Typography>
          </Box>
          
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 48,
              height: 48
            }}
          >
            <TrendingUp />
          </Avatar>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={stats.progress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: theme.palette.mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.05)' 
                  : 'rgba(255, 255, 255, 0.05)'
              }} 
            />
          </Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {stats.progress}%
          </Typography>
        </Box>
      </Card>
      
      {/* Today's Tasks */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h5" component="h2" fontWeight={600}>
            Today's Tasks
          </Typography>
          
          <Button 
            variant="outlined" 
            size="small"
            endIcon={<FilterList />}
          >
            Filter
          </Button>
        </Box>
        
        {todayTasks.length > 0 ? (
          <Grid container spacing={3}>
            {todayTasks.map(task => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <TaskItem 
                  task={task} 
                  onTaskClick={handleTaskClick}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={handleDeleteTask}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              bgcolor: theme.palette.mode === 'light' 
                ? 'rgba(0, 0, 0, 0.02)' 
                : 'rgba(255, 255, 255, 0.02)'
            }}
          >
            <Typography variant="body1" color="text.secondary" gutterBottom>
              No tasks scheduled for today
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/new-task')}
              sx={{ mt: 2 }}
            >
              Add a Task
            </Button>
          </Paper>
        )}
      </Box>
      
      {/* Upcoming Tasks */}
      <Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h5" component="h2" fontWeight={600}>
            Upcoming Tasks
          </Typography>
          
          <Button 
            variant="text" 
            onClick={() => navigate('/tasks')}
          >
            View All
          </Button>
        </Box>
        
        {upcomingTasks.length > 0 ? (
          <Grid container spacing={3}>
            {upcomingTasks.map(task => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <TaskItem 
                  task={task} 
                  onTaskClick={handleTaskClick}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={handleDeleteTask}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              bgcolor: theme.palette.mode === 'light' 
                ? 'rgba(0, 0, 0, 0.02)' 
                : 'rgba(255, 255, 255, 0.02)'
            }}
          >
            <Typography variant="body1" color="text.secondary" gutterBottom>
              No upcoming tasks
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/new-task')}
              sx={{ mt: 2 }}
            >
              Add a Task
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
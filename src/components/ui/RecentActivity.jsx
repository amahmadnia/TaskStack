// src/components/ui/RecentActivity.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TaskContext } from '../../context/TaskContext';
import { formatDate } from '../../utils/dateUtils';
import CategoryChip from '../common/CategoryChip';

const RecentActivity = () => {
  const navigate = useNavigate();
  const { tasks, categories } = useContext(TaskContext);
  const theme = useTheme();
  
  // Sort tasks by creation/update date
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(a.createdAt);
    const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(b.createdAt);
    return dateB - dateA;
  });
  
  // Take the most recent 5 tasks
  const recentTasks = sortedTasks.slice(0, 5);
  
  const getActivityIcon = (task) => {
    if (task.status === 'completed') {
      return <CheckCircleIcon color="success" />;
    }
    if (task.updatedAt) {
      return <EditIcon color="primary" />;
    }
    return <NoteAddIcon color="secondary" />;
  };
  
  const getActivityText = (task) => {
    if (task.status === 'completed') {
      return 'Completed';
    }
    if (task.updatedAt) {
      return 'Updated';
    }
    return 'Created';
  };
  
  const getActivityDate = (task) => {
    if (task.status === 'completed' || task.updatedAt) {
      return formatDate(task.updatedAt);
    }
    return formatDate(task.createdAt);
  };
  
  const getCategoryForTask = (task) => {
    if (!task.categoryId) return null;
    return categories.find(cat => cat.id === task.categoryId);
  };
  
  return (
    <Paper sx={{ p: 3, mt: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="600">
          Recent Activity
        </Typography>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Button 
          variant="text" 
          size="small"
          onClick={() => navigate('/tasks')}
          endIcon={<ArrowForwardIcon />}
          sx={{ fontWeight: 500 }}
        >
          View All Tasks
        </Button>
      </Box>
      
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {recentTasks.length > 0 ? (
          recentTasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItem 
                alignItems="flex-start"
                button
                onClick={() => navigate(`/tasks/${task.id}`)}
                sx={{ 
                  borderRadius: 2, 
                  mb: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(142, 202, 230, 0.1)' 
                      : 'rgba(33, 158, 188, 0.05)',
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    sx={{ 
                      bgcolor: task.status === 'completed' 
                        ? theme.palette.success.main 
                        : theme.palette.primary.main,
                      boxShadow: `0 4px 8px ${task.status === 'completed' 
                        ? 'rgba(76, 175, 80, 0.3)' 
                        : 'rgba(33, 158, 188, 0.3)'}`
                    }}
                  >
                    {getActivityIcon(task)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography 
                        component="span" 
                        variant="subtitle1"
                        fontWeight={500}
                        sx={{
                          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                          color: task.status === 'completed' ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {task.title}
                      </Typography>
                      <CategoryChip category={getCategoryForTask(task)} />
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        {getActivityText(task)} - {getActivityDate(task)}
                      </Typography>
                      {task.description && (
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5, display: 'block' }}
                        >
                          {task.description.length > 60 
                            ? `${task.description.substring(0, 60)}...` 
                            : task.description}
                        </Typography>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < recentTasks.length - 1 && <Divider variant="inset" component="li" sx={{ opacity: 0.5 }} />}
            </React.Fragment>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary="No recent activity"
              secondary="Create a new task to get started"
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default RecentActivity;
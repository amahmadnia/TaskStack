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
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import { TaskContext } from '../../context/TaskContext';
import { formatDate } from '../../utils/dateUtils';
import CategoryChip from '../common/CategoryChip';

const RecentActivity = () => {
  const navigate = useNavigate();
  const { tasks, categories } = useContext(TaskContext);
  
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
    <Paper sx={{ p: 2, mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Recent Activity
        </Typography>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Button 
          variant="text" 
          size="small"
          onClick={() => navigate('/tasks')}
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
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: task.status === 'completed' ? 'success.main' : 'primary.main' }}>
                    {getActivityIcon(task)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography component="span" variant="subtitle1">
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
                        sx={{ display: 'block' }}
                      >
                        {getActivityText(task)} - {getActivityDate(task)}
                      </Typography>
                      {task.description && (
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
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
              {index < recentTasks.length - 1 && <Divider variant="inset" component="li" />}
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
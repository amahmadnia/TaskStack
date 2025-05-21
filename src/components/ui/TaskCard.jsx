// src/components/ui/TaskCard.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { formatDate, isPast } from '../../utils/dateUtils';
import { TaskContext } from '../../context/TaskContext';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const { categories, updateTask, deleteTask } = useContext(TaskContext);
  
  const category = categories.find(cat => cat.id === task.categoryId);
  
  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'success',
  };
  
  const handleComplete = () => {
    updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' });
  };
  
  return (
    <Card
      sx={{
        mb: 2,
        opacity: task.status === 'completed' ? 0.8 : 1,
        borderLeft: '4px solid',
        borderColor: task.status === 'completed' 
          ? 'success.main' 
          : isPast(task.dueDate) ? 'error.main' : 'primary.main',
      }}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          component="div"
          sx={{
            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </Typography>
        
        <Box sx={{ display: 'flex', mt: 1, gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={task.status.charAt(0).toUpperCase() + task.status.slice(1)} 
            color={task.status === 'completed' ? 'success' : 'default'} 
            size="small" 
          />
          
          <Chip 
            label={task.priority} 
            color={priorityColors[task.priority]} 
            size="small" 
          />
          
          {category && (
            <Chip 
              label={category.name} 
              sx={{ backgroundColor: category.color, color: '#fff' }} 
              size="small" 
            />
          )}
        </Box>
        
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {task.description.length > 100
              ? `${task.description.substring(0, 100)}...`
              : task.description}
          </Typography>
        )}
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Due: {formatDate(task.dueDate)}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <IconButton 
          aria-label="mark as completed" 
          onClick={handleComplete}
          color={task.status === 'completed' ? 'success' : 'default'}
        >
          <CheckCircleOutlineIcon />
        </IconButton>
        
        <IconButton 
          aria-label="edit" 
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          <EditIcon />
        </IconButton>
        
        <IconButton 
          aria-label="delete" 
          onClick={() => deleteTask(task.id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
        
        <Button 
          size="small" 
          onClick={() => navigate(`/tasks/${task.id}`)}
          sx={{ ml: 'auto' }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
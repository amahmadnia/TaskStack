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
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { formatDate, isPast } from '../../utils/dateUtils';
import { TaskContext } from '../../context/TaskContext';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const { categories, updateTask, deleteTask } = useContext(TaskContext);
  const theme = useTheme();
  
  const category = categories.find(cat => cat.id === task.categoryId);
  
  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'primary',
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
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 6px 20px rgba(0, 0, 0, 0.5)' 
            : '0 6px 20px rgba(8, 78, 110, 0.15)',
        }
      }}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          component="div"
          sx={{
            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
            fontWeight: 600,
            color: task.status === 'completed' ? 'text.secondary' : 'text.primary',
          }}
        >
          {task.title}
        </Typography>
        
        <Box sx={{ display: 'flex', mt: 1, gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={task.status.charAt(0).toUpperCase() + task.status.slice(1)} 
            color={task.status === 'completed' ? 'success' : 'primary'} 
            size="small"
            sx={{ borderRadius: '4px' }}
          />
          
          <Chip 
            label={task.priority} 
            color={priorityColors[task.priority]} 
            size="small"
            sx={{ borderRadius: '4px' }}
          />
          
          {category && (
            <Chip 
              label={category.name} 
              sx={{ 
                backgroundColor: category.color, 
                color: '#fff',
                borderRadius: '4px'
              }} 
              size="small" 
            />
          )}
        </Box>
        
        {task.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mt: 1,
              fontSize: '0.875rem',
              opacity: 0.9,
              lineHeight: 1.5
            }}
          >
            {task.description.length > 100
              ? `${task.description.substring(0, 100)}...`
              : task.description}
          </Typography>
        )}
        
        <Typography 
          variant="body2" 
          color={isPast(task.dueDate) && task.status !== 'completed' ? 'error.main' : 'text.secondary'} 
          sx={{ 
            mt: 1,
            fontWeight: isPast(task.dueDate) && task.status !== 'completed' ? 600 : 400
          }}
        >
          Due: {formatDate(task.dueDate)}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing sx={{ px: 2, pb: 2 }}>
        <IconButton 
          aria-label="mark as completed" 
          onClick={handleComplete}
          color={task.status === 'completed' ? 'success' : 'default'}
          size="small"
        >
          <CheckCircleOutlineIcon />
        </IconButton>
        
        <IconButton 
          aria-label="edit" 
          onClick={() => navigate(`/tasks/${task.id}`)}
          size="small"
        >
          <EditIcon />
        </IconButton>
        
        <IconButton 
          aria-label="delete" 
          onClick={() => deleteTask(task.id)}
          color="error"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
        
        <Button 
          size="small" 
          onClick={() => navigate(`/tasks/${task.id}`)}
          sx={{ ml: 'auto' }}
          variant="text"
          color="primary"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
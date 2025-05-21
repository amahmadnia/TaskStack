// src/pages/TaskDetail.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Today as TodayIcon,
  Flag as FlagIcon,
  Label as LabelIcon,
} from '@mui/icons-material';
import { TaskContext } from '../context/TaskContext';
import { formatDate, isPast, getRelativeTime } from '../utils/dateUtils';
import TaskForm from '../components/ui/TaskForm';
import CategoryChip from '../components/common/CategoryChip';
import PriorityBadge from '../components/common/PriorityBadge';

const TaskDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTask, updateTask, deleteTask, categories } = useContext(TaskContext);
  
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const [newSubTask, setNewSubTask] = useState('');
  const [notes, setNotes] = useState('');
  
  // Fetch task data when component mounts or taskId changes
  useEffect(() => {
    const taskData = getTask(taskId);
    if (taskData) {
      setTask(taskData);
      // Initialize subtasks and notes from task data
      setSubTasks(taskData.subTasks || []);
      setNotes(taskData.notes || '');
    }
  }, [taskId, getTask]);
  
  // When the task is not found
  if (!task) {
    return (
      <Box sx={{ textAlign: 'center', py: 4, width: '100%' }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Task not found
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />} 
          sx={{ mt: 2 }}
          onClick={() => navigate('/tasks')}
        >
          Back to Tasks
        </Button>
      </Box>
    );
  }
  
  const handleSaveSubTasks = () => {
    updateTask(taskId, { subTasks });
  };
  
  const handleSaveNotes = () => {
    updateTask(taskId, { notes });
  };
  
  const handleAddSubTask = () => {
    if (newSubTask.trim()) {
      const updatedSubTasks = [
        ...subTasks,
        { id: Date.now().toString(), text: newSubTask, completed: false }
      ];
      setSubTasks(updatedSubTasks);
      setNewSubTask('');
      
      // Save to task
      updateTask(taskId, { subTasks: updatedSubTasks });
    }
  };
  
  const handleToggleSubTask = (id) => {
    const updatedSubTasks = subTasks.map(subTask => 
      subTask.id === id ? { ...subTask, completed: !subTask.completed } : subTask
    );
    setSubTasks(updatedSubTasks);
    
    // Save to task
    updateTask(taskId, { subTasks: updatedSubTasks });
  };
  
  const handleDeleteSubTask = (id) => {
    const updatedSubTasks = subTasks.filter(subTask => subTask.id !== id);
    setSubTasks(updatedSubTasks);
    
    // Save to task
    updateTask(taskId, { subTasks: updatedSubTasks });
  };
  
  const handleDeleteTask = () => {
    deleteTask(taskId);
    setDeleteDialog(false);
    navigate('/tasks');
  };
  
  const handleMarkComplete = () => {
    updateTask(taskId, { 
      status: task.status === 'completed' ? 'pending' : 'completed',
      updatedAt: new Date().toISOString()
    });
    
    // Update local state
    setTask({
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed',
      updatedAt: new Date().toISOString()
    });
  };
  
  const getCategory = () => {
    if (!task.categoryId) return null;
    return categories.find(cat => cat.id === task.categoryId);
  };
  
  const getStatusColor = () => {
    if (task.status === 'completed') return 'success';
    if (isPast(task.dueDate)) return 'error';
    return 'primary';
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/tasks')}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Task Details
        </Typography>
        <Button 
          variant="outlined" 
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => setEditMode(true)}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button 
          variant="outlined" 
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setDeleteDialog(true)}
        >
          Delete
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h5" gutterBottom>
                  {task.title}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip 
                    label={task.status.charAt(0).toUpperCase() + task.status.slice(1)} 
                    color={getStatusColor()} 
                  />
                  <PriorityBadge priority={task.priority} />
                  <CategoryChip category={getCategory()} />
                </Box>
              </Box>
              <Button
                variant={task.status === 'completed' ? 'outlined' : 'contained'}
                color={task.status === 'completed' ? 'success' : 'primary'}
                onClick={handleMarkComplete}
              >
                {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Due Date
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <TodayIcon sx={{ mr: 1, color: isPast(task.dueDate) ? 'error.main' : 'inherit' }} />
                {formatDate(task.dueDate)} ({getRelativeTime(task.dueDate)})
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Priority
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <FlagIcon sx={{ mr: 1 }} />
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Category
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <LabelIcon sx={{ mr: 1 }} />
                {getCategory() ? getCategory().name : 'None'}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {task.description || 'No description provided.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Subtasks
            </Typography>
            
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Add a subtask..."
                value={newSubTask}
                onChange={(e) => setNewSubTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSubTask()}
                size="small"
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleAddSubTask}
                startIcon={<AddCircleOutlineIcon />}
              >
                Add
              </Button>
            </Box>
            
            <List>
              {subTasks.length > 0 ? (
                subTasks.map((subTask) => (
                  <ListItem 
                    key={subTask.id}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => handleDeleteSubTask(subTask.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={subTask.completed}
                        onChange={() => handleToggleSubTask(subTask.id)}
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={subTask.text} 
                      sx={{ 
                        textDecoration: subTask.completed ? 'line-through' : 'none',
                        color: subTask.completed ? 'text.secondary' : 'text.primary'
                      }}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  No subtasks yet. Add some to break down this task.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder="Add notes about this task..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleSaveNotes}
            />
          </Paper>
        </Grid>
      </Grid>
      
      {/* Edit Task Dialog */}
      <TaskForm
        open={editMode}
        onClose={() => setEditMode(false)}
        task={task}
        editMode={true}
      />
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteTask} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskDetail;
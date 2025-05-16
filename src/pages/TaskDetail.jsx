// src/pages/TaskDetail.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Paper,
  Divider,
  Grid,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  ArrowBack,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Flag as FlagIcon,
  EventNote as EventNoteIcon,
  Label as LabelIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const TaskDetail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTask, updateTask, deleteTask, categories, toggleTaskCompletion } = useTaskContext();
  
  // State for task and edit mode
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  // Priority options with colors
  const priorityOptions = [
    { value: 'low', label: 'Low', color: theme.palette.success.main },
    { value: 'medium', label: 'Medium', color: theme.palette.warning.main },
    { value: 'high', label: 'High', color: theme.palette.error.main }
  ];
  
  // Load task data
  useEffect(() => {
    const taskData = getTask(id);
    if (taskData) {
      setTask(taskData);
      setFormData({
        title: taskData.title,
        description: taskData.description || '',
        priority: taskData.priority,
        dueDate: new Date(taskData.dueDate),
        category: taskData.category,
        categoryColor: taskData.categoryColor
      });
    } else {
      // Task not found, redirect to tasks list
      navigate('/tasks');
    }
  }, [id, getTask, navigate]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Set category color if category is selected
    if (name === 'category') {
      const selectedCategory = categories.find(cat => cat.name === value);
      if (selectedCategory) {
        setFormData(prev => ({
          ...prev,
          categoryColor: selectedCategory.color
        }));
      }
    }
  };
  
  // Handle date change
  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      dueDate: newDate
    });
    
    // Clear error for this field
    if (errors.dueDate) {
      setErrors({
        ...errors,
        dueDate: ''
      });
    }
  };
  
  // Toggle edit mode
  const handleToggleEditMode = () => {
    if (editMode) {
      // Cancel edit mode
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        dueDate: new Date(task.dueDate),
        category: task.category,
        categoryColor: task.categoryColor
      });
      setErrors({});
    }
    setEditMode(!editMode);
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Save task
  const handleSaveTask = () => {
    if (validateForm()) {
      // Format the date to YYYY-MM-DD
      const formattedDate = format(formData.dueDate, 'yyyy-MM-dd');
      
      // Update task
      updateTask(id, {
        ...formData,
        dueDate: formattedDate
      });
      
      // Update local state
      setTask({
        ...task,
        ...formData,
        dueDate: formattedDate
      });
      
      // Exit edit mode
      setEditMode(false);
    }
  };
  
  // Delete task
  const handleDeleteTask = () => {
    setDeleteConfirm(false);
    deleteTask(id);
    navigate('/tasks');
  };
  
  // Toggle task completion
  const handleToggleComplete = () => {
    toggleTaskCompletion(id);
    setTask({
      ...task,
      completed: !task.completed
    });
  };
  
  // Format date for display
  const formatDisplayDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.info.main;
    }
  };
  
  // Check if task is overdue
  const isTaskOverdue = () => {
    return !task.completed && new Date(task.dueDate) < new Date();
  };
  
  if (!task) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Loading task...
        </Typography>
      </Box>
    );
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {/* Page header */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/tasks')}
          >
            Back to Tasks
          </Button>
          
          <Box>
            {editMode ? (
              <>
                <Button
                  variant="outlined"
                  onClick={handleToggleEditMode}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveTask}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleToggleEditMode}
                  sx={{ mr: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteConfirm(true)}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Box>
        
        {/* Task content */}
        <Paper sx={{ p: 4 }}>
          {/* Task completion status */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Chip
              icon={task.completed ? <CheckCircleIcon /> : <UncheckedIcon />}
              label={task.completed ? 'Completed' : 'Active'}
              color={task.completed ? 'success' : 'default'}
              onClick={handleToggleComplete}
              sx={{ fontWeight: 500 }}
            />
            
            {!editMode && !task.completed && isTaskOverdue() && (
              <Chip
                label="Overdue"
                color="error"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Box>
          
          {/* Task title */}
          {editMode ? (
            <TextField
              label="Task Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.title}
              helperText={errors.title}
              sx={{ mb: 3 }}
            />
          ) : (
            <Typography
              variant="h4"
              component="h1"
              fontWeight={600}
              gutterBottom
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary'
              }}
            >
              {task.title}
            </Typography>
          )}
          
          {/* Task metadata */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Due date */}
            <Grid item xs={12} sm={4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, borderColor: 'divider', height: '100%' }}
              >
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Due Date
                </Typography>
                
                {editMode ? (
                  <DatePicker
                    value={formData.dueDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                        error={!!errors.dueDate}
                        helperText={errors.dueDate}
                        size="small"
                      />
                    )}
                  />
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventNoteIcon
                      sx={{
                        mr: 1,
                        color: isTaskOverdue() ? 'error.main' : 'action.active'
                      }}
                    />
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color={isTaskOverdue() ? 'error.main' : 'text.primary'}
                    >
                      {formatDisplayDate(task.dueDate)}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
            
            {/* Priority */}
            <Grid item xs={12} sm={4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, borderColor: 'divider', height: '100%' }}
              >
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Priority
                </Typography>
                
                {editMode ? (
                  <FormControl fullWidth size="small">
                    <Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      {priorityOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FlagIcon 
                              fontSize="small" 
                              sx={{ color: option.color, mr: 1 }} 
                            />
                            {option.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FlagIcon
                      sx={{
                        mr: 1,
                        color: getPriorityColor(task.priority)
                      }}
                    />
                    <Typography
                      variant="body1"
                      fontWeight={500}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
            
            {/* Category */}
            <Grid item xs={12} sm={4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, borderColor: 'divider', height: '100%' }}
              >
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Category
                </Typography>
                
                {editMode ? (
                  <FormControl fullWidth size="small" error={!!errors.category} required>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: category.color,
                                mr: 1
                              }}
                            />
                            {category.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: task.categoryColor,
                        mr: 1
                      }}
                    />
                    <Typography
                      variant="body1"
                      fontWeight={500}
                    >
                      {task.category}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
          
          {/* Task description */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Description
            </Typography>
            
            {editMode ? (
              <TextField
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                placeholder="Add details about your task..."
              />
            ) : (
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {task.description || 'No description provided.'}
              </Typography>
            )}
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Task metadata (created/updated) */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Created:
              </Typography>
              <Typography variant="body2">
                {task.createdAt ? formatDisplayDate(task.createdAt) : 'Unknown'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
              <Typography variant="caption" color="text.secondary">
                ID:
              </Typography>
              <Typography variant="body2">
                {task.id}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
      >
        <DialogTitle>
          Delete Task
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete this task?
          </Typography>
          <Alert severity="warning">
            This action cannot be undone.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteTask}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default TaskDetail;
// src/pages/NewTask.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Paper,
  Chip,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  CalendarToday,
  Flag as FlagIcon,
  Label as LabelIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  AddCircleOutline as AddCircleOutlineIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { useTaskContext } from '../contexts/TaskContext';

// Priority options with colors
const priorityOptions = [
  { value: 'low', label: 'Low', color: '#22c55e' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'high', label: 'High', color: '#ef4444' }
];

const NewTask = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addTask, categories } = useTaskContext();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date(),
    category: '',
    categoryColor: ''
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  
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
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format the date to YYYY-MM-DD
      const formattedDate = format(formData.dueDate, 'yyyy-MM-dd');
      
      // Create new task
      const newTask = addTask({
        ...formData,
        dueDate: formattedDate,
        completed: false
      });
      
      // Navigate to the task detail page
      navigate(`/tasks/${newTask.id}`);
    }
  };
  
  // Cancel form and go back
  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {/* Page header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Create New Task
          </Typography>
          
          <Box>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{ mr: 2 }}
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
            
            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={<SaveIcon />}
            >
              Save Task
            </Button>
          </Box>
        </Box>
        
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Task title */}
              <Grid item xs={12}>
                <TextField
                  label="Task Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.title}
                  helperText={errors.title}
                  placeholder="What do you need to do?"
                />
              </Grid>
              
              {/* Task description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Add details about your task..."
                />
              </Grid>
              
              {/* Due date */}
              <Grid item xs={12} sm={6} md={4}>
                <DatePicker
                  label="Due Date"
                  value={formData.dueDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      error={!!errors.dueDate}
                      helperText={errors.dueDate}
                    />
                  )}
                />
              </Grid>
              
              {/* Priority */}
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    label="Priority"
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
              </Grid>
              
              {/* Category */}
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth error={!!errors.category} required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
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
                  {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                </FormControl>
              </Grid>
              
              {/* Category chips */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {categories.map((category) => (
                    <Chip
                      key={category.id}
                      label={category.name}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          category: category.name,
                          categoryColor: category.color
                        });
                        // Clear error for this field
                        if (errors.category) {
                          setErrors({
                            ...errors,
                            category: ''
                          });
                        }
                      }}
                      variant={formData.category === category.name ? "filled" : "outlined"}
                      sx={{
                        bgcolor: formData.category === category.name ? `${category.color}20` : 'transparent',
                        borderColor: category.color,
                        color: formData.category === category.name ? category.color : 'text.primary',
                        '&:hover': {
                          bgcolor: `${category.color}10`,
                        }
                      }}
                    />
                  ))}
                  
                  <Tooltip title="Create New Category">
                    <Chip
                      icon={<AddCircleOutlineIcon />}
                      label="New Category"
                      onClick={() => navigate('/categories')}
                      variant="outlined"
                    />
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              
              <Button
                variant="contained"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Save Task
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default NewTask;
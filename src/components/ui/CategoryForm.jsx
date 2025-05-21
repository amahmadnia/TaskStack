// src/components/ui/CategoryForm.js
import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { TaskContext } from '../../context/TaskContext';

const initialCategoryState = {
  name: '',
  color: '#3f51b5',
};

const CategoryForm = ({ open, onClose, category = null, editMode = false }) => {
  const { addCategory, updateCategory } = useContext(TaskContext);
  const [formData, setFormData] = useState(initialCategoryState);
  const [errors, setErrors] = useState({});
  
  // If in edit mode and category is provided, populate the form
  useEffect(() => {
    if (editMode && category) {
      setFormData({
        name: category.name || '',
        color: category.color || '#3f51b5',
      });
    } else {
      setFormData(initialCategoryState);
    }
  }, [editMode, category]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    if (!formData.color) {
      newErrors.color = 'Color is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    if (editMode && category) {
      updateCategory(category.id, formData);
    } else {
      addCategory(formData);
    }
    
    handleClose();
  };
  
  const handleClose = () => {
    setFormData(initialCategoryState);
    setErrors({});
    onClose();
  };
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editMode ? 'Edit Category' : 'Create New Category'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            autoFocus
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="color"
              label="Category Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              error={!!errors.color}
              helperText={errors.color}
              type="color"
              sx={{ mr: 2 }}
            />
            
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: formData.color,
                border: '1px solid #ddd',
                ml: 2,
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {editMode ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
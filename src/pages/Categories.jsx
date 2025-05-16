// src/pages/Categories.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  useTheme,
  Chip,
  Grid,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Label as LabelIcon
} from '@mui/icons-material';
import { useTaskContext } from '../contexts/TaskContext';

const Categories = () => {
  const theme = useTheme();
  const { categories, addCategory, updateCategory, deleteCategory } = useTaskContext();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#6366f1'
  });
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  // Custom color options
  const colorOptions = [
    '#6366f1', // primary
    '#ec4899', // secondary
    '#22c55e', // success
    '#f59e0b', // warning
    '#ef4444', // error
    '#3b82f6', // info
    '#8b5cf6', // purple
    '#10b981', // emerald
    '#f97316', // orange
    '#06b6d4', // cyan
    '#6b7280', // gray
    '#000000'  // black
  ];
  
  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };
  
  // Handle color selection
  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      color
    });
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      color: '#6366f1'
    });
    setEditId(null);
    setError('');
  };
  
  // Open dialog for adding category
  const handleOpenAddDialog = () => {
    resetForm();
    setOpenDialog(true);
  };
  
  // Open dialog for editing category
  const handleOpenEditDialog = (category) => {
    setFormData({
      name: category.name,
      color: category.color
    });
    setEditId(category.id);
    setOpenDialog(true);
  };
  
  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };
  
  // Submit form
  const handleSubmit = () => {
    // Validate form
    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }
    
    // Check if category name already exists (except for editing)
    const categoryExists = categories.some(
      category => category.name.toLowerCase() === formData.name.toLowerCase() && 
      category.id !== editId
    );
    
    if (categoryExists) {
      setError('Category with this name already exists');
      return;
    }
    
    if (editId) {
      // Update existing category
      updateCategory(editId, formData);
    } else {
      // Add new category
      addCategory(formData);
    }
    
    // Close dialog and reset form
    handleCloseDialog();
  };
  
  // Handle category deletion
  const handleDeleteCategory = (id) => {
    // Check if there are associated tasks
    const category = categories.find(cat => cat.id === id);
    setDeleteConfirm(category);
  };
  
  // Confirm category deletion
  const confirmDeleteCategory = () => {
    if (deleteConfirm) {
      deleteCategory(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };
  
  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Categories
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add Category
        </Button>
      </Box>
      
      {/* Categories grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: category.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <LabelIcon sx={{ color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {category.name}
                  </Typography>
                  <Chip
                    size="small"
                    label={category.color}
                    sx={{
                      bgcolor: `${category.color}10`,
                      color: category.color,
                      fontFamily: 'monospace',
                      fontWeight: 500
                    }}
                  />
                </Box>
              </Box>
              
              <Box>
                <IconButton 
                  onClick={() => handleOpenEditDialog(category)}
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                
                <IconButton 
                  onClick={() => handleDeleteCategory(category.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Empty state */}
      {categories.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No categories found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create categories to organize your tasks
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
          >
            Add Your First Category
          </Button>
        </Paper>
      )}
      
      {/* Category form dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editId ? 'Edit Category' : 'Add Category'}
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Category Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              autoFocus
              required
              error={!!error}
              helperText={error}
              sx={{ mb: 3 }}
            />
            
            <Typography variant="subtitle2" gutterBottom>
              Category Color
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {colorOptions.map((color) => (
                <Box
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: color,
                    cursor: 'pointer',
                    border: formData.color === color ? `2px solid ${theme.palette.divider}` : 'none',
                    boxShadow: formData.color === color ? theme.shadows[4] : 'none',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: theme.shadows[2]
                    }
                  }}
                />
              ))}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle2" sx={{ mr: 2 }}>
                Preview:
              </Typography>
              <Chip
                icon={
                  <Box
                    component="span"
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: formData.color,
                      display: 'inline-block'
                    }}
                  />
                }
                label={formData.name || 'Category Name'}
                sx={{
                  bgcolor: `${formData.color}10`,
                  color: formData.color,
                  fontWeight: 500
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>
          Delete Category
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete the category "{deleteConfirm?.name}"?
          </Typography>
          <Alert severity="warning">
            Tasks associated with this category will be moved to "Uncategorized".
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button onClick={confirmDeleteCategory} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
// src/pages/CategoryManagement.js
import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Label as LabelIcon,
} from '@mui/icons-material';
import { TaskContext } from '../context/TaskContext';
import CategoryForm from '../components/ui/CategoryForm';

const CategoryManagement = () => {
  const { categories, tasks, deleteCategory } = useContext(TaskContext);
  
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(null);
  
  const getCategoryTaskCount = (categoryId) => {
    return tasks.filter(task => task.categoryId === categoryId).length;
  };
  
  const handleEditCategory = (category) => {
    setEditCategory(category);
  };
  
  const handleDeleteClick = (category) => {
    setDeleteDialog(category);
  };
  
  const handleConfirmDelete = () => {
    if (deleteDialog) {
      deleteCategory(deleteDialog.id);
      setDeleteDialog(null);
    }
  };
  
  const handleCloseEditDialog = () => {
    setEditCategory(null);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Categories
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setNewCategoryDialog(true)}
        >
          New Category
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper>
            <List>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <ListItem>
                      <Box 
                        sx={{ 
                          width: 16, 
                          height: 16, 
                          borderRadius: '50%', 
                          backgroundColor: category.color,
                          mr: 2
                        }} 
                      />
                      <ListItemText 
                        primary={category.name} 
                        secondary={`${getCategoryTaskCount(category.id)} tasks`} 
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Edit">
                          <IconButton 
                            edge="end" 
                            aria-label="edit"
                            onClick={() => handleEditCategory(category)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleDeleteClick(category)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < categories.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText 
                    primary="No categories found" 
                    secondary="Create a new category to organize your tasks" 
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              About Categories
            </Typography>
            <Typography variant="body2" paragraph>
              Categories help you organize your tasks by grouping them by project, area of responsibility, or any other criteria that makes sense for you.
            </Typography>
            <Typography variant="body2" paragraph>
              Each category can have its own color to make it easily identifiable in the task list.
            </Typography>
            <Typography variant="body2">
              You can assign a category to a task when creating or editing it.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={() => setNewCategoryDialog(true)}
              >
                Create New Category
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* New Category Dialog */}
      <CategoryForm
        open={newCategoryDialog}
        onClose={() => setNewCategoryDialog(false)}
        editMode={false}
      />
      
      {/* Edit Category Dialog */}
      <CategoryForm
        open={!!editCategory}
        onClose={handleCloseEditDialog}
        category={editCategory}
        editMode={true}
      />
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the category "{deleteDialog?.name}"? 
            {getCategoryTaskCount(deleteDialog?.id) > 0 && (
              <span>
                <br /><br />
                This category is assigned to {getCategoryTaskCount(deleteDialog?.id)} task(s). 
                These tasks will have their category removed but will not be deleted.
              </span>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManagement;
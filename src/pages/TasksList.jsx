// src/pages/TasksList.js
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TaskContext } from '../context/TaskContext';
import SearchBar from '../components/ui/SearchBar';
import TaskFilters from '../components/ui/TaskFilters';
import TaskCard from '../components/ui/TaskCard';
import TaskForm from '../components/ui/TaskForm';

const TasksList = () => {
  const location = useLocation();
  const { tasks, filterTasks, sortTasks, updateTask, deleteTask } = useContext(TaskContext);
  
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('dueDate');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [newTaskDialog, setNewTaskDialog] = useState(false);
  
  // Bulk actions menu
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const bulkMenuOpen = Boolean(anchorEl);
  
  // Handle "New Task" dialog when navigating from other pages
  useEffect(() => {
    if (location.state && location.state.openNewTaskDialog) {
      setNewTaskDialog(true);
      // Clear the state to prevent reopening on navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  // Apply filters and sorting when tasks, filters, or sort criteria change
  useEffect(() => {
    let result = [...tasks];
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        (task.description && task.description.toLowerCase().includes(query))
      );
    }
    
    // Apply filters
    if (Object.keys(filters).length > 0) {
      result = filterTasks({ ...filters, search: searchQuery });
    }
    
    // Apply sorting
    result = sortTasks(result, sortBy);
    
    setFilteredTasks(result);
  }, [tasks, filters, sortBy, searchQuery, filterTasks, sortTasks]);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };
  
  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };
  
  const handleTaskSelect = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };
  
  const handleBulkMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleBulkMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleBulkComplete = () => {
    selectedTasks.forEach(taskId => {
      updateTask(taskId, { status: 'completed' });
    });
    setSelectedTasks([]);
    handleBulkMenuClose();
  };
  
  const handleBulkDelete = () => {
    selectedTasks.forEach(taskId => {
      deleteTask(taskId);
    });
    setSelectedTasks([]);
    handleBulkMenuClose();
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Tasks
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            size="small"
          >
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid view">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setNewTaskDialog(true)}
          >
            New Task
          </Button>
        </Box>
      </Box>
      
      <SearchBar onSearch={handleSearch} />
      
      <TaskFilters onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      
      {selectedTasks.length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {selectedTasks.length} task(s) selected
          </Typography>
          
          <Button
            variant="outlined"
            size="small"
            onClick={handleBulkMenuOpen}
            endIcon={<MoreVertIcon />}
          >
            Bulk Actions
          </Button>
          
          <Menu
            anchorEl={anchorEl}
            open={bulkMenuOpen}
            onClose={handleBulkMenuClose}
          >
            <MenuItem onClick={handleBulkComplete}>
              <ListItemIcon>
                <CheckCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Mark as Completed</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleBulkDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      )}
      
      {filteredTasks.length > 0 ? (
        <Grid container spacing={2}>
          {filteredTasks.map(task => (
            <Grid item xs={12} md={viewMode === 'grid' ? 6 : 12} key={task.id}>
              <TaskCard task={task} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try changing your filters or create a new task
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            sx={{ mt: 2 }}
            onClick={() => setNewTaskDialog(true)}
          >
            Create New Task
          </Button>
        </Box>
      )}
      
      {/* New Task Dialog */}
      <TaskForm 
        open={newTaskDialog} 
        onClose={() => setNewTaskDialog(false)}
        editMode={false}
      />
    </Box>
  );
};

export default TasksList;
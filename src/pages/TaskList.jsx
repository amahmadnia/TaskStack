// src/pages/TaskList.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Paper,
  FormControl,
  Select,
  Tabs,
  Tab,
  Badge,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Tooltip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  CheckCircle,
  MoreVert,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Sort as SortIcon,
  ViewList,
  ViewModule,
  CalendarToday,
  Flag as FlagIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
import { format, isToday, isBefore } from 'date-fns';

const TaskList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { tasks, categories, toggleTaskCompletion, deleteTask } = useTaskContext();
  
  // State for filtering, sorting, and display options
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate-asc');
  const [viewMode, setViewMode] = useState('list');
  const [tabValue, setTabValue] = useState(0);
  
  // Sort & filter menu state
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  
  // Filter and sort tasks
  useEffect(() => {
    let result = [...tasks];
    
    // Filter by tab value
    if (tabValue === 1) {
      result = result.filter(task => !task.completed);
    } else if (tabValue === 2) {
      result = result.filter(task => task.completed);
    } else if (tabValue === 3) {
      result = result.filter(task => !task.completed && new Date(task.dueDate) < new Date());
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        (task.description && task.description.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (filterCategory !== 'all') {
      result = result.filter(task => task.category === filterCategory);
    }
    
    // Filter by status
    if (filterStatus === 'completed') {
      result = result.filter(task => task.completed);
    } else if (filterStatus === 'active') {
      result = result.filter(task => !task.completed);
    } else if (filterStatus === 'overdue') {
      result = result.filter(task => !task.completed && new Date(task.dueDate) < new Date());
    }
    
    // Sort tasks
    const [sortField, sortDirection] = sortBy.split('-');
    
    result.sort((a, b) => {
      if (sortField === 'dueDate') {
        return sortDirection === 'asc' 
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      } else if (sortField === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sortDirection === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortDirection === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });
    
    setFilteredTasks(result);
  }, [tasks, searchQuery, filterCategory, filterStatus, sortBy, tabValue]);
  
  // Handle task click
  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  
  // Handle clearing filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setFilterStatus('all');
    setSortBy('dueDate-asc');
  };
  
  // Calculate tab counts
  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const overdueTasks = tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date()).length;
  
  // Handle sort menu
  const handleSortMenuOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  
  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };
  
  // Task item component for list view
  const TaskListItem = ({ task }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
    
    // Format date
    const formatDate = (dateString) => {
      const today = new Date();
      const taskDate = new Date(dateString);
      
      if (isToday(taskDate)) {
        return 'Today';
      } else if (isBefore(taskDate, today)) {
        return `${format(taskDate, 'MMM d')} (Overdue)`;
      } else {
        return format(taskDate, 'MMM d');
      }
    };
    
    // Priority color
    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high': return theme.palette.error.main;
        case 'medium': return theme.palette.warning.main;
        case 'low': return theme.palette.success.main;
        default: return theme.palette.info.main;
      }
    };
    
    return (
      <Card 
        onClick={() => handleTaskClick(task.id)}
        sx={{ 
          mb: 2,
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[2]
          },
          opacity: task.completed ? 0.7 : 1,
          borderLeft: `4px solid ${task.categoryColor}`,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox 
              checked={task.completed}
              onChange={(e) => {
                e.stopPropagation();
                toggleTaskCompletion(task.id);
              }}
              sx={{ 
                mr: 1,
                color: task.completed ? theme.palette.success.main : theme.palette.text.disabled,
                '&.Mui-checked': {
                  color: theme.palette.success.main,
                }
              }}
            />
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 500,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.secondary' : 'text.primary'
                }}
              >
                {task.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip 
                  label={task.category} 
                  size="small" 
                  sx={{ 
                    mr: 2,
                    bgcolor: `${task.categoryColor}20`,
                    color: task.categoryColor,
                    fontWeight: 500,
                    height: 24
                  }} 
                />
                
                <Typography 
                  variant="body2" 
                  color={isOverdue ? 'error.main' : 'text.secondary'}
                  sx={{ display: 'flex', alignItems: 'center', mr: 2 }}
                >
                  <CalendarToday fontSize="small" sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                  {formatDate(task.dueDate)}
                </Typography>
                
                <Chip
                  icon={<FlagIcon style={{ color: getPriorityColor(task.priority) }} />}
                  label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  size="small"
                  sx={{ 
                    height: 24,
                    bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                    fontWeight: 500
                  }}
                />
              </Box>
            </Box>
            
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
              sx={{ ml: 1 }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuItem onClick={(e) => {
                e.stopPropagation();
                toggleTaskCompletion(task.id);
                setAnchorEl(null);
              }}>
                <ListItemIcon>
                  <CheckCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                </ListItemText>
              </MenuItem>
              
              <MenuItem onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
                navigate(`/tasks/${task.id}`);
              }}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  Edit
                </ListItemText>
              </MenuItem>
              
              <Divider />
              
              <MenuItem onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
                setAnchorEl(null);
              }}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText sx={{ color: 'error.main' }}>
                  Delete
                </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Tasks
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/new-task')}
        >
          Add Task
        </Button>
      </Box>
      
      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          sx={{ mb: 1 }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">All</Typography>
                <Chip label={tasks.length} size="small" sx={{ ml: 1, height: 20, minWidth: 20 }} />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">Active</Typography>
                <Chip label={activeTasks} size="small" sx={{ ml: 1, height: 20, minWidth: 20 }} />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">Completed</Typography>
                <Chip label={completedTasks} size="small" sx={{ ml: 1, height: 20, minWidth: 20 }} />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">Overdue</Typography>
                <Badge badgeContent={overdueTasks} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', height: 20, minWidth: 20 } }}>
                  <Box sx={{ mr: 1 }} />
                </Badge>
              </Box>
            } 
          />
        </Tabs>
      </Paper>
      
      {/* Search and filter bar */}
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchQuery ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchQuery('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null
          }}
          size="small"
          sx={{ minWidth: 250, flexGrow: 1 }}
        />
        
        <FormControl sx={{ minWidth: 150 }} size="small">
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            displayEmpty
            startAdornment={<FilterListIcon sx={{ fontSize: '1.1rem', mr: 1, color: 'action.active' }} />}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <Divider />
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
        
        <Box>
          <Tooltip title="Sort Tasks">
            <Button
              startIcon={<SortIcon />}
              variant="outlined"
              size="small"
              onClick={handleSortMenuOpen}
            >
              Sort
            </Button>
          </Tooltip>
          
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={handleSortMenuClose}
          >
            <MenuItem selected={sortBy === 'dueDate-asc'} onClick={() => { setSortBy('dueDate-asc'); handleSortMenuClose(); }}>
              Due Date (Earliest First)
            </MenuItem>
            <MenuItem selected={sortBy === 'dueDate-desc'} onClick={() => { setSortBy('dueDate-desc'); handleSortMenuClose(); }}>
              Due Date (Latest First)
            </MenuItem>
            <MenuItem selected={sortBy === 'priority-desc'} onClick={() => { setSortBy('priority-desc'); handleSortMenuClose(); }}>
              Priority (High to Low)
            </MenuItem>
            <MenuItem selected={sortBy === 'title-asc'} onClick={() => { setSortBy('title-asc'); handleSortMenuClose(); }}>
              Title (A-Z)
            </MenuItem>
          </Menu>
        </Box>
        
        <Box>
          <Tooltip title="List View">
            <IconButton color={viewMode === 'list' ? 'primary' : 'default'} onClick={() => setViewMode('list')}>
              <ViewList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Grid View">
            <IconButton color={viewMode === 'grid' ? 'primary' : 'default'} onClick={() => setViewMode('grid')}>
              <ViewModule />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Active filters */}
      {(searchQuery || filterCategory !== 'all' || sortBy !== 'dueDate-asc') && (
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Active filters:
          </Typography>
          
          {searchQuery && (
            <Chip label={`Search: "${searchQuery}"`} size="small" onDelete={() => setSearchQuery('')} />
          )}
          
          {filterCategory !== 'all' && (
            <Chip label={`Category: ${filterCategory}`} size="small" onDelete={() => setFilterCategory('all')} />
          )}
          
          {sortBy !== 'dueDate-asc' && (
            <Chip label={`Sort: ${sortBy.split('-')[0]}`} size="small" onDelete={() => setSortBy('dueDate-asc')} />
          )}
          
          <Button variant="text" size="small" startIcon={<ClearIcon />} onClick={handleClearFilters}>
            Clear All
          </Button>
        </Box>
      )}
      
      {/* Task list */}
      <Box>
        {filteredTasks.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {searchQuery || filterCategory !== 'all' ? 'No tasks match your filters' : 'No tasks found'}
            </Typography>
            
            {searchQuery || filterCategory !== 'all' ? (
              <Button variant="outlined" onClick={handleClearFilters} startIcon={<ClearIcon />} sx={{ mt: 2 }}>
                Clear Filters
              </Button>
            ) : (
              <Button variant="contained" onClick={() => navigate('/new-task')} startIcon={<AddIcon />} sx={{ mt: 2 }}>
                Add Your First Task
              </Button>
            )}
          </Box>
        ) : (
          viewMode === 'list' ? (
            filteredTasks.map(task => <TaskListItem key={task.id} task={task} />)
          ) : (
            <Grid container spacing={3}>
              {filteredTasks.map(task => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <Card 
                    onClick={() => handleTaskClick(task.id)}
                    sx={{ 
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[4]
                      },
                      opacity: task.completed ? 0.7 : 1,
                      position: 'relative',
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        height: '6px', 
                        bgcolor: task.categoryColor,
                        borderTopLeftRadius: theme.shape.borderRadius,
                        borderTopRightRadius: theme.shape.borderRadius
                      }} 
                    />
                    <CardContent sx={{ pt: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Chip 
                          label={task.category} 
                          size="small" 
                          sx={{ 
                            bgcolor: `${task.categoryColor}20`,
                            color: task.categoryColor,
                            fontWeight: 500
                          }} 
                        />
                        <Checkbox 
                          checked={task.completed}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleTaskCompletion(task.id);
                          }}
                          size="small"
                        />
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 2, 
                          textDecoration: task.completed ? 'line-through' : 'none',
                          color: task.completed ? 'text.secondary' : 'text.primary',
                          fontSize: '1.1rem'
                        }}
                      >
                        {task.title}
                      </Typography>
                      {task.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
                          {task.description}
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          <CalendarToday fontSize="small" sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                          {format(new Date(task.dueDate), 'MMM d')}
                        </Typography>
                        <Chip
                          size="small"
                          label={task.priority}
                          sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )
        )}
      </Box>
      
      {/* Summary */}
      {filteredTasks.length > 0 && (
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaskList;
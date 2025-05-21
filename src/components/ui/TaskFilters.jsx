// src/components/ui/TaskFilters.js
import React, { useState, useContext } from "react"
import {
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Typography,
  Divider,
  useTheme,
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import SortIcon from "@mui/icons-material/Sort"
import ClearIcon from "@mui/icons-material/Clear"
import { TaskContext } from "../../context/TaskContext"

const initialFilters = {
  status: "",
  priority: "",
  categoryId: "",
  dueDate: "",
}

const TaskFilters = ({ onFilterChange, onSortChange }) => {
  const { categories } = useContext(TaskContext)
  const [filters, setFilters] = useState(initialFilters)
  const [sortBy, setSortBy] = useState("dueDate")
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)
  const theme = useTheme();

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const newFilters = {
      ...filters,
      [name]: value,
    }
    setFilters(newFilters)

    // Count active filters
    const count = Object.values(newFilters).filter((val) => val !== "").length
    setActiveFiltersCount(count)

    // Notify parent component
    onFilterChange(newFilters)
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    setSortBy(value)
    onSortChange(value)
  }

  const handleClearFilters = () => {
    setFilters(initialFilters)
    setActiveFiltersCount(0)
    onFilterChange(initialFilters)
  }

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FilterListIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
        <Typography variant="h6" fontWeight="600">
          Filters
        </Typography>

        {activeFiltersCount > 0 && (
          <Chip
            label={`${activeFiltersCount} active`}
            size="small"
            sx={{ 
              ml: 1, 
              backgroundColor: theme.palette.primary.main, 
              color: '#fff',
              fontWeight: 500,
              borderRadius: 1
            }}
            onDelete={handleClearFilters}
            deleteIcon={<ClearIcon sx={{ color: '#fff' }} />}
          />
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SortIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-by"
              value={sortBy}
              label="Sort By"
              onChange={handleSortChange}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="dueDate">Due Date</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="createdAt">Created Date</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Divider sx={{ mb: 2, opacity: 0.5 }} />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            name="status"
            value={filters.status}
            label="Status"
            onChange={handleFilterChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="priority-filter-label">Priority</InputLabel>
          <Select
            labelId="priority-filter-label"
            id="priority-filter"
            name="priority"
            value={filters.priority}
            label="Priority"
            onChange={handleFilterChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            name="categoryId"
            value={filters.categoryId}
            label="Category"
            onChange={handleFilterChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: category.color,
                      mr: 1
                    }}
                  />
                  {category.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="duedate-filter-label">Due Date</InputLabel>
          <Select
            labelId="duedate-filter-label"
            id="duedate-filter"
            name="dueDate"
            value={filters.dueDate}
            label="Due Date"
            onChange={handleFilterChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="upcoming">Next 7 Days</MenuItem>
            <MenuItem value="overdue">Overdue</MenuItem>
          </Select>
        </FormControl>

        {activeFiltersCount > 0 && (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
            sx={{ 
              ml: 2, 
              borderRadius: 2, 
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Clear Filters
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default TaskFilters
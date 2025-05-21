// src/pages/CategoryManagement.js
import React, { useContext } from "react"
import { Box, Typography } from "@mui/material"
import { TaskContext } from "../context/TaskContext"

const CategoryManagement = () => {
  const { categories } = useContext(TaskContext)

  // This will be implemented fully later
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      {/* Category management UI will go here */}
    </Box>
  )
}

export default CategoryManagement

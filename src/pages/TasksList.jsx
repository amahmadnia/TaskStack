// src/pages/TasksList.js
import React, { useContext, useState } from "react"
import { Box, Typography } from "@mui/material"
import { TaskContext } from "../context/TaskContext"

const TasksList = () => {
  const { tasks } = useContext(TaskContext)

  // This will be implemented fully later
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Tasks
      </Typography>
      {/* Task filtering and search components will go here */}
      {/* Task list will go here */}
    </Box>
  )
}

export default TasksList

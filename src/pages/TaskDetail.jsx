// src/pages/TaskDetail.js
import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { TaskContext } from "../context/TaskContext"

const TaskDetail = () => {
  const { taskId } = useParams()
  const { getTask } = useContext(TaskContext)
  const [task, setTask] = useState(null)

  // This will be implemented fully later
  useEffect(() => {
    const taskData = getTask(taskId)
    if (taskData) {
      setTask(taskData)
    }
  }, [taskId, getTask])

  if (!task) {
    return <Typography>Task not found</Typography>
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {task.title}
      </Typography>
      {/* Task details will go here */}
    </Box>
  )
}

export default TaskDetail

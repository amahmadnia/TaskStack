// src/pages/Dashboard.js
import React, { useContext } from "react"
import { Box, Typography, Paper, Grid } from "@mui/material"
import { TaskContext } from "../context/TaskContext"

const Dashboard = () => {
  const { getTaskStatistics } = useContext(TaskContext)

  // This will be implemented fully later
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 140,
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Total Tasks
            </Typography>
            <Typography component="p" variant="h4">
              {/* Will display total tasks */}
            </Typography>
          </Paper>
        </Grid>
        {/* More dashboard widgets will go here */}
      </Grid>
    </Box>
  )
}
export default Dashboard;
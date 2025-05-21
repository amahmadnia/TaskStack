// src/pages/Settings.js
import React, { useContext } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material"
import { ThemeContext } from "../context/ThemeContext"
import { TaskContext } from "../context/TaskContext"
import ImportExport from "../components/ui/ImportExport"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { exportData, importData, clearAllData } = useContext(TaskContext)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
<Grid item xs={12} md={6}>
          <ImportExport />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Appearance
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {theme === "dark" ? (
                    <Brightness7Icon sx={{ mr: 1 }} />
                  ) : (
                    <Brightness4Icon sx={{ mr: 1 }} />
                  )}
                  <Typography>
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </Typography>
                </Box>
              }
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Switch between light and dark theme. Your preference will be
              remembered the next time you visit.
            </Typography>
          </Paper>

          {/* <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Application Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Version</Typography>
              <Typography variant="body2" color="text.secondary">
                1.0.0
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Created With</Typography>
              <Typography variant="body2" color="text.secondary">
                React, Material UI, and LocalStorage
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1">About</Typography>
              <Typography variant="body2" color="text.secondary">
                This Task Manager is a personal productivity tool that helps you
                organize and track your tasks. All data is stored locally in
                your browser.
              </Typography>
            </Box>
          </Paper> */}
        </Grid>

        
      </Grid>
    </Box>
  )
}

export default Settings

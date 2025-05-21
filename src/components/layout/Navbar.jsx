import React, { useContext } from "react"
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { ThemeContext } from "../../context/ThemeContext"
import { TaskContext } from "../../context/TaskContext"

const Navbar = ({ toggleDrawer }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { tasks } = useContext(TaskContext)
  const muiTheme = useTheme();

  // Calculate overdue tasks for notification badge
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const overdueCount = tasks.filter(
    (task) => task.status !== "completed" && new Date(task.dueDate) < today,
  ).length

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed"
        elevation={0}
        sx={{ 
          backgroundColor: theme === "dark" ? muiTheme.palette.primary.dark : muiTheme.palette.primary.main,
          borderBottom: `1px solid ${theme === "dark" ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}` 
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: "none", sm: "block" },
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            Task Manager
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="theme"
              color="inherit"
              onClick={toggleTheme}
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
                mr: 1
              }}
            >
              {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
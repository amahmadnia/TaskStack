// src/components/layout/Sidebar.jsx
import React, { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ListAltIcon from "@mui/icons-material/ListAlt"
import LabelIcon from "@mui/icons-material/Label"
import SettingsIcon from "@mui/icons-material/Settings"
import AddIcon from "@mui/icons-material/Add"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { ThemeContext } from "../../context/ThemeContext"

const drawerWidth = 240

const Sidebar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const { theme: themeMode } = useContext(ThemeContext)

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Tasks", icon: <ListAltIcon />, path: "/tasks" },
    { text: "Categories", icon: <LabelIcon />, path: "/categories" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: { xs: "none", sm: "block" },
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: `1px solid ${themeMode === "dark" ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
          backgroundColor: themeMode === "dark" ? theme.palette.primary.dark : theme.palette.background.default,
        },
      }}
    >
      <Box padding={3} display="flex" alignItems="center" justifyContent="center">
        <Avatar
          sx={{
            width: 50,
            height: 50,
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            mr: 1
          }}
        >
          <TaskAltIcon />
        </Avatar>
        <Typography variant="h6" fontWeight="600" color="primary">
          TaskTracker
        </Typography>
      </Box>

      <Divider sx={{ mx: 2, opacity: 0.3 }} />

      <Box sx={{ overflow: "auto", px: 1, py: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path)
                  if (window.innerWidth < 600) {
                    toggleDrawer()
                  }
                }}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  '&.Mui-selected': {
                    backgroundColor: themeMode === "dark" 
                      ? 'rgba(142, 202, 230, 0.15)' 
                      : 'rgba(33, 158, 188, 0.1)',
                    '&:hover': {
                      backgroundColor: themeMode === "dark" 
                        ? 'rgba(142, 202, 230, 0.25)' 
                        : 'rgba(33, 158, 188, 0.2)',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: location.pathname === item.path ? theme.palette.primary.main : undefined 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path ? theme.palette.primary.main : undefined
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2, mx: 2, opacity: 0.3 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/tasks", { state: { openNewTaskDialog: true } })
                if (window.innerWidth < 600) {
                  toggleDrawer()
                }
              }}
              sx={{
                borderRadius: 2,
                py: 1.5,
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: '#fff' }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Add New Task" 
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
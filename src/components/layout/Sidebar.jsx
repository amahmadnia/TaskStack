// src/components/layout/Sidebar.js
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
} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ListAltIcon from "@mui/icons-material/ListAlt"
import LabelIcon from "@mui/icons-material/Label"
import SettingsIcon from "@mui/icons-material/Settings"
import AddIcon from "@mui/icons-material/Add"

const drawerWidth = 240

const Sidebar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate()
  const location = useLocation()

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
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          transform: {
            xs: open ? "translateX(0)" : `translateX(-${drawerWidth}px)`,
            sm: "none",
          },
          transition: (theme) =>
            theme.transitions.create("transform", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path)
                  if (window.innerWidth < 600) {
                    toggleDrawer()
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/tasks", { state: { openNewTaskDialog: true } })
                if (window.innerWidth < 600) {
                  toggleDrawer()
                }
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add New Task" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
export default Sidebar

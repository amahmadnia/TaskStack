// src/components/common/PriorityBadge.js
import React from "react"
import { Chip } from "@mui/material"
import FlagIcon from "@mui/icons-material/Flag"

const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    high: {
      color: "error",
      icon: <FlagIcon />,
    },
    medium: {
      color: "warning",
      icon: <FlagIcon />,
    },
    low: {
      color: "info",
      icon: <FlagIcon />,
    },
  }

  const config = priorityConfig[priority] || priorityConfig.medium

  return (
    <Chip
      icon={config.icon}
      label={priority.charAt(0).toUpperCase() + priority.slice(1)}
      color={config.color}
      size="small"
      sx={{ borderRadius: '6px' }}
    />
  )
}

export default PriorityBadge
// src/components/ui/QuickAddTask.js
import React, { useState, useContext } from 'react';
import { Fab, Dialog } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './TaskForm';
import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 999,
}));

const QuickAddTask = () => {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <StyledFab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </StyledFab>
      
      <TaskForm 
        open={open} 
        onClose={handleClose} 
        editMode={false}
      />
    </>
  );
};

export default QuickAddTask;
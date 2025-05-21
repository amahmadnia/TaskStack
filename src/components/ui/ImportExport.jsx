// src/components/ui/ImportExport.js
import React, { useContext, useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TaskContext } from '../../context/TaskContext';
import { clearAllData } from '../../utils/localStorage';

const ImportExport = () => {
  const { exportData, importData } = useContext(TaskContext);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [deleteDialog, setDeleteDialog] = useState(false);
  
  const handleExport = () => {
    const data = exportData();
    const fileName = `task-manager-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    // Create a blob and download it
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    
    setSnackbar({
      open: true,
      message: 'Data exported successfully',
      severity: 'success',
    });
  };
  
  const handleImport = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate data structure
        if (!data.tasks || !data.categories) {
          throw new Error('Invalid data format');
        }
        
        // Import data
        importData(data);
        
        setSnackbar({
          open: true,
          message: 'Data imported successfully',
          severity: 'success',
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: `Import failed: ${error.message}`,
          severity: 'error',
        });
      }
    };
    
    reader.readAsText(file);
    
    // Reset the file input
    event.target.value = null;
  };
  
  const handleClearData = () => {
    setDeleteDialog(false);
    
    // Clear data from localStorage
    const success = clearAllData();
    
    if (success) {
      setSnackbar({
        open: true,
        message: 'All data cleared successfully. Refreshing...',
        severity: 'success',
      });
      
      // Reload the page after a short delay to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to clear data',
        severity: 'error',
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Data Management
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Export Data
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Download all your tasks and categories as a JSON file. You can use this file to backup or transfer your data.
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export Data
        </Button>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Import Data
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Import tasks and categories from a previously exported JSON file. This will replace all your current data.
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
        >
          Import Data
          <input
            type="file"
            accept=".json"
            hidden
            onChange={handleImport}
          />
        </Button>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom color="error">
          Danger Zone
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Clear all your data from this device. This action cannot be undone.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteForeverIcon />}
          onClick={() => setDeleteDialog(true)}
        >
          Clear All Data
        </Button>
      </Box>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      
      {/* Confirmation dialog for clearing data */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>Clear All Data?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete all your tasks and categories. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClearData} color="error" variant="contained">
            Clear All Data
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ImportExport;
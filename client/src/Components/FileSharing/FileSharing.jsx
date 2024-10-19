import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import "./FileSharing.css";

const FileSharing = () => {
  const [files, setFiles] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handle file selection
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles.map((file) => ({ file, permission: "view" })),
    ]);
  };

  // Handle permission change
  const handlePermissionChange = (fileName, newPermission) => {
    setPermissions((prev) => ({
      ...prev,
      [fileName]: newPermission,
    }));
  };

  // Handle file deletion
  const handleDeleteFile = (fileName) => {
    setFiles((prevFiles) =>
      prevFiles.filter((fileObj) => fileObj.file.name !== fileName)
    );
  };

  // Handle file upload
  const handleUpload = () => {
    if (files.length > 0) {
      setLoading(true);
      // Simulate file upload logic
      setTimeout(() => {
        setLoading(false);
        setSnackbarOpen(true);
        setFiles([]); // Clear file selection after upload
      }, 2000);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        File Sharing and Document Management
      </Typography>

      {/* File Selection */}
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" component="label" sx={{ mb: 1 }}>
          Select Files
          <input type="file" multiple hidden onChange={handleFileSelect} />
        </Button>
      </Box>

      {/* Selected Files Grid */}
      {files.length > 0 && (
        <>
          <Grid container spacing={2}>
            {files.map((fileObj, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ p: 1 }}>
                  <CardContent sx={{ p: 1 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {fileObj.file.name}
                    </Typography>
                    <Select
                      value={permissions[fileObj.file.name] || "view"}
                      onChange={(e) =>
                        handlePermissionChange(
                          fileObj.file.name,
                          e.target.value
                        )
                      }
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      <MenuItem value="view">View</MenuItem>
                      <MenuItem value="edit">Edit</MenuItem>
                    </Select>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end", p: 1 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteFile(fileObj.file.name)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Upload Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Upload Files"}
          </Button>
        </>
      )}

      {/* Snackbar for Success Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Files uploaded successfully!"
      />
    </Box>
  );
};

export default FileSharing;

import React, { useState } from "react";
import { Switch, Button, TextField, IconButton, Chip } from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import UploadIcon from "@mui/icons-material/Upload";
const ImportSection = ({ imports, onSubmit }) => {
  const [isImportImage, setIsImportImage] = useState(false);
  const [importData, setImportData] = useState([imports]);
  // Event handler for the switch toggle
  const handleSwitchChange = (event) => {
    setIsImportImage(event.target.checked);
    // setImportData(null);
  };

  const handleTextChange = (event) => {
    setImportData(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportData(file); // Store the file in the state
    }
  };

  const handleSubmit = () => {
    if (importData) {
      onSubmit(importData);
    }
  };

  return (
    <div className="w-full">
      <div id="gutter" className="relative flex w-full pt-1.5"></div>
      <div className="relative flex w-full pb-1.5 justify-between items-center content-center pr-1.5">
        <Switch
          size="small"
          checked={isImportImage}
          onChange={handleSwitchChange}
          sx={{
            transform: "rotate(270deg)", // Rotate 90 degrees
            transformOrigin: "center",
            "& .MuiSwitch-thumb": {
              transform: "rotate(90deg)",
            }, // Adjust origin if needed
          }}
        />
        <div className="flex flex-shrink-0 w-[60%] h-20 justify-center items-center">
          {isImportImage ? (
            <div className="flex flex-shrink-0 w-full  justify-center items-center space-x-2">
              <label htmlFor="upload-image">
                <input
                  type="file"
                  id="upload-image"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <IconButton
                  component="span"
                  // sx={{ height: "100%", width: "auto" }}
                >
                  <UploadIcon />
                </IconButton>
              </label>
              {importData instanceof File && importData.name && (
                <Chip
                  label={importData.name}
                  variant="outlined"
                  size="small"
                  sx={{
                    padding: "0.125rem",
                    // height: "3rem",
                  }}
                />
              )}
            </div>
          ) : (
            // Render the text field for text data
            <TextField
              label="Import Text Data"
              variant="standard"
              value={importData}
              onChange={handleTextChange}
              size="small"
              required
              sx={{
                padding: "0.125rem",
                height: "3rem",
              }}
            />
          )}
        </div>
        <IconButton
          size="small"
          onClick={handleSubmit}
          sx={{
            padding: "0.125rem",
          }}
        >
          <DoneRoundedIcon
            sx={{
              padding: "0.125rem",
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ImportSection;

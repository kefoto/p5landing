import React, { useState, useEffect } from "react";
import { Switch, TextField, IconButton, Chip } from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import UploadIcon from "@mui/icons-material/Upload";
import CollapseWidthWrapper from "../wrapper/CollapseWidthWrapper";

const ImportSection = ({ imports, onSubmit, isImage, onImageToggle }) => {
  const [importData, setImportData] = useState(imports);

  // useEffect(() => {

  // }, [importData]);
  const handleImportChange = (event) => {
    const newBoolean = event.target.checked;
    onImageToggle(newBoolean);

    // console.log(newboolean);
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setImportData((prevData) => ({
      ...prevData,
      text: newText,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = () => {
    // event.preventDefault();
    if (importData) {
      onSubmit(importData);
    }
  };

  useEffect(() => {
    if (importData.image) {
      const fileURL = URL.createObjectURL(importData.image);

      setImportData((prevData) => ({
        ...prevData,
        url: fileURL,
      }));

      // Cleanup URL to avoid memory leaks
      return () => {
        URL.revokeObjectURL(fileURL);
      };
    }
  }, [importData.image]);

  const hasImage = !!importData?.image;

  return (
    <div className="w-full">
      <div id="gutter" className="relative flex w-full pt-1.5"></div>
      <div className="relative flex w-full pb-1.5 justify-between items-center content-center pr-1.5">
        <Switch
          size="small"
          checked={isImage}
          onChange={handleImportChange}
          sx={{
            transform: "rotate(270deg)", // Rotate 90 degrees
            transformOrigin: "center",
            "& .MuiSwitch-thumb": {
              transform: "rotate(90deg)",
            }, // Adjust origin if needed
          }}
        />
        <div className="flex flex-shrink-0 w-[60%] h-20 justify-center items-center">
          {isImage ? (
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

              <CollapseWidthWrapper
                isVisible={hasImage}
                keyProp={hasImage ? importData.image.name : "empty"}
              >
                {hasImage && (
                  <Chip
                    label={
                      importData.image.name.length > 14
                        ? `${importData.image.name.slice(0, 14)}...`
                        : importData.image.name
                    }
                    variant="outlined"
                    size="small"
                    sx={{
                      padding: "0.125rem",
                      whiteSpace: "nowrap",
                    }}
                  />
                )}
              </CollapseWidthWrapper>
            </div>
          ) : (
            // Render the text field for text data
            <TextField
              label="Import Text Data"
              variant="standard"
              value={importData.text}
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

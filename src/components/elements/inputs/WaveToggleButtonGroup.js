import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const WaveToggleButtonGroup = ({ value, onChange }) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(e, newType) => {
        if (newType !== null) {
          onChange(newType);
        }
      }}
      aria-label="wave type"
      sx={{

        height: "1.75rem",
      }}
    >
      <ToggleButton
        value="sin"
        size="small"
        sx={{
          borderRadius: "50%",
          textTransform: "none",
        }}
      >
        sin
      </ToggleButton>
      <ToggleButton
        value="cos"
        size="small"
        sx={{
          borderRadius: "50%",
          textTransform: "none",
        }}
      >
        cos
      </ToggleButton>
      <ToggleButton
        value="tan"
        size="small"
        sx={{
          borderRadius: "50%",
          textTransform: "none",
        }}
      >
        tan
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default WaveToggleButtonGroup;

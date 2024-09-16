import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import StyledToggleButtonGroup from "./StyledToggleButtonGroup";

const WaveToggleButtonGroup = ({ value, onChange }) => {
  return (
    <StyledToggleButtonGroup
      value={value}
      exclusive
      onChange={(e, newType) => {
        if (newType !== null) {
          onChange(newType);
        }
      }}
      aria-label="wave type"
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
    </StyledToggleButtonGroup>
  );
};

export default WaveToggleButtonGroup;

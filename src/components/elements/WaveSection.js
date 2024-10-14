import React, { useState } from "react";

import {
  // Slider,
  IconButton,
  // FormControl,
  // FormGroup,
  // FormControlLabel,
  // Checkbox,
  // Typography,
  // Box,
  // Grid,
  // Paper,
  // Button,
  // ToggleButton,
  // ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Wave from "./Wave";

const max_waves = 2;

//TODO: there are lots of bugs here
const WaveSection = ({ waveArr = [], onChange}) => {
  const [waves, setWaves] = useState([...waveArr]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [waveIdCounter, setWaveIdCounter] = useState(waves.length);


  const updateWave = (updated) => {
    setWaves(updated)
    onChange(updated)
  }
  const handleAddWave = () => {
    if (waves.length >= max_waves) {
      return;
    }
    setAlertVisible(false);

    const hiddenWaves = waves.map((wave) => ({ ...wave, isVisible: false }));

    const newWave = {
      id: waveIdCounter + 1,
      type: "sin",
      freq: 1,
      amp: 5,
      speed: 0.02,
      x: true,
      y: false,
      w: false,
      h: false,
      isVisible: true,
    };
    const updatedWaves = [...hiddenWaves, newWave];
    updateWave(updatedWaves);
    setWaveIdCounter(waveIdCounter + 1);

    if (updatedWaves.length >= max_waves) {
      setAlertVisible(true);
    }
  };

  const handleRemoveWave = (id) => {
    updateWave(waves.filter((wave) => wave.id !== id));

    setAlertVisible(false);
  };

  const handleWaveChange = (id, field, value) => {
    const updatedWaves = waves.map((wave) =>
      wave.id === id ? { ...wave, [field]: value } : wave
    );
    updateWave(updatedWaves);
  };

  const handleToggleChange = (id, newToggles) => {
    const updatedWaves = waves.map((wave) => {
      if (wave.id === id) {
        return {
          ...wave,
          x: newToggles.includes("x"),
          y: newToggles.includes("y"),
          w: newToggles.includes("w"),
          h: newToggles.includes("h"),
        };
      }
      return wave;
    });
    updateWave(updatedWaves);
  };

  // const handleSubmit = () => {
  //   onSubmit(waves);
  // };

  return (
    <div>
      {waves.map((wave, index) => (
        <Wave
          key={wave.id}
          wave={wave}
          index={index}
          onRemove={handleRemoveWave}
          onWaveChange={handleWaveChange}
          onToggleChange={handleToggleChange}
        />
      ))}
      <div className="flex items-center content-center justify-end pt-1.5 px-1.5">
        {/* <div className="flex justify-center"> */}
        <Tooltip
          title={alertVisible ? `Maximum ${max_waves} waves allowed` : ""}
          disableHoverListener={!alertVisible}
          placement="left"
          arrow
          // className="justify-end"
        >
          <span>
            <IconButton
              size="small"
              onClick={handleAddWave}
              disabled={alertVisible}
            >
              <AddRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>

        {/* <IconButton
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
        </IconButton> */}
      </div>
    </div>
  );
};

export default WaveSection;

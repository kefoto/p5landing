import React, { useState } from "react";

import {
  // Slider,
  IconButton,
  // Alert,
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
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

import Wave from "./Wave";

// import { FormControl, InputLabel } from "@mui/material";

const max_waves = 2;

//TODO: there are lots of bugs here
//TODO: gsap target null
const WaveSection = ({ waveArr = [], onSubmit }) => {
  const [waves, setWaves] = useState([...waveArr]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [waveIdCounter, setWaveIdCounter] = useState(waves.length);

  const handleAddWave = () => {
    if (waves.length >= max_waves) {
      return;
    }
    setAlertVisible(false);

    const newWave = {
      id: waveIdCounter + 1,
      type: "sin",
      freq: 1,
      amp: 1,
      speed: 1,
      x: true,
      y: false,
      w: false,
      h: false,
    };
    const updatedWaves = [...waves, newWave];
    setWaves(updatedWaves);
    setWaveIdCounter(waveIdCounter + 1);

    // Check if the new wave count reaches the maximum limit
    if (updatedWaves.length >= max_waves) {
      setAlertVisible(true);
    }
  };

  const handleRemoveWave = (id) => {
    setWaves(waves.filter((wave) => wave.id !== id));

    setAlertVisible(false);
  };

  const handleWaveChange = (id, field, value) => {
    const updatedWaves = waves.map((wave) =>
      wave.id === id ? { ...wave, [field]: value } : wave
    );
    setWaves(updatedWaves);
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
    setWaves(updatedWaves);
  };

  const handleSubmit = () => {
    onSubmit(waves);
  };

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
      <div className="flex items-center content-center justify-between pt-1.5">
        {/* <div className="flex justify-center"> */}
        <IconButton
          size="small"
          onClick={handleAddWave}
          disabled={alertVisible}
        >
          <AddRoundedIcon />
        </IconButton>

        {/* <div className="flex justify-center"> */}
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default WaveSection;

import React, { useState } from "react";

import {
  Slider,
  IconButton,
  Alert,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import IOSSlider from "./IOSSlider";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

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
      setAlertVisible(true);
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
    setWaves([...waves, newWave]);
    setWaveIdCounter(waveIdCounter + 1);
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
        <div key={wave.id} className="mb-4 w-full">
          <div className="flex justify-between items-center mb-2 h-full w-full">
            <label className="h-full w-auto aspect-square border rounded-full border-black  items-center justify-center">
              {index + 1}
            </label>
            <IconButton size="small" onClick={() => handleRemoveWave(wave.id)}>
              <RemoveRoundedIcon />
            </IconButton>
          </div>
          <div className="flex justify-between items-center mb-2 h-full w-full px-2.5">
            <div className="flex justify-between items-center mb-2">
              <ToggleButtonGroup
                value={wave.type}
                exclusive
                onChange={(e, newType) =>
                  handleWaveChange(wave.id, "type", newType)
                }
                aria-label="wave type"
                size="small"
              >
                <ToggleButton value="sin" size="small">
                  sin
                </ToggleButton>
                <ToggleButton value="cos" size="small">
                  cos
                </ToggleButton>
                <ToggleButton value="tan" size="small">
                  tan
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="flex justify-between items-center mb-2">
              <ToggleButtonGroup
                value={[
                  ...(wave.x ? ["x"] : []),
                  ...(wave.y ? ["y"] : []),
                  ...(wave.w ? ["w"] : []),
                  ...(wave.h ? ["h"] : []),
                ]}
                onChange={(e, newToggles) =>
                  handleToggleChange(wave.id, newToggles)
                }
                aria-label="wave toggles"
                size="small"
              >
                <ToggleButton value="x" size="small">
                  X
                </ToggleButton>
                <ToggleButton value="y" size="small">
                  Y
                </ToggleButton>
                <ToggleButton value="w" size="small">
                  W
                </ToggleButton>
                <ToggleButton value="h" size="small">
                  H
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          <div className="flex justify-between items-center px-2.5">
            <label className="pr-2">Frequency</label>
            <IOSSlider
              size="small"
              value={wave.freq || 0.1}
              onChange={(e, value) => handleWaveChange(wave.id, "freq", value)}
              min={0.1}
              max={10}
              step={0.1}
              // valueLabelDisplay="auto"
            />
          </div>

          <div className="flex justify-between items-center px-2.5">
            <label className="pr-2">Amplitude</label>
            <IOSSlider
              size="small"
              value={wave.amp || 0.1}
              onChange={(e, value) => handleWaveChange(wave.id, "amp", value)}
              min={0.1}
              max={10}
              step={0.1}
              // valueLabelDisplay="auto"
            />
          </div>

          <div className="flex justify-between items-center px-2.5">
            <label className="pr-2">Speed</label>
            <IOSSlider
              size="small"
              value={wave.speed || 0.1}
              onChange={(e, value) => handleWaveChange(wave.id, "speed", value)}
              min={0.1}
              max={10}
              step={0.1}
              // valueLabelDisplay="auto"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between">
        <div className="flex justify-center">
          <IconButton size="small" onClick={handleAddWave}>
            <AddRoundedIcon />
          </IconButton>
        </div>

        <div className="flex justify-center">
          <IconButton size="small" onClick={handleSubmit}>
            <DoneRoundedIcon />
          </IconButton>
        </div>
      </div>

      {alertVisible && (
        <Alert severity="error" onClose={() => setAlertVisible(false)}>
          {`Maximum of ${max_waves} waves allowed!`}
        </Alert>
      )}
    </div>
  );
};

export default WaveSection;

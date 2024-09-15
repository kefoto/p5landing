import React, { useState } from "react";
import { Slider, Select, MenuItem, IconButton, Alert } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import {FormControl, InputLabel} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

//TODO: there are lots of bugs here
const WaveSection = ({ waveArr = [], onSubmit }) => {
  const [waves, setWaves] = useState([...waveArr]);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleAddWave = () => {
    if (waves.length >= 4) {
      setAlertVisible(true);
      return;
    }
    setAlertVisible(false);

    const newWave = {
      id: waves.length + 1,
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

  const handleSubmit = () => {
    onSubmit(waves);
  };

  return (
    <div>
      {waves.map((wave, index) => (
        <div key={wave.id} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="border rounded-full border-black aspect-square items-center justify-center">
              {index + 1}
            </label>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Type</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={wave.type}
                onChange={(e) => handleWaveChange(wave.id, "type", e.target.value)}
              >
                <MenuItem value="sin">sin</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="tan">tan</MenuItem>
              </Select>
            </FormControl>
            <IconButton size="small" onClick={() => handleRemoveWave(wave.id)}>
              <RemoveRoundedIcon />
            </IconButton>
          </div>

          <div className="flex justify-between items-center mb-2">
            <ToggleButtonGroup
              value={wave.type}
              exclusive
              onChange={(e, newType) => handleWaveChange(wave.id, "type", newType)}
              aria-label="wave type"
              size="small"
            >
              <ToggleButton value="sin" size="small">sin</ToggleButton>
              <ToggleButton value="cos" size="small">cos</ToggleButton>
              <ToggleButton value="tan" size="small">tan</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className="flex justify-between items-center">
            <label className="pr-2">Frequency</label>
            <Slider
              size="small"
              value={wave.freq || 0.1}
              onChange={(e, value) => handleWaveChange(wave.id, "freq", value)}
              min={0.1}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="pr-2">Amplitude</label>
            <Slider
              size="small"
              value={wave.amp || 0.1}
              onChange={(e, value) => handleWaveChange(wave.id, "amp", value)}
              min={0.1}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="pr-2">Speed</label>
            <Slider
              size="small"
              value={wave.speed || 0.1}
              onChange={(e, value) => handleWaveChange(wave.id, "speed", value)}
              min={0.1}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
      ))}

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

      {alertVisible && (
        <Alert
          severity="error"
          onClose={() => setAlertVisible(false)}
          className="mb-2"
        >
          Maximum of 4 waves allowed!
        </Alert>
      )}
    </div>
  );
};

export default WaveSection;
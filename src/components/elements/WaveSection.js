import React, { useState } from "react";
import { Slider, Select, MenuItem, IconButton, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";


//TODO: there are lots of bugs here
const WaveSection = ({ waveArr = [], onSubmit }) => {
  const [waves, setWaves] = useState([...waveArr]);

  const handleAddWave = () => {
    const newWave = {
      id: waves.length + 1,
      type: "sin",
      freq: 1,
      amp: 1,
      speed: 1,
    };
    setWaves([...waves, newWave]);
  };

  const handleRemoveWave = (id) => {
    setWaves(waves.filter((wave) => wave.id !== id));
  };

  const handleWaveChange = (id, field, value) => {
    const updatedWaves = waves.map((wave) =>
      wave.id === id ? { ...wave, [field]: value } : wave
    );
    setWaves(updatedWaves);
    // onFormDataChange({ ...formData, waveArr: updatedWaves });
  };

  const handleSubmit = () => {
    onSubmit(waves);
  };

  return (
    <div>
      {waves.map((wave, index) => (
        <div key={wave.id} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold">Wave {index + 1}</label>
            <IconButton size="small" onClick={() => handleRemoveWave(wave.id)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </div>

          <div className="flex justify-between items-center mb-2">
            <label className="pr-2">Type</label>
            <Select
              value={wave.type}
              onChange={(e) =>
                handleWaveChange(wave.id, "type", e.target.value)
              }
              size="small"
              className="w-full"
            >
              <MenuItem value="sin">Sin</MenuItem>
              <MenuItem value="cos">Cos</MenuItem>
              <MenuItem value="tan">Tan</MenuItem>
            </Select>
          </div>

          <div className="flex justify-between items-center mb-2">
            <label className="pr-2">Frequency</label>
            <Slider
              size="small"
              value={wave.frequency}
              onChange={(e, value) =>
                handleWaveChange(wave.id, "frequency", value)
              }
              min={0.1}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </div>

          <div className="flex justify-between items-center mb-2">
            <label className="pr-2">Amplitude</label>
            <Slider
              size="small"
              value={wave.amplitude}
              onChange={(e, value) =>
                handleWaveChange(wave.id, "amplitude", value)
              }
              min={0.1}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <IconButton size="small" onClick={handleAddWave}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>

      <div className="flex justify-center mt-4">
        <Button variant="contained" onClick={handleSubmit}>
          Submit Waves
        </Button>
      </div>
    </div>
  );
};

export default WaveSection;

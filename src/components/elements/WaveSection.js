import React, { useState } from "react";
import { Slider, Select, MenuItem, IconButton, Alert } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

//TODO: there are lots of bugs here
const WaveSection = ({ waveArr = [], onSubmit }) => {
  const [waves, setWaves] = useState([...waveArr]);

  const [alertVisible, setAlertVisible] = React.useState(false);

  const handleAddWave = () => {
    if (waveArr.length >= 4) {
      setAlertVisible(true); // Show alert if trying to add more than 4 waves
      return;
    }
    setAlertVisible(false);

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
    setAlertVisible(false);
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
              <RemoveRoundedIcon />
            </IconButton>
          </div>

          <div className="flex justify-between items-center">
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

          <div className="flex justify-between items-center">
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

          <div className="flex justify-between items-center">
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
        <Alert severity="error" onClose={() => setAlertVisible(false)} className="mb-2">
          Maximum of 4 waves allowed!
        </Alert>
      )}

    </div>
  );
};

export default WaveSection;

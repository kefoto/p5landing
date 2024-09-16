import {
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import IOSSlider from "./inputs/IOSSlider";

import React, { useState, useRef, useEffect } from "react";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import gsap from "gsap";
import CollapseWrapper from "../wrapper/CollapseWrapper";
import WaveToggleButtonGroup from "./inputs/WaveToggleButtonGroup";
// TODO: transition margin fix
const Wave = ({ wave, index, onRemove, onWaveChange, onToggleChange }) => {
  const iconRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  useEffect(() => {
    gsap.to(iconRef.current, {
      rotation: isVisible ? 180 : 90,
      duration: 0.4,
      ease: "elastic.out",
    });
  }, [isVisible]);

  return (
    <div className="w-full">
      <div id="gutter" className="relative flex w-full pt-1.5"></div>
      <div className="flex justify-between items-center h-full w-full pb-1.5">
        <div className="space-x-4 flex items-center">
          {/* <IconButton size="small" onClick={toggleVisibility} ref={iconRef}>
            <ExpandLessOutlinedIcon />
          </IconButton> */}
          <Chip
            label={wave.type}
            icon={
              <ExpandLessOutlinedIcon
                onClick={toggleVisibility}
                ref={iconRef}
              />
            }
            size="small"
            variant="outlined"
            style={{ width: "3.5rem", justifyContent: "space-between" }}
          />

          <div className="flex space-x-2">
            <div
              className={`flex h-3 w-3 my-auto border rounded-full border-gray-400 ${
                wave.x ? "bg-gray-400" : ""
              } transition-colors duration-150`}
            ></div>
            <div
              className={`flex h-3 w-3 my-auto border rounded-full border-gray-400 ${
                wave.y ? "bg-gray-400" : ""
              } transition-colors duration-150`}
            ></div>
            <div
              className={`flex h-3 w-3 my-auto border rounded-full border-gray-400 ${
                wave.w ? "bg-gray-400" : ""
              } transition-colors duration-150`}
            ></div>
            <div
              className={`flex h-3 w-3 my-auto border rounded-full border-gray-400 ${
                wave.h ? "bg-gray-400" : ""
              } transition-colors duration-150`}
            ></div>
          </div>
        </div>
        <div className="space-x-2 flex">
          <IconButton
            size="small"
            onClick={() => onRemove(wave.id)}
            sx={{
              padding: "0.125rem",
            }}
          >
            <RemoveRoundedIcon />
          </IconButton>
        </div>
      </div>
      <CollapseWrapper isVisible={isVisible}>
        <div className="pt-1.5">
          <div className="flex items-center w-full pl-2.5 justify-between">
            <div className="flex items-center justify-start">
              <WaveToggleButtonGroup
                value={wave.type}
                onChange={(newType) => onWaveChange(wave.id, "type", newType)}
              />
            </div>
            <div className="flex items-center pr-2.5 justify-end">
              <ToggleButtonGroup
                value={[
                  ...(wave.x ? ["x"] : []),
                  ...(wave.y ? ["y"] : []),
                  ...(wave.w ? ["w"] : []),
                  ...(wave.h ? ["h"] : []),
                ]}
                onChange={(e, newToggles) =>
                  onToggleChange(wave.id, newToggles)
                }
                aria-label="wave toggles"
                size="small"
                sx={{ height: "1.75rem" }}
              >
                <ToggleButton
                  value="x"
                  size="small"
                  sx={{
                    borderRadius: "50%",
                    textTransform: "none",
                  }}
                >
                  x
                </ToggleButton>
                <ToggleButton
                  value="y"
                  size="small"
                  sx={{
                    borderRadius: "50%",
                    textTransform: "none",
                  }}
                >
                  y
                </ToggleButton>
                <ToggleButton
                  value="w"
                  size="small"
                  sx={{
                    borderRadius: "50%",
                    textTransform: "none",
                  }}
                >
                  w
                </ToggleButton>
                <ToggleButton
                  value="h"
                  size="small"
                  sx={{
                    borderRadius: "50%",
                    textTransform: "none",
                  }}
                >
                  h
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          <div className="flex justify-between items-center px-2.5 pt-1.5">
            <label className="flex-shrink-0 w-[30%] flex">Frequency</label>
            <div className="flex flex-grow w-[65%]">
              <IOSSlider
                size="small"
                value={wave.freq || 0.1}
                onChange={(e, value) => onWaveChange(wave.id, "freq", value)}
                min={0.1}
                max={10}
                step={0.1}
              />
            </div>
          </div>

          <div className="flex justify-between items-center px-2.5">
            <label className="flex-shrink-0 w-[30%] flex">Amplitude</label>
            <div className="flex flex-grow w-[65%]">
              <IOSSlider
                size="small"
                value={wave.amp || 0.1}
                onChange={(e, value) => onWaveChange(wave.id, "amp", value)}
                min={-10}
                max={10}
                step={0.1}
              />
            </div>
          </div>

          <div className="flex justify-between items-center px-2.5">
            <label className="flex-shrink-0 w-[30%] flex">Speed</label>
            <div className="flex flex-grow w-[65%]">
              <IOSSlider
                size="small"
                value={wave.speed || 0.1}
                onChange={(e, value) => onWaveChange(wave.id, "speed", value)}
                min={0.1}
                max={10}
                step={0.1}
              />
            </div>
          </div>
        </div>
      </CollapseWrapper>
    </div>
  );
};

export default Wave;

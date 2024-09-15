import React from "react";
// import { Box, Slider, Typography } from "@mui/material";
import IOSSlider from "./IOSSlider";

const SliderInput = ({ title, sliderProps, value, onChange }) => {
  return (
    <React.Fragment>
      {/* Optional gutter */}
      <div id="gutter" className="relative flex w-full pt-1.5"></div>
      <div className="relative h-full w-full items-center flex justify-between px-2.5">
        <label className="flex-shrink-0 w-[25%] flex items-center">
          {title}
        </label>
        <div className="flex-grow w-[75%] my-auto pr-1">
          <IOSSlider
            size="small"
            // valueLabelDisplay="auto"
            
            value={value}
            onChange={onChange}
            {...sliderProps}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SliderInput;

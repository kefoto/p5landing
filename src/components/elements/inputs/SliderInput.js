import React from "react";
// import { Box, Slider, Typography } from "@mui/material";
import IOSSlider from "./IOSSlider";

const SliderInput = ({ title, sliderProps = {}, value = 0, onChange = null }) => {
  // const sliderId = `slider-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="w-full">
      <div id="gutter" className="relative flex w-full pt-1.5"></div>
      <div className="relative w-full items-center flex justify-between px-2.5">
        <label className="flex-shrink-0 w-[25%] flex">
          {title}
        </label>
        <div className="flex flex-grow w-[75%] pr-1">
          <IOSSlider
            size="small"
            value={value}
            onChange={onChange}
            {...sliderProps}
          />
        </div>
      </div>
    </div>
  );
};

export default SliderInput;

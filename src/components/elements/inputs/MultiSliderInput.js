import React, { useCallback } from "react";
import IOSSlider from "./IOSSlider";

const MultiSliderInput = ({ title, sliderProps = [], formData = {}, onChange = null}) => {
  const handleSliderChange = useCallback((...args) => {
    if (onChange) {
      onChange(...args);
    }
  }, [onChange]);

  return (
    <div>
      <div id="gutter" className="relative flex w-full pt-1.5"></div>
      <div className="relative w-full flex justify-between px-2.5">
        <label className="flex-shrink-0 w-[25%] flex items-center">
          {title}
        </label>
        <div className="flex-grow w-[75%] flex space-x-4 pr-1">
          {sliderProps.map((prop) => (
            <IOSSlider
              size="small"
              key={prop.name}
              onChange={handleSliderChange}
              value={formData[prop.name] ?? prop.min}
              {...prop}
              sx={{ flex: 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSliderInput;

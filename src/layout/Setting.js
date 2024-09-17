import {Switch, IconButton} from "@mui/material";
import React, { useCallback } from "react";

// import throttle from "lodash/debounce";
import CollapsibleSection from "../components/elements/CollapsibleSection";
import WaveSection from "../components/elements/WaveSection";

import SliderInput from "../components/elements/inputs/SliderInput";

import MultiSliderInput from "../components/elements/inputs/MultiSliderInput";

import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import ImportSection from "../components/elements/ImportSection";
/**
 * fundamental updates after change,
 * but waves updates after submit,
         TODO: input file or text,
         mode switch to (edit) able to drag it and change position or (distort) view.

         edit value for fundamentals: scale, location, number of tiles,
          value for interactions: friction, ease, force, reducesize, size of collision, 

          add waves,

          wave values,

          modes
    TODO: the slider overflows for some reason
*/

const inputSectionMap = {
  Import: [
    {
      title: "Imports",
      type: "import",
    },
  ],
  Base: [
    {
      title: "Tiles",
      type: "dSlider",
      props: [
        {
          name: "tileX",
          min: 1,
          max: 100,
          step: 1,
        },
        { name: "tileY", min: 1, max: 100, step: 1 },
      ],
    },
    {
      title: "Scale",
      type: "dSlider",
      props: [
        {
          name: "scaleX",
          min: 0.1,
          max: 5,
          step: 0.1,
        },
        {
          name: "scaleY",
          min: 0.1,
          max: 5,
          step: 0.1,
        },
      ],
    },
    {
      title: "Offset",
      type: "dSlider",
      props: [
        {
          name: "offsetX",
          min: -1,
          max: 1,
          step: 0.1,
        },
        {
          name: "offsetY",
          min: -1,
          max: 1,
          step: 0.1,
        },
      ],
    },
  ],
  interactions: [
    {
      title: "Friction",
      type: "slider",
      props: {
        name: "friction",
        min: 0,
        max: 1,
        step: 0.02,
      },
    },
    {
      title: "Ease",
      type: "slider",
      props: {
        name: "ease",
        min: 0,
        max: 1,
        step: 0.02,
      },
    },
    {
      title: "Force",
      type: "slider",
      props: {
        name: "force",
        min: 0,
        max: 10,
        step: 0.5,
      },
    },
    {
      title: "Radius",
      type: "slider",
      props: {
        name: "radius",
        min: 0,
        max: 500,
        step: 5,
      },
    },
  ],
  waves: [
    {
      title: "Waves",
      type: "wave",
    },
  ],
};

const Setting = ({ formData, onFormDataChange }) => {

  // const throttledOnFormDataChange = useCallback(
  //   throttle((newData) => onFormDataChange(newData), 200), // Adjust the debounce delay as needed
  //   [onFormDataChange]
  // );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value
    });
  };

  const handleWaveSubmit = (waveArr) => {
    onFormDataChange({
      ...formData,
      waveArr,
    });
  };

  const handleImportSubmit = (importData) => {
    onFormDataChange({
      ...formData,
      importData,
    });
  };

  const renderInput = (input) => {
    switch (input.type) {
      case "dSlider":
        return (
          <MultiSliderInput
            key={input.title}
            title={input.title}
            sliderProps={input.props}
            formData={formData}
            onChange={handleInputChange}
          />
        );

      case "slider":
        return (
          <SliderInput
            key={input.title}
            title={input.title}
            value={formData[input.props.name] ?? input.props.min}
            onChange={(e, newValue) => handleInputChange(e, newValue)}
            sliderProps={input.props}
          />
        );
      case "wave":
        return (
          <WaveSection
            key={input.title}
            waveArr={formData.waveArr}
            onSubmit={handleWaveSubmit}
          />
        );
      case "import":
        return (
          <ImportSection
            key={input.title}
            imports={formData.importData}
            onSubmit={handleImportSubmit}
          />
        );
      default:
        return null;
    }
  };

  //TODO: add hide button,
  return (
    <div
      id="setting"
      className="fixed top-0 w-1/3 min-w-72 rounded-xl p-2.5 m-2.5 text-sm z-10 backdrop-blur bg-stone-200/50"
    >
      <div className="flex justify-between items-center content-center">
        <IconButton>
          <ExpandCircleDownRoundedIcon />
        </IconButton>

        <Switch label="Dark Mode" size="small" />
      </div>
      {Object.entries(inputSectionMap).map(([section, inputs]) => (
        <CollapsibleSection
          key={section}
          title={section.charAt(0).toUpperCase() + section.slice(1)}
        >
          {inputs.map((input) => renderInput(input))}
        </CollapsibleSection>
      ))}
    </div>
  );
};

export default Setting;

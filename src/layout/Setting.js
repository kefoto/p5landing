import { Switch, IconButton } from "@mui/material";
import React, { useState } from "react";

// import throttle from "lodash/debounce";
import CollapsibleSection from "../components/elements/CollapsibleSection";
import WaveSection from "../components/elements/WaveSection";

import SliderInput from "../components/elements/inputs/SliderInput";

import MultiSliderInput from "../components/elements/inputs/MultiSliderInput";

import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import ImportSection from "../components/elements/ImportSection";
import RefreshIcon from "@mui/icons-material/Refresh";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

import CollapseWrapper from "../components/wrapper/CollapseWrapper";
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
      // module: "reset",
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
          step: 0.01,
        },
        {
          name: "offsetY",
          min: -1,
          max: 1,
          step: 0.01,
        },
      ],
    },
  ],
  Interactions: [
    {
      title: "Friction",
      type: "slider",
      props: {
        name: "friction",
        min: 0.02,
        max: 0.98,
        step: 0.02,
      },
    },
    {
      title: "Ease",
      type: "slider",
      props: {
        name: "ease",
        min: 0.02,
        max: 0.98,
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
  Waves: [
    {
      title: "Waves",
      type: "wave",
      // module: "toggle",
    },
  ],
};

const inputButtonModuleMap = {
  Import: "",
  Base: "reset1",
  Interactions: "reset2",
  Waves: "toggle",
};

const Setting = ({ formData, onFormDataChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "tileX" || name === "tileY") {
      const newValue = Number(value);
      const otherValue = formData[name === "tileX" ? "tileY" : "tileX"];

      if (newValue + otherValue >= 151) {
        return; // Prevent the update if the limit is exceeded
      }
    }

    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  const handleWaveSubmit = (waveArr) => {
    onFormDataChange({
      ...formData,
      waveArr,
    });
  };

  const handleToggle = () => {
    // Toggle logic here, for example, switch between two states
    onFormDataChange({
      ...formData,
      waveDisplay: !formData.waveDisplay,
    });
  };

  const handleBaseReset = () => {
    onFormDataChange({
      ...formData,
      tileX: 20,
      tileY: 64,
      scaleX: 1,
      scaleY: 1,
      offsetX: 0,
      offsetY: 0,
    });
  };

  const handleInterReset = () => {
    onFormDataChange({
      ...formData,
      friction: 0.9,
      ease: 0.55,
      force: 1,
      radius: 120,
    });
  };

  const handleImportSubmit = (importData) => {
    onFormDataChange({
      ...formData,
      importData,
    });
  };

  const handleImportChange = (newBoolean) => {
    onFormDataChange({
      ...formData,
      isImage: newBoolean,
    });
  };

  const renderButton = (type) => {
    switch (type) {
      case "reset1":
        return (
          <IconButton
            size="small"
            onClick={handleBaseReset}
            sx={{
              borderRadius: "50%",
              padding: "0.125rem",
            }}
          >
            <RefreshIcon
              sx={{
                padding: "0.125rem",
              }}
            />
          </IconButton>
        );

      case "reset2":
        return (
          <IconButton
            size="small"
            onClick={handleInterReset}
            sx={{
              borderRadius: "50%",
              padding: "0.125rem",
            }}
          >
            <RefreshIcon
              sx={{
                padding: "0.125rem",
              }}
            />
          </IconButton>
        );

      case "toggle":
        return (
          <Switch
            size="small"
            // checked={importData.isImage}
            onChange={handleToggle}
          />
        );
      default:
        return null;
    }
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
            // onSubmit={handleWaveSubmit}
            onChange={handleWaveSubmit}
          />
        );
      case "import":
        return (
          <ImportSection
            key={input.title}
            imports={formData.importData}
            onSubmit={handleImportSubmit}
            onImageToggle={handleImportChange}
            isImage={formData.isImage}
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
      className={`fixed top-0 w-1/3 min-w-72 
      ${
        isVisible ? "left-0" : "-left-[calc(90vw/3)]"
      } 
      ${
        isVisible ? "rounded-[1.5rem]" : "rounded-[1.5rem]"
      } p-2.5 m-2.5
               select-none text-sm z-10 backdrop-blur bg-stone-200/50 transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center content-center">
        <Switch label="Dark Mode" size="small" />
        <IconButton onClick={toggleVisibility}>
          <ExpandCircleDownRoundedIcon />
        </IconButton>
      </div>
      <CollapseWrapper isVisible={isVisible}>{
        Object.entries(inputSectionMap).map(([section, inputs]) => (
        <CollapsibleSection
          key={section}
          title={section.charAt(0).toUpperCase() + section.slice(1)}
          button_module={renderButton(inputButtonModuleMap[section])}
        >
          {inputs.map((input) => renderInput(input))}
        </CollapsibleSection>
        ))}
      </CollapseWrapper>
    </div>
  );
};

export default Setting;

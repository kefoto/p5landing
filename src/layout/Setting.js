import { Slider } from "@mui/material";
import React from "react";
import CollapsibleSection from "../components/elements/CollapsibleSection";
import WaveSection from "../components/elements/WaveSection";
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

*/

const inputSectionMap = {
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
  ],
  interactions: [
    {
      title: "Friction",
      type: "slider",
      props: {
        name: "friction",
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      title: "Ease",
      type: "slider",
      props: {
        name: "ease",
        min: 0,
        max: 1,
        step: 0.01,
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
      // passdown an array of variables
      props: {
        name: "waveArr",
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  ],
};

const Setting = ({ formData, onFormDataChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  const handleWaveSubmit = (waveArr) => {
    onFormDataChange({
      ...formData,
      waveArr,  // Update the wave array in the formData after submit
    });
  };

  const renderInput = (input) => {
    switch (input.type) {
      case "dInput":
        return (
          <div key={input.title} className="mb-2">
            <label>{input.title}</label>
            <input
              {...input.props}
              value={formData[input.props.name] || ""}
              onChange={handleInputChange}
              className="border p-1 rounded w-full"
            />
          </div>
        );
      case "dSlider":
        return (
          <>
            <div id="gutter" className="relative w-full flex pt-1.5"></div>
            <div
              key={input.title}
              className="relative w-full flex justify-between text-left px-2.5"
            >
              <label className="pr-8">{input.title}</label>
              {/* <div className="justify-between "> */}
                {input.props.map((prop) => (
                  <Slider
                    key={prop.name}
                    size="small"
                    valueLabelDisplay="auto"
                    onChange={handleInputChange}
                    value={formData[prop.name] ?? prop.min}
                    {...prop}
                  />
                ))}
              {/* </div> */}
            </div>
          </>
        );

      case "slider":
        return (
          <>
            <div id="gutter" className="relative w-full flex pt-1.5"></div>
            <div
              key={input.title}
              className="relative w-full flex justify-between text-left px-2.5"
            >
              <label className="pr-8">{input.title}</label>
              <Slider
                size="small"
                valueLabelDisplay="auto"
                onChange={handleInputChange}
                value={formData[input.props.name] ?? input.props.min}
                {...input.props}
              />
            </div>
          </>
        );

      case "wave":
        return (
          <WaveSection waveArr={formData.waveArr} onSubmit={handleWaveSubmit}/>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="setting"
      className="fixed top-0 w-1/3 min-w-72 rounded-xl p-2.5 m-2.5 bg-red-100 text-sm"
    >


      {/* provide input, text, or image, function modes */}
      {Object.entries(inputSectionMap).map(([section, inputs]) => (
        <div className="grid overflow-auto mb-2.5 last:mb-0">
          <CollapsibleSection
            key={section}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          >
            {inputs.map((input) => renderInput(input))}
          </CollapsibleSection>
        </div>
      ))}
    </div>
  );
};

export default Setting;

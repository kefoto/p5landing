import { IconButton, Slider } from "@mui/material";
import React, {useState} from "react";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import CollapsibleSection from "../components/elements/CollapsibleSection";
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
  waves: [],
};

const Setting = ({ formData, onFormDataChange }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
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
          <div
            key={input.title}
            className="relative w-full flex justify-between text-left mb-2 px-2.5"
          >
            <label className="pr-8">{input.title}</label>
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
          </div>
        );

      case "slider":
        return (
          <div
            key={input.title}
            className="relative w-full flex justify-between text-left mb-2 px-2.5"
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
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="setting"
      className="fixed w-1/3 min-w-96 rounded-xl p-2.5 m-2.5 bg-red-100"
    >
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

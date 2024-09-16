import React from "react";
import IOSSlider from "./IOSSlider";

const DoubleSliderInput = ({ title, props, formData, handleInputChange }) => {
  return (
    <React.Fragment>
      <div id="gutter" className="relative flex w-full pt-1.5"></div>
      <div className="relative w-full flex justify-between px-2.5">
        <label className=" flex-shrink-0 w-[25%] flex items-center">
          {title}
        </label>
        <div className="flex-grow w-[70%]">
          {props.map((prop) => (
            <IOSSlider
            key={prop.name}
            size="small"
            onChange={handleInputChange}
            value={formData[prop.name] ?? prop.min}
            {...prop}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};



//     return (
//       <React.Fragment>
//         <div id="gutter" className="relative w-full flex pt-1.5"></div>
//         <div className="relative w-full flex justify-between text-left px-2.5">
//           <label className="pr-8">{title}</label>
//           {props.map((prop) => (
//             <Slider
//               key={prop.name}
//               size="small"
//               onChange={handleInputChange}
//               value={formData[prop.name] ?? prop.min}
//               {...prop}
//             />
//           ))}
//         </div>
//       </React.Fragment>
//     );
//   };

export default DoubleSliderInput;

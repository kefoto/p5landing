import React, { useState, useCallback } from "react";
import Setting from "./Setting";
import About from "./About";
import P5Canvas from "../components/elements/P5Canvas";
// import P5Canvas from "../components/elements/P5Canvas";

//TODO: reset button,
//TODO: wave switch on and off button,
//TODO: entire setting on and off button,
//TODO: mouse listener that bound to only the canvas but not the whole screen

const Dashboard = () => {
  const [formData, setFormData] = useState({
    tileX: 20,
    tileY: 64,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
    friction: 0.9,
    ease: 0.55,
    force: 1,
    radius: 120,
    waveDisplay: false,
    waveArr: [],
    importData: { text: "Hello", image: "../../1.JPG", isImage: false },
  });

  // const throttledSetFormData = useCallback(
  //   throttle((newData) => {
  //     setFormData((prevData) => ({ ...prevData, ...newData }));
  //   }, 400),
  //   []
  // );
  // Function to handle form data change
  const handleFormDataChange = (newData) => {
    // throttledSetFormData(newData);
    setFormData(newData);
    console.log(newData);
  };

  return (
    <div className="relative flex mx-auto w-full max-w-screen p-2.5 ">
      <About />
      <Setting formData={formData} onFormDataChange={handleFormDataChange} />
      {/* <Render/> */}
      <P5Canvas data={formData} />
    </div>
  );
};

export default Dashboard;

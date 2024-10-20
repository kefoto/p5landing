import React, { useState } from "react";
import Setting from "./Setting";
import About from "./About";
import P5Canvas from "../components/elements/P5Canvas";
// import ToggleInteractive from "./ToggleInteractive";
// import P5Canvas from "../components/elements/P5Canvas";
import useWindowSize from "../components/hook/useWindowSize";
//TODO: entire setting on and off button,
//TODO: mouse listener that bound to only the canvas but not the whole screen

const Dashboard = () => {
  // const [formVisible, setFormVisible] = useState(true);

  // const toggleVisibility = () => setFormVisible((prev) => !prev);

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
    importData: { text: "Hello.", image: null, url: null,},
    isImage: false,
    isClickable: false,
  });

  const screenSize = useWindowSize();


  // Function to handle form data change
  const handleFormDataChange = (newData) => {
    setFormData(newData);
    // console.log(newData);
  };

  return (
      <div className="relative flex mx-auto w-full max-w-screen overflow-hidden overflow-y-hidden">
        <About />

        {/* TODO: conditional */}
        <Setting formData={formData} onFormDataChange={handleFormDataChange} />
        {/* <Render/> */}
        <P5Canvas data={formData} screenSize={screenSize} />
      </div>
  );
};

export default Dashboard;

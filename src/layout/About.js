import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt } from '@fortawesome/free-solid-svg-icons';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

const About = () => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div
      id="setting"
      className={`fixed bottom-0 right-0 p-2.5 m-2.5
             font-mono text-sm z-10 backdrop-blur-lg bg-stone-200/50
             overflow-hidden
             transition-[width,border-radius] duration-300 ease-in-out
             ${isVisible ? "w-80 rounded-[1.25rem]" : "w-12 rounded-[1.5rem]"}`}
    >
      <div id="title" className="flex items-center justify-between">
        <IconButton
          size="small"
          onClick={toggleVisibility}
          sx={{
            flexShrink: 0,
            padding: "0.125rem",
            transform: isVisible ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <ExpandLessOutlinedIcon />
        </IconButton>

        <div
          className={`flex-1 min-w-0 flex items-center overflow-hidden transition-[max-width,opacity] duration-300 ease-in-out ${
            isVisible ? "max-w-[30rem] opacity-100" : "max-w-0 opacity-0 pointer-events-none"
          }`}
        >
          {/* <p className="pl-2 whitespace-nowrap">About</p> */}
          <div className="flex justify-end space-x-2 ml-2">
            <IconButton size="small" href="https://github.com/kefoto" rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon icon={faGithub} />
            </IconButton>

            <IconButton size="small" href="https://www.linkedin.com/in/kefoto/" rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} />
            </IconButton>

            <IconButton size="small" href="mailto: xuker0607@gmail.com">
              <FontAwesomeIcon icon={faAt} />
            </IconButton>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isVisible ? "max-h-[10rem]" : "max-h-0"
        }`}
      >
        <div id="gutter" className="relative flex w-full pt-2"></div>
          <p className="px-4 flex text-center text-pretty">A silly little Kinetic Typography website by Ke Xu</p>
          <p className="px-4 flex text-center text-pretty">PLease contact me for bugs and suggestions!!</p>
      </div>
    </div>
  );
};

export default About;

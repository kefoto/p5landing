import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt } from '@fortawesome/free-solid-svg-icons';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import CollapseWrapper from "../components/wrapper/CollapseWrapper";

const About = () => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div
      id="setting"
      className={`fixed bottom-0 w-1/3 min-w-64 
    ${isVisible ? "right-0" : "-right-[calc(70vw/4)]"} 
    ${isVisible ? "rounded-[1.25rem]" : "rounded-[1.5rem]"} p-2.5 m-2.5
             text-sm z-10 backdrop-blur-lg bg-stone-200/50 transition-all duration-300 ease-in-out`}
    >
      <div id="title" className="flex items-center justify-between">
        <div className="flex justify-end space-x-2 items-center">
          <IconButton
            size="small"
            onClick={toggleVisibility}
            sx={{
              padding: "0.125rem",
            }}
          >
            <ExpandLessOutlinedIcon />
          </IconButton>
          <p className="pl-2">About</p>
        </div>

        <div className="flex justify-end space-x-2">
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

      <CollapseWrapper isVisible={isVisible}>
        <div id="gutter" className="relative flex w-full pt-2"></div>
          <p className="px-4 flex text-center text-pretty">A silly little Kinetic Typography website by Ke Xu</p>
          <p className="px-4 flex text-center text-pretty">PLease contact me for bugs and suggestions!!</p>
      </CollapseWrapper>
    </div>
  );
};

export default About;

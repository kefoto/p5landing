import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import gsap from "gsap";
import CollapseWrapper from "../wrapper/CollapseWrapper";


const CollapsibleSection = ({ title, children }) => {
  const iconRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  //Button animation
  useEffect(() => {
    gsap.to(iconRef.current, {
      rotation: isVisible ? 180 : 90,
      duration: 0.4,
      ease: "elastic.out",
    });
  }, [isVisible]);

  return (
    <>
      <div className="flex items-center content-center justify-between">
        <p className="font-bold flex-start">{title}</p>
        <IconButton size="small" onClick={toggleVisibility} ref={iconRef}>
          <ExpandLessOutlinedIcon />
        </IconButton>
      </div>
      <CollapseWrapper isVisible={isVisible}>{children}</CollapseWrapper>
    </>
  );
};

export default CollapsibleSection;

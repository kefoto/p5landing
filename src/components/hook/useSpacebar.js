import { useState, useEffect } from "react";

const useSpacebar = () => {
  const [Spacebar, setSpacebar] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        setSpacebar((prev) => !prev); // Toggle pause state
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return Spacebar;
};


export default useSpacebar;
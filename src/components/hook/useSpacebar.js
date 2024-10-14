import { useState, useEffect, useCallback } from "react";

const useSpacebar = (p5InstanceRef) => {
  const [spacebar, setSpacebar] = useState(false);

  
  const handleKeyDown = useCallback((e) => {
    const p = p5InstanceRef.current

    if (!p) {
      console.log("p5 instance is not yet initialized");
      return;
    }
    
    if (e.keyCode === 32) { // 32 is the keycode for spacebar
      e.preventDefault();  // Prevent the default spacebar action

      
      if (p) {
        if (!spacebar) {
          p.noLoop();  // Stop p5 loop
        } else {
          p.loop();    // Resume p5 loop
        }
      }

      setSpacebar((prev) => !prev);

       // Toggle spacebar state
    }
  }, [spacebar, p5InstanceRef]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Cleanup on unmount
    };
  }, [handleKeyDown]);

  return spacebar;
};


export default useSpacebar;
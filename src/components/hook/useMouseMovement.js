import { useState, useEffect, useRef, useCallback } from "react";

const useMouseMovement = (elementRef) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ dx: 0, dy: 0 });
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const prevMousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      if (!elementRef?.current) return;
      const { clientX, clientY } = e;
      const rect = elementRef.current.getBoundingClientRect();

      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      setMousePos({ x: mouseX, y: mouseY });
      setDelta({
        dx: mouseX - prevMousePos.current.x,
        dy: mouseY - prevMousePos.current.y,
      });

      // Update previous mouse position
      prevMousePos.current = { x: mouseX, y: mouseY };
    },
    [elementRef]
  );

  const handleResize = useCallback(() => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (!elementRef?.current) return;
    const element = elementRef.current;

    element.addEventListener("mousemove", handleMouseMove);
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [elementRef, handleMouseMove]);

  // Resize listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    console.log("Mouse Position:", mousePos, "Delta:", delta, "Screen Size:", screenSize);
  }, [mousePos, delta, screenSize]);

  return { mousePos, delta, screenSize };
};

export default useMouseMovement;

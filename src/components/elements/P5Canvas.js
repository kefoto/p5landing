import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

//TODO: should I create my own mouse hooK?
const P5Canvas = ({ sketch }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const p5Instance = new p5(sketch, canvasRef.current);

    return () => {
      p5Instance.remove(); // Cleanup the sketch on component unmount
    };
  }, [sketch]);

  return <div ref={canvasRef}></div>;
};

export default P5Canvas;

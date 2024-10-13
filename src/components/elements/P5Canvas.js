import React, { useRef, useEffect, useState, useCallback } from "react";
import p5 from "p5";
import { Tile } from "../../utils/Tile";
//TODO: should I create my own mouse hooK?
//TODO: really laggy

//TODO: reload in sections of the data with matching things
const P5Canvas = ({ data, screenSize}) => {
  const canvasRef = useRef(null);

  const p5InstanceRef = useRef(null);
  const mousedragRef = useRef(mousedragFunc);
  // const tilesRef = useRef([]);
  // const pgRef = useRef(null);
  // const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });

  // //TODO: try not to rerender all of the base data:
  // //TODO: try to update the canvas based on the screen
  // //TODO: try to set up the image properly
  // // if the display switch for the element is off, this does not update

  useEffect(() => {
    const {
      tileX: tilesX,
      tileY: tilesY,
      scaleX,
      scaleY,
      offsetX,
      offsetY,
      radius: collisionRadius,
      friction,
      ease,
      importData: { isImage, text, url},
      waveArr: waveArrays,
      waveDisplay,
      force,
    } = data;

    let tiles = [];

    const mousedrag = (p) => {
      let pg;
      // let canvasSize;
      let prevMouseX, prevMouseY;

      if (isImage) {
        p.preload = () => {
          p.img = p.loadImage("./1.JPG");
        };
      }

      const computeWave = (waveArrays, dis, frameCount) => {
        if (!waveArrays) return [0, 0, 0, 0];

        return waveArrays.reduce(
          (acc, wave) => {
            const waveFunc = getWaveFunction(wave.type);
            const result = p.int(
              waveFunc(frameCount * wave.speed + dis * wave.freq) * wave.amp
            );

            if (wave.x) acc[0] = result;
            if (wave.y) acc[1] = result;
            if (wave.w) acc[2] = result;
            if (wave.h) acc[3] = result;

            return acc;
          },
          [0, 0, 0, 0]
        );
      };

      const getWaveFunction = (type) => {
        switch (type) {
          case "sin":
            return (value) => p.sin(value); // Ensure p is used as the context
          case "cos":
            return (value) => p.cos(value);
          case "tan":
            return (value) => p.tan(value);
          default:
            return () => 0;
        }
      };

      p.setup = () => {
        // canvasSize = p.min(screenSize.width, screenSize.height);
        p.createCanvas(screenSize.width, screenSize.height);

        pg = p.createGraphics(screenSize.width, screenSize.height);

        pg.background(255);
        pg.fill(0);
        pg.textSize(p.min(screenSize.width, screenSize.height) / 4);
        pg.push();
        pg.translate(p.width / 2, p.height / 2);
        pg.textAlign(p.CENTER, p.CENTER);
        pg.scale(scaleX, scaleY);

        if (isImage) {
          pg.image(p.img, offsetX * p.windowWidth, offsetY * p.windowHeight);
        } else {
          pg.text(
            text,
            (offsetX * p.windowWidth) / 2,
            (offsetY * p.windowHeight) / 2
          );
        }
        // pg.translate(p.width / 2, p.height / 2);
        // pg.push();

        // p.frameRate(30);

        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;

        // let targetX = p.width / 2;
        // let targetY = p.height / 2;

        let tileW = p.int(p.width / tilesX);
        let tileH = p.int(p.height / tilesY);

        for (let i = 0; i < tilesX * tilesY; i++) {
          const x = i % tilesX;
          const y = Math.floor(i / tilesX);
          const tile = new Tile(x, y, tileW, tileH, force);
          tiles.push(tile);
        }
      };
      p.draw = () => {
        p.background(255);

        let moveX = p.mouseX - prevMouseX;
        let moveY = p.mouseY - prevMouseY;

        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;

        tiles.forEach((tile) => {
          tile.update(p.mouseX, p.mouseY, collisionRadius, friction, ease);
          tile.update2(
            moveX,
            moveY,
            p.mouseX,
            p.mouseY,
            collisionRadius,
            friction,
            ease
          );

          let dis = p.dist(p.width / 2, p.height / 2, tile.dx, tile.dy);

          if (waveArrays && waveDisplay) {
            const resultArray = computeWave(waveArrays, dis, p.frameCount);
            tile.wave(resultArray);
          }

          p.copy(
            pg,
            tile.sx,
            tile.sy,
            tile.sw,
            tile.sh,
            tile.dx,
            tile.dy,
            tile.dw,
            tile.dh
          );
        });
      };

      // p.mousePressed = () => {
      //   tiles.forEach((tile) => {
      //     tile.warp(p.width, p.height);
      //     // tile.moveTo(p.mouseX, p.mouseY, 1);
      //     tile.changeOrigin(p.mouseX, p.mouseY);
      //   });
      // };

      // p.mouseReleased = () => {
      //   tiles.forEach((tile) => {
      //     // tile.moveTo(p.mouseX, p.mouseY, 0.10);
      //     tile.resetOrigin();
      //   });
      // };
    };

    const p5Instance = new p5(mousedrag, canvasRef.current);

    return () => {
      p5Instance.remove();
    };
  }, [data, screenSize]);

  return <div ref={canvasRef} className="p-0 m-0 -z-10 w-full max-h-full"></div>;
};

export default P5Canvas;

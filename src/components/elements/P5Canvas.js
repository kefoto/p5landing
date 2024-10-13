import React, { useRef, useEffect, useState, useCallback } from "react";
import p5 from "p5";
import { Tile } from "../../utils/Tile";

const P5Canvas = ({ data }) => {
  const canvasRef = useRef(null);

  const p5InstanceRef = useRef(null);
  const tilesRef = useRef([]);
  const pgRef = useRef(null);
  // const prevMouseRef = useRef({ x: 0, y: 0 });

  // Refs for data that may change
  const dataRef = useRef(data);

  // TODO:Scale io not working
  // //TODO: try not to rerender all of the base data:
  // //TODO: try to update the canvas based on the screen
  // //TODO: try to set up the image properly
  //TODO: pg. size is not working
  // // if the display switch for the element is off, this does not update

  useEffect(() => {
    dataRef.current = data;
    console.log(dataRef.current);
    // screenSizeRef.current = screenSize;
    // updateTiles();
  }, [data]);

  useEffect(() => {
    const mousedrag = (p) => {
      let pg;
      let prevMouseX, prevMouseY;

      const text = dataRef.current.importData.text
      const url = dataRef.current.importData.url
          ? dataRef.current.importData.url
          : "./1.JPG";
      if (dataRef.current.isImage) {
        p.preload = () => {
          p.img = p.loadImage(
            url,
            () => {
              console.log("Image loaded");
              drawOnPG(pgRef.current);
            },
            (err) => {
              console.error("Failed to load image", err);
            }
          );
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
            return (value) => p.sin(value);
          case "cos":
            return (value) => p.cos(value);
          case "tan":
            return (value) => p.tan(value);
          default:
            return () => 0;
        }
      };

      const drawOnPG = (pg) => {
        if (p.windowWidth && p.windowHeight) {
          pg.clear(); // Clear the previous drawings

          pg.background(255);
          pg.fill(0);
          pg.textSize(p.min(p.windowWidth, p.windowHeight) / 4);
          pg.translate(p.windowWidth / 2, p.windowHeight / 2);
          pg.textAlign(p.CENTER, p.CENTER);
          pg.push();
          pg.scale(dataRef.current.scaleX, dataRef.current.scaleY);

          if (dataRef.current.isImage) {
            // Fallback to canvas size if image dimensions are not available
            // p.imageMode(p.CENTER)

            if (!p.img || !p.img.width) {
              pg.text("Loading...", 0, 0); // Fallback message
            } else {
              const imgWidth = p.img.width;
              const imgHeight = p.img.height;
              pg.image(
                p.img,
                -imgWidth / 2,
                -imgHeight / 2,
                imgWidth,
                imgHeight
              );
            }

            // pg.image(p.img, 0, 0);
            // console.log(p.img);
          } else {
            pg.text(text, 0, 0);
          }

          pg.pop();
        }
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        pg = p.createGraphics(p.windowWidth, p.windowHeight);
        pgRef.current = pg;

        drawOnPG(pg);

        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;

        tilesRef.current = [];

        let tileW = p.int(p.windowWidth / dataRef.current.tileX);
        let tileH = p.int(p.windowHeight / dataRef.current.tileY);

        for (
          let i = 0;
          i < dataRef.current.tileX * dataRef.current.tileY;
          i++
        ) {
          const x = i % dataRef.current.tileX;
          const y = Math.floor(i / dataRef.current.tileX);
          const tile = new Tile(x, y, tileW, tileH);
          tilesRef.current.push(tile);
        }
      };

      p.draw = () => {
        p.background(255);

        // if (pgRef.current) {
        //   drawOnPG(pgRef.current);
        // }

        let moveX = p.mouseX - prevMouseX;
        let moveY = p.mouseY - prevMouseY;

        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;

        tilesRef.current.forEach((tile) => {
          let dis = p.dist(p.width / 2, p.height / 2, tile.dx, tile.dy);

          if (dataRef.current.waveArr && dataRef.current.waveDisplay) {
            const resultArray = computeWave(
              dataRef.current.waveArr,
              dis,
              p.frameCount
            );
            tile.wave(resultArray);
          } else {
            tile.updateSize();
            // tile.reset();
          }

          tile.update(
            p.mouseX,
            p.mouseY,
            dataRef.current.radius,
            dataRef.current.friction,
            dataRef.current.ease,
            dataRef.current.force
          );

          tile.update2(
            moveX,
            moveY,
            p.mouseX,
            p.mouseY,
            dataRef.current.radius,
            dataRef.current.friction,
            dataRef.current.ease
          );

          p.copy(
            pgRef.current,
            tile.sx + (dataRef.current.offsetX * p.windowWidth) / 2,
            tile.sy + (dataRef.current.offsetY * p.windowHeight) / 2,
            tile.sw,
            tile.sh,
            tile.dx,
            tile.dy,
            tile.dw,
            tile.dh
          );
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);

        // pg.resizeCanvas(p.windowWidth, p.windowHeight);
        let pg = p.createGraphics(p.windowWidth, p.windowHeight);
        pgRef.current = pg;
        // console.log(pg)
        drawOnPG(pg);

        tilesRef.current = [];

        let tileW = p.int(p.windowWidth / dataRef.current.tileX);
        let tileH = p.int(p.windowHeight / dataRef.current.tileY);

        for (
          let i = 0;
          i < dataRef.current.tileX * dataRef.current.tileY;
          i++
        ) {
          const x = i % dataRef.current.tileX;
          const y = Math.floor(i / dataRef.current.tileX);
          const tile = new Tile(x, y, tileW, tileH);
          tilesRef.current.push(tile);
        }
        // pg.translate(p.windowWidth / 2, p.windowHeight / 2);
        // p.reset();
      };

      const isClickable = dataRef.current.isClickable;
      if (isClickable) {
        p.mousePressed = () => {
          tilesRef.current.forEach((tile) => {
            tile.warp(p.width, p.height);
            // tile.moveTo(p.mouseX, p.mouseY, 1);
            tile.changeOrigin(p.mouseX, p.mouseY);
          });
        };

        p.mouseReleased = () => {
          tilesRef.current.forEach((tile) => {
            // tile.moveTo(p.mouseX, p.mouseY, 0.10);
            tile.resetOrigin();
          });
        };
      } else {
        p.mousePressed = () => {};

        p.mouseReleased = () => {};
      }
    };

    p5InstanceRef.current = new p5(mousedrag, canvasRef.current);

    return () => {
      p5InstanceRef.current.remove();
    };
  }, [
    dataRef.current.importData.text,
    dataRef.current.importData.url,
    dataRef.current.isImage,
  ]);

  //TODO: issue, I have to click twice for submit, it just did not rerender right
  useEffect(() => {
    if (p5InstanceRef.current) {
      const p = p5InstanceRef.current;
      // const pg = pgRef.current;

      let pg = p.createGraphics(p.windowWidth, p.windowHeight);
      pgRef.current = pg;
      // console.log(pg)
      pg.clear(); // Clear the previous drawings

      pg.background(255);
      pg.fill(0);
      pg.textSize(p.min(p.windowWidth, p.windowHeight) / 4);
      pg.translate(p.windowWidth / 2, p.windowHeight / 2);
      pg.textAlign(p.CENTER, p.CENTER);
      pg.push();
      pg.scale(dataRef.current.scaleX, dataRef.current.scaleY);

      if (dataRef.current.isImage) {
        // Fallback to canvas size if image dimensions are not available
        // p.imageMode(p.CENTER)

        if (!p.img || !p.img.width) {
          pg.text("Loading...", 0, 0); // Fallback message
        } else {
          const imgWidth = p.img.width;
          const imgHeight = p.img.height;
          pg.image(p.img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
        }

        // pg.image(p.img, 0, 0);
        // console.log(p.img);
      } else {
        pg.text(dataRef.current.importData.text, 0, 0);
      }

      pg.pop();
    }
  }, [dataRef.current.scaleX, dataRef.current.scaleY]);

  useEffect(() => {
    if (p5InstanceRef.current) {
      const p = p5InstanceRef.current;
      tilesRef.current = [];

      let tileW = p.int(p.width / dataRef.current.tileX);
      let tileH = p.int(p.height / dataRef.current.tileY);

      for (let i = 0; i < dataRef.current.tileX * dataRef.current.tileY; i++) {
        const x = i % dataRef.current.tileX;
        const y = Math.floor(i / dataRef.current.tileX);
        const tile = new Tile(x, y, tileW, tileH);
        tilesRef.current.push(tile);
      }
    }
  }, [dataRef.current.tileX, dataRef.current.tileY]);

  useEffect(() => {
    if (pgRef.current) {
      const pg = pgRef.current;
      pg.scale(dataRef.current.scaleX, dataRef.current.scaleY);
    }
  }, [dataRef.current.scaleX, dataRef.current.scaleY]);

  //TODO: this is pretty buggy
  useEffect(() => {
    if (p5InstanceRef.current) {
      const p = p5InstanceRef.current;
      const isClickable = dataRef.current.isClickable;
      if (isClickable) {
        p.mousePressed = () => {
          tilesRef.current.forEach((tile) => {
            tile.warp(p.width, p.height);
            // tile.moveTo(p.mouseX, p.mouseY, 1);
            tile.changeOrigin(p.mouseX, p.mouseY);
          });
        };

        p.mouseReleased = () => {
          tilesRef.current.forEach((tile) => {
            // tile.moveTo(p.mouseX, p.mouseY, 0.10);
            tile.resetOrigin();
          });
        };
      } else {
        p.mousePressed = () => {};
        p.mouseReleased = () => {};
      }
      // p5InstanceRef.current = p
    }

  }, [dataRef.current.isClickable]);

  return <div ref={canvasRef} className="-z-10 w-full max-h-full"></div>;
};

export default P5Canvas;

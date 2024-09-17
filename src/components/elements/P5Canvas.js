import React, { useRef, useEffect } from "react";
import p5 from "p5";
import { Tile } from "../../utils/Tile";
//TODO: should I create my own mouse hooK?
//TODO: really laggy
const P5Canvas = ({ data }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const {
      tileX: tilesX,
      tileY: tilesY,
      scaleX: scaleX,
      scaleY: scaleY,
      offsetX: offsetX,
      offsetY: offsetY,
      radius: collisionRadius,
      friction,
      ease,
      importData: display,
      waveArr: waveArrays,
      force,
    } = data;

    const isImage = data.importData instanceof File && data.importData;
    let tiles = [];

    const mousedrag = (p) => {
      let pg;
      let canvasSize;
      let prevMouseX, prevMouseY;

      if (isImage) {
        p.preload = () => {
          p.img = p.loadImage("./1.JPG");
        };
      }
      const computeWave = (waveArrays, dis, frameCount) => {
        if (!waveArrays) return [0, 0, 0, 0];

        return waveArrays.reduce((acc, wave) => {
          const waveFunc = getWaveFunction(wave.type);
          const result = p.int(waveFunc(frameCount * wave.speed + dis * wave.freq) * wave.amp);

          if (wave.x) acc[0] = result;
          if (wave.y) acc[1] = result;
          if (wave.w) acc[2] = result;
          if (wave.h) acc[3] = result;

          return acc;
        }, [0, 0, 0, 0]);
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
        canvasSize = p.min(p.windowWidth, p.windowHeight);

        p.createCanvas(p.windowWidth, p.windowHeight);

        pg = p.createGraphics(p.windowWidth, p.windowHeight);

        pg.background(255);
        pg.fill(0);
        pg.textSize(canvasSize / 4);
        pg.push();
        pg.translate(p.width / 2, p.height / 2);
        pg.textAlign(p.CENTER, p.CENTER);
        pg.scale(scaleX, scaleY);

        if (isImage) {
          pg.image(p.img, 0, 0);
        } else {
          pg.text(display, offsetX, offsetY);
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
          const resultArray = computeWave(waveArrays, dis, p.frameCount);
          // const ?
          if (waveArrays) {
            waveArrays.forEach((wave) => {
              let result; // Variable to store the calculated value

              switch (wave.type) {
                case "sin":
                  result = p.int(
                    p.sin(p.frameCount * wave.speed + dis * wave.freq) *
                      wave.amp
                  );
                  break;
                case "cos":
                  result = p.int(
                    p.cos(p.frameCount * wave.speed + dis * wave.freq) *
                      wave.amp
                  );
                  break;
                case "tan":
                  result = p.int(
                    p.tan(p.frameCount * wave.speed + dis * wave.freq) *
                      wave.amp
                  );
                  break;
                default:
                  result = 0;
                  break;
              }

              if (wave.x) {
                resultArray[0] = result;
              }
              if (wave.y) {
                resultArray[1] = result;
              }
              if (wave.w) {
                resultArray[2] = result;
              }
              if (wave.h) {
                resultArray[3] = result;
              }

              console.log(resultArray);
            });
          }

          tile.wave(resultArray);
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

      p.mouseReleased = () => {
        tiles.forEach((tile) => {
          // tile.moveTo(p.mouseX, p.mouseY, 0.10);
          tile.resetOrigin();
        });
      };
    };

    const p5Instance = new p5(mousedrag, canvasRef.current);

    return () => {
      p5Instance.remove();
    };
  }, [data]);

  return <div ref={canvasRef} className="-z-10"></div>;
};

export default P5Canvas;

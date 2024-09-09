import { Tile } from "./Tile";

let tilesX = 20; // Grid columns
let tilesY = 72; // Grid rows
const collisionRadius = 100;
const friction = 0.8;
const ease = 0.25;
let tiles = [];

const mousedrag = (p) => {
  let pg;
  let canvasSize;
  let prevMouseX, prevMouseY;

  p.setup = () => {
    canvasSize = p.min(p.windowWidth, p.windowHeight);

    p.createCanvas(canvasSize, canvasSize);

    pg = p.createGraphics(canvasSize, canvasSize);

    pg.background(255);
    pg.fill(0);
    pg.textSize(canvasSize/4);
    pg.push();
    pg.translate(p.width / 2, p.height / 2);
    pg.textAlign(p.CENTER, p.CENTER);
    pg.text("hello", 0, 0);

    // p.frameRate(30);

    prevMouseX = p.mouseX;
    prevMouseY = p.mouseY;


    let tileW = p.int(p.width / tilesX);
    let tileH = p.int(p.height / tilesY);

    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        // Create an object for each tile
        let tile = new Tile(x, y, tileW, tileH);
        // Add the tile object to the array
        tiles.push(tile);
      }
    }
  };
  p.draw = () => {
    p.background(255);

    let moveX = p.mouseX - prevMouseX;
    let moveY = p.mouseY - prevMouseY;

    prevMouseX = p.mouseX;
    prevMouseY = p.mouseY;

    tiles.forEach((tile) => {
      // tile.update(p.mouseX, p.mouseY, collisionRadius, friction, ease);

      tile.update2(moveX, moveY, p.mouseX, p.mouseY, collisionRadius, friction, ease);

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
};

export default mousedrag;

const mousedrag = (p) => {

    let pg;
    let canvasSize;
    let prevMouseX, prevMouseY;
    const collisionRadius = 75;

  p.setup = () => {
    canvasSize = p.min(p.windowWidth, p.windowHeight);

    p.createCanvas(canvasSize, canvasSize);

    pg = p.createGraphics(canvasSize, canvasSize);

    pg.background(255);
    pg.fill(0);
    pg.textSize(200);
    pg.push();
    pg.translate(p.width / 2, p.height / 2);
    pg.textAlign(p.CENTER, p.CENTER);
    pg.text("hello", 0, 0);

    prevMouseX = p.mouseX;
    prevMouseY = p.mouseY;

    p.frameRate(30);
  };
  p.draw = () => {
    p.background(255);

    let tilesX = 40; // Grid columns
    let tilesY = 40; // Grid rows
    let tileW = p.int(p.width / tilesX);
    let tileH = p.int(p.height / tilesY);

    let deltaX = p.mouseX - prevMouseX;
    let deltaY = p.mouseY - prevMouseY;

    prevMouseX = p.mouseX;
    prevMouseY = p.mouseY;

    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {

        let sx = x * tileW;
        let sy = y * tileH;
        let sw = tileW;
        let sh = tileH;

        let dx = x * tileW;
        let dy = y * tileH;
        let dw = tileW;
        let dh = tileH;

        // Calculate distance from mouse position
        let dis = p.dist(p.mouseX, p.mouseY, x * tileW, y * tileH);

        // Use the distance to create a dynamic wave effect
        // let w = p.int(p.sin(p.frameCount * 0.05 + x * y * 0.03) * 100);
        let w2 = p.int(p.sin(p.frameCount * 0.05 + dis * 0.015) * 100);
        // let w3 = p.int(p.tan(p.frameCount * 0.05 + y * 0.03) * 100);

        // let w4 = p.int(p.sin(p.frameCount * 0.02 + x * y * 0.03) * 25);
        // let w5 = p.int(p.sin(p.frameCount * 0.02 + dis * 0.03) * 10);

        let d = p.dist(p.mouseX, p.mouseY, dx + dw / 2, dy + dh / 2);
        if (d < collisionRadius) {
          // Apply translation based on mouse movement delta
          dx += deltaX * 1.5; // Adjust the scaling factor for smoothness
          dy += deltaY * 1.5; // Adjust the scaling factor for smoothness
        }
          // Smoothly transition the grid cell back to its origin
          dx = p.lerp(dx, x * tileW, 0.001); // Gradually return to original position
          dy = p.lerp(dy, y * tileH, 0.001); // Gradually return to original position
      
        
        // dx += w2
        // dy += w2

        p.copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
      }
    }
  };
};

export default mousedrag;
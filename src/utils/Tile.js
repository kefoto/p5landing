export class Tile {
  constructor(x, y, w, h) {
    this.sx = x * w; // Source x
    this.sy = y * h; // Source y
    this.sw = w; // Source width
    this.sh = h; // Source height
    this.dx = x * w; // Destination x (starts at the same as source)
    this.dy = y * h; // Destination y (starts at the same as source)
    this.dw = w; // Destination width
    this.dh = h; // Destination height
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.origin = { x: x * w, y: y * h };
    this.delta = { x: 0, y: 0 };
  }

  update(mouseX, mouseY, radius, friction, ease) {
    this.delta.x = mouseX - this.sx;
    this.delta.y = mouseY - this.sy;

    let distance = Math.sqrt(this.delta.x ** 2 + this.delta.y ** 2);
    // this.force = (1) * (radius - distance) / radius;
    this.force = (-0.6) *  (radius) / distance;

    if (distance < radius) {
      this.angle = Math.atan2(this.delta.y, this.delta.x);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.sx += (this.vx *= friction) + (this.origin.x - this.sx) * ease;
    this.sy += (this.vy *= friction) + (this.origin.y - this.sy) * ease;

    // p.dist(p.mouseX, p.mouseY, tile.dx + tile.dw / 2, tile.dy + tile.dh / 2);
  }

  update2(moveX, moveY, mouseX, mouseY, radius, friction, ease) {
    let distance = Math.sqrt(
      (this.dx + this.dw / 2 - mouseX) ** 2 + (this.dy + this.dh / 2 - mouseY) ** 2
    );
    if (distance < radius) {
      let distanceFactor = (radius - distance) / radius;
      // Apply a smaller translation factor to slow down the movement
      this.vx += moveX * 1.5 * (-1) * distanceFactor;// Reduce the translation factor to slow down the movement
      this.vy += moveY * 1.5 * (-1) * distanceFactor; // Reduce the translation factor to slow down the movement
    }

    this.sx += (this.vx *= friction) + (this.origin.x - this.sx) * ease;
    this.sy += (this.vy *= friction) + (this.origin.y - this.sy) * ease;
  }

  wave([a, b, c, d, e, f, g, h]) {
    // Adjust properties using array values
    [this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh] = 
      [this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh]
      .map((val, index) => val + [a, b, c, d, e, f, g, h][index]);
  }

  warp(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    // this.ease = 0.05
  }
}

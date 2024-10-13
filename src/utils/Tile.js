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
    this.originalOrigin = { ...this.origin };
    this.delta = { x: 0, y: 0 };
    // this.waveOffset = {x: 0, y: 0, w: 0, h: 0};
  }

  update(mouseX, mouseY, radius, friction, ease, forceConst) {
    this.delta.x = mouseX - this.sx;
    this.delta.y = mouseY - this.sy;

    let distance = Math.sqrt(this.delta.x ** 2 + this.delta.y ** 2);
    // this.force = (1) * (radius - distance) / radius;
    this.force = (-1 * forceConst * radius) / distance;

    if (distance < radius) {
      this.angle = Math.atan2(this.delta.y, this.delta.x);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.sx += (this.vx *= friction) + (this.origin.x - this.sx) * ease;
    this.sy += (this.vy *= friction) + (this.origin.y - this.sy) * ease;

    // this.wave([this.waveOffset.x, this.waveOffset.y, this.waveOffset.w, this.waveOffset.h]);
    // p.dist(p.mouseX, p.mouseY, tile.dx + tile.dw / 2, tile.dy + tile.dh / 2);
  }

  update2(moveX, moveY, mouseX, mouseY, radius, friction, ease) {
    let distance = Math.sqrt(
      (this.dx + this.dw / 2 - mouseX) ** 2 +
        (this.dy + this.dh / 2 - mouseY) ** 2
    );
    if (distance < radius) {
      let distanceFactor = (radius - distance) / radius;
      // Apply a smaller translation factor to slow down the movement
      this.vx += moveX * 1.5 * -1 * distanceFactor; // Reduce the translation factor to slow down the movement
      this.vy += moveY * 1.5 * -1 * distanceFactor; // Reduce the translation factor to slow down the movement
    }

    // this.sx += (this.vx *= friction) + (this.origin.x - this.sx) * ease;
    // this.sy += (this.vy *= friction) + (this.origin.y - this.sy) * ease;
  }

  updateSize(){
    this.sw += (this.dw - this.sw) * 0.05;
    this.sh += (this.dh - this.sh) * 0.05;
  }

  wave([a, b, c, d, e=0, f=0, g=0, h=0]) {
    // Adjust properties using array values
    [this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh] = [
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.dx,
      this.dy,
      this.dw,
      this.dh,
    ].map((val, index) => val + [a, b, c, d, e, f, g, h][index]);
  }

  tempEase(x) {
    const temp = this.ease
    this.ease = x
    setTimeout(() =>{
      this.ease = temp
    }, 300)
  }
  
  changeOrigin(targetX, targetY) {
    this.origin.x = targetX;
    this.origin.y = targetY;

    // this.dx = targetX;
    // this.dy = targetY;
  }

  resetOrigin() {
    this.origin.x = this.originalOrigin.x;
    this.origin.y = this.originalOrigin.y;

    // this.dx = this.originalOrigin.x;
    // this.dy = this.originalOrigin.y;
  }

  moveTo(targetX, targetY, ex=8, ey=8) {
    let deltaX = targetX - this.sx;
    let deltaY = targetY - this.sy;

    // Apply easing to move towards the target position smoothly
    this.origin.x += -deltaX * ex;
    this.origin.y += -deltaY * ey;

    // Optionally, you can also update the destination position (dx, dy)
    // this.dx += deltaX;
    // this.dy += deltaY;
  }

  warp(width, height, v=2) {
    this.vx = Math.random() * v * width - width;
    this.vy = Math.random() * v * height - height;

    // console.log(this.vx)
    // console.log(this.vy)
  }


  //Add volcity
  reset(width, height, v=1.5) {
    // this.vx = (this.dx - this.sx) * 10
    // this.vy = (this.dy - this.sy) * 10  // Reset position
    // this.changeOrigin(100,100)
    // this.changeOrigin(Math.random() * v * width - width, Math.random() * v * height - height)
    // setTimeout(this.resetOrigin(), 100);
  }
}

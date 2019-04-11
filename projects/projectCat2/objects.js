//Objects
class Object {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }
  collision(otherobj) {
    let crash = true;
    if ((this.y + (this.height) < otherobj.y) || (this.y > otherobj.y + (otherobj.height)) ||
    (this.x + (this.width) < otherobj.x) || (this.x > otherobj.x + (otherobj.width))) {
        crash = false;
    }
    return crash;
  }
}

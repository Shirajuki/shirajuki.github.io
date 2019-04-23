//// OBJECTS
class Object {
  constructor(x, y, width, height, color, dx = 0, dy = 0, swap = false, r = 0, dmg = 1, img={set:sprite1,sx:91,sy:1,sw:9,sh:9}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.swap = swap;
    this.r = r;
    this.dmg = dmg;
    this.img = img;
  }
  draw() {
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    game.ctx.fill();
    game.ctx.closePath();
  }
  collision(otherobj) {
    let crash = true;
    if ((this.y + (this.height) < otherobj.y) || (this.y > otherobj.y + (otherobj.height)) ||
      (this.x + (this.width) < otherobj.x) || (this.x > otherobj.x + (otherobj.width))) {
      crash = false;
    }
    return crash;
  }
  collisionC(otherobj) {
    let crash = false;
    let dx = this.x - otherobj.x;
    let dy = this.y - otherobj.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.width/2 + otherobj.width/2) {
      crash = true;
    }
    return crash
  }
}
//// ITEM
class Item extends Object {
  constructor(x, y, width, height, color, dx, dy, img, type) {
    super(x, y, width, height, color, dx, dy);
    this.img = img;
    this.type = type;
  }
  draw() {
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    //game.ctx.fill();
    game.ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, Math.round(this.x-this.width*1.5/6), Math.round(this.y), this.width*1.5, this.height)
    game.ctx.closePath();
  }
}

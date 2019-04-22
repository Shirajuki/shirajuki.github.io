//// ENEMY
class Enemy {
  constructor(x, y, width, height, color, dx = 0, dy = 0, type = 0, bulletType = 0, hp = 5) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.type = type;
    this.bulletType = bulletType;
    this.hp = hp;

    this.typeImg = this.bulletType%6 * 20
    this.img = {set:dogsImg,sx:15,sy:this.typeImg,sw:15,sh:20};
    this.shootCDMaks = 300;
    this.shootCD = this.shootCDMaks/2;
    this.swap = false;
  }
  draw() {
    this.checkMovement();
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    //game.ctx.fill();
    game.ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, Math.round(this.x), Math.round(this.y-this.height*1.5/3), this.width, this.height*1.5)
    game.ctx.closePath();
    //console.log(this.shootCD)
    if (this.shootCD !== this.shootCDMaks) this.shootCD++;
  }
  checkMovement() {
    if (this.dx > 0) {
      this.img = {set:dogsImg,sx:30,sy:this.typeImg,sw:15,sh:20};
    } else if (this.dx < 0) {
      this.img = {set:dogsImg,sx:0,sy:this.typeImg,sw:15,sh:20};
    } else {
      this.img = {set:dogsImg,sx:15,sy:this.typeImg,sw:15,sh:20};
    }
  }
  shoot(arr) {
    let speed = 4;
    if (this.bulletType == 1) {
      bullet1(arr, this.x+this.width/2, this.y, 15, "red", speed);
    } else if (this.bulletType == 2) {
      bullet2(arr, this.x+this.width/2, this.y, 15, "red", speed);
    } else if (this.bulletType == 3) {
      bullet3(arr, this.x+this.width/2, this.y, 15, "red", speed);
    } else if (this.bulletType == 4) {
      bullet1(arr, this.x+this.width/2, this.y, 15, "red", speed);
      bullet3(arr, this.x+this.width/2, this.y, 15, "red", speed);
    } else if (this.bulletType == 5) {
      bullet4(arr, this.x+this.width/2, this.y, 15, "red", speed);
    } else if (this.bulletType == 6) {
      bullet5(arr, this.x+this.width/2, this.y, 15, "red", speed);
    }
  }
  checkType() {
    if (this.type == 2) {
      this.dx += 0.005;
    } else if (this.type == 3) {
      this.dx -= 0.005;
    } else if (this.type == 4) {
      if (this.dy > 0 && this.y >= game.canvas.height/4) {
        this.dy = 0;
        setTimeout(() => this.dy -= 1.1 ,3000)
      }
    } else if (this.type == 5) {
      if (this.swap) {
        this.dx += 0.1;
      } else {
        this.dx -= 0.1;
      }
      if (this.dx >= 5) {
        this.swap = false;
      } else if (this.dx <= -5) {
        this.swap = true;
      }
    }
  }
}

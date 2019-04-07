//// OBJECTS
class Object {
  constructor(x, y, width, height, color, dx = 0, dy = 0, swap = false, r = 0, dmg = 1, img={set:sprite1,sx:100,sy:1,sw:8,sh:8}) {
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
  constructor(x, y, width, height, color, dx, dy, img) {
    super(x, y, width, height, color, dx, dy, img);
    this.img = {set:foods,sx:0,sy:0,sw:26,sh:16};
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    //ctx.fill();
    ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, this.x-this.width*1.5/6, this.y, this.width*1.5, this.height)
    ctx.closePath();
  }
}
//// PLAYER
class Player extends Object {
  constructor(x, y, width, height, color, img) {
    super(x, y, width, height, color, img);
    this.typeImg = getRndInteger(0,3)*17;
    this.img = {set:animals,sx:15,sy:80+this.typeImg,sw:15,sh:17};
    this.imgX = this.x-this.width*4/2;
    this.imgY = this.y-this.width*3;
    this.imgW = this.width*4;
    this.imgH = this.height*5;
  }
  draw() {
    this.imgX = this.x-this.width*4/2;
    this.imgY = this.y-this.width*3;
    this.imgW = this.width*4;
    this.imgH = this.height*5;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, this.imgX, this.imgY, this.imgW, this.imgH)
    ctx.fill();
    ctx.closePath();
  }
  getItem(otherobj) {
    let crash = true;
    if ((this.imgY + (this.imgH) < otherobj.y) || (this.imgY > otherobj.y + (otherobj.height)) ||
      (this.imgX + (this.imgW) < otherobj.x) || (this.imgX > otherobj.x + (otherobj.width))) {
      crash = false;
    }
    return crash;
  }
}
//// BULLETS
// Circle bullet
class bulletC extends Object {
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    //ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, this.x-this.width/2, this.y-this.width/2, this.width, this.width)
    ctx.closePath();
  }
}
// Rect bullet
class bulletPlayer extends Object {
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    //ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, this.x-this.width/2, this.y-this.width/2, this.width, this.width)
    ctx.fill();
    ctx.closePath();
  }
}
// Beam
class Beam extends bulletC {
  constructor(x, y, width, height, color, dx, dy, dmg, img) {
    super(x, y, width, height, color, dx, dy, dmg, img);
    this.img = {set:bluebeam,sx:0,sy:0,sw:25,sh:100}
    this.timer = 0;

  }
  draw() {
    //this.img = {set:bluebeam,sx:0,sy:0,sw:25,sh:100}
    this.timer += 1;
    if (this.timer == 10) {
      this.timer = 0;
      this.img.sx += 25;
    }
    this.img.sx = this.img.sx%175;
    this.x = player.x-player.width;
    this.y = player.y;
    let height = canvas.height - (canvas.height-this.y);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, player.x-player.width/6-this.width, player.y-canvas.height, this.width*2, canvas.height)
    ctx.rect(player.x-player.width/6-this.width/2, player.y, this.width, -height);
    //ctx.stroke();
    ctx.closePath();
  }
  collision(otherobj) {
    let crash = true;
    if ((this.x + (this.width) < otherobj.x) || (this.x > otherobj.x + otherobj.width)) {
      crash = false;
    }
    return crash;
  }
}
// Bullet 2
class bulletC2 extends bulletC {
  draw() {
    super.draw();
    if (this.swap) {
      this.dx += 1;
    } else {
      this.dx -= 1;
    }
    if (this.dx >= 4) {
      this.swap = false;
    } else if (this.dx <= -4) {
      this.swap = true;
    }
  }
}
// Bullet 6
class bulletC6 extends bulletC {
  draw() {
    super.draw();
  }
}
class bulletC7 extends bulletC {
  draw() {
    //pg.draw.circle(screen, WHITE, (int(self.r * pl.cos(self.angle) + \
    //                    self.x), int(self.r * pl.sin(self.angle) + self.y)), 3)
    this.r += 0.1;
    this.x = this.r * (this.dx / speed) + this.x
    this.y = this.r + (this.dy / speed) + this.y
    //console.log(this.a)
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
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

    this.typeImg = getRndInteger(1,5)%4 * 20
    this.img = {set:animals,sx:15,sy:this.typeImg,sw:15,sh:20};
    this.shootCDMaks = 300;
    this.shootCD = this.shootCDMaks/2;
    this.swap = false;
  }
  draw() {
    this.checkMovement();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    //ctx.fill();
    ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, this.x, this.y-this.height*1.5/3, this.width, this.height*1.5)
    ctx.closePath();
    //console.log(this.shootCD)
    if (this.shootCD !== this.shootCDMaks) this.shootCD++;
  }
  checkMovement() {
    if (this.dx > 0) {
      this.img = {set:animals,sx:30,sy:this.typeImg,sw:15,sh:20};
    } else if (this.dx < 0) {
      this.img = {set:animals,sx:0,sy:this.typeImg,sw:15,sh:20};
    } else {
      this.img = {set:animals,sx:15,sy:this.typeImg,sw:15,sh:20};
    }
  }
  shoot(arr) {
    let speed = 4;
    if (this.bulletType == 1) {
      bullet1(arr, this.x, this.y, 15, "red", speed);
    } else if (this.bulletType == 2) {
      bullet2(arr, this.x, this.y, 15, "red", speed);
    } else if (this.bulletType == 3) {
      bullet3(arr, this.x, this.y, 15, "red", speed);
    } else if (this.bulletType == 4) {
      bullet1(arr, this.x, this.y, 15, "red", speed);
      bullet3(arr, this.x, this.y, 15, "red", speed);
    } else if (this.bulletType == 5) {
      bullet4(arr, this.x, this.y, 15, "red", speed);
    } else if (this.bulletType == 6) {
      bullet5(arr, this.x, this.y, 15, "red", speed);
    }
  }
  checkType() {
    if (this.type == 2) {
      this.dx += 0.005;
      this.dy = 1;
    } else if (this.type == 3) {
      this.dx -= 0.005;
      this.dy = 1;
    } else if (this.type == 4) {
      if (this.dy > 0 && this.y >= canvas.height/4) {
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
// Boss
class Boss extends Enemy{
  constructor(x, y, width, height, color, dx, dy, type, bulletType, hp) {
    super(x, y, width, height, color, dx, dy=2, type, bulletType, hp=300)
    this.startHp = this.hp;
    // normal shoot
    this.shootCDMaks = 100000;
    this.shootCD = 0;
    // left and right move
    this.swap = true;
    // timer for swap
    this.maxSwapTime = 300;
    // timer for shoot
    this.maxSwapShoot = 300/4;
    this.swapTime = 0;
  }
  hpBar() {
    let x = 10, y = 10;
    let max = (canvas.width-2*x)/this.startHp;
    let length = this.hp*max;
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(x, y, length, 10);
    ctx.fill();
    ctx.closePath();
  }
  bossPointer() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(this.x+this.width/2-30/2, canvas.height-12, 30, 10);
    ctx.fill();
    ctx.closePath();
  }
  draw() {
    // BOSS ??????
    super.draw();
    if (this.x <= this.width+10) {
      this.dx = 1;
      setTimeout(() => this.dx = 0,60);
    }
    if (this.x >= canvas.width-this.width-10) {
      this.dx = -1;
      setTimeout(() => this.dx = 0,60);
    }

    if (this.y >= canvas.height/10) this.dy = 0;
    if (this.swapTime%this.maxSwapShoot == 0 && this.dy == 0 && this.swap) {
      this.dx = 2*getRndInteger(-1,1);
    }
    if (this.swapTime == this.maxSwapTime) {
      if (this.swap) {
        setTimeout(() => {
          bullet6(enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", 2, 30);
          this.dx = 0;
        },200);
        this.swap = false;
        this.swapTime = -this.maxSwapTime/3;
      } else {
        this.swap = true;
        this.swapTime = -this.maxSwapTime/3;
      }
    }
    if (this.swapTime !== this.maxSwapTime) this.swapTime++;
    //console.log(this.swapTime)
  }
}
//// OTHERS
class Splatter extends bulletC {
  constructor(x, y, width, height, color, dx = 0, dy = 0, swap = false, r = 0, lifeTime, img) {
    super(x, y, width, height, color, dx, dy, swap, r, img);
    this.lifeTime = lifeTime;
    this.img = {set:sprite1,sx:435,sy:298,sw:23,sh:23}
    this.img.sx = getRndInteger(0,9)*23 + 435
    this.width *= 1.5
    this.x += this.width
    this.y += this.width
  }
  draw() {
    if (this.lifeTime !== 0) {
      this.lifeTime--;
    }
    super.draw();
  }
}

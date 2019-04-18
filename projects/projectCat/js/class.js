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
//// PLAYER
class Player extends Object {
  constructor(x, y, width, height, color, img) {
    super(x, y, width, height, color, img);
    this.power = 1;
    this.typeImg = getRndInteger(0,3)*17;
    this.img = {set:animals,sx:15,sy:80+this.typeImg,sw:15,sh:17};

    this.alive = true;
    this.invulnerable = false;
    this.invulnerableTimer = 0;
    this.charge = 3;
    this.hp = 3;
    this.powerImg = {set:foods,sx:107,sy:0,sw:13,sh:13};
    this.bombImg = {set:foods,sx:129,sy:0,sw:22,sh:22};
    this.hpImg = {set:foods,sx:120,sy:0,sw:9,sh:14};

    this.saiyanImg = {set:saiyan,sx:0,sy:0,sw:84,sh:102};
    this.saiyanTimer = 0;
  }
  draw() {
    if (game.endlessMode) this.drawSaiyan();
    if (this.alive) this.drawCharacter()
    this.drawUI();
  }
  drawCharacter() {
    this.imgX = this.x-this.width*4/2;
    this.imgY = this.y-this.width*3;
    this.imgW = this.width*4;
    this.imgH = this.height*5;
    game.ctx.beginPath();
    game.ctxUI.fillStyle = this.color;
    game.ctxUI.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    game.ctxUI.fill();
    game.ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, Math.round(this.imgX), Math.round(this.imgY), this.imgW, this.imgH)
    if (this.invulnerable) this.invulnerableDraw()
    game.ctx.closePath();
  }
  invulnerableDraw() {
    this.invulnerableTimer += 1;
    if (this.invulnerableTimer == 3) {
      this.invulnerableTimer = 0;
      game.ctx.clearRect(this.imgX, this.imgY, this.imgW, this.imgH);
    }
  }
  drawSaiyan() {
    this.saiyanTimer += 1;
    if (this.saiyanTimer == 10) {
      this.saiyanTimer = 0;
      this.saiyanImg.sx += 84;
    }
    this.saiyanImg.sx = this.saiyanImg.sx%(84*4);
    game.ctx.drawImage(this.saiyanImg.set, this.saiyanImg.sx, this.saiyanImg.sy, this.saiyanImg.sw, this.saiyanImg.sh, Math.round(this.x-this.width*7), Math.round(this.y-this.width*15), this.width*14, this.width*17)
  }
  drawUI() {
    let UIw = 20
    game.ctxUI.beginPath();
    for (let i = 0; i < Math.floor(this.hp); i++) {
      game.ctxUI.drawImage(this.hpImg.set, this.hpImg.sx, this.hpImg.sy, this.hpImg.sw, this.hpImg.sh, Math.round(0+(UIw+5)*i), game.canvasUI.height-45, UIw, UIw)
    }
    for (let i = 0; i < Math.floor(this.power); i++) {
      game.ctxUI.drawImage(this.powerImg.set, this.powerImg.sx, this.powerImg.sy, this.powerImg.sw, this.powerImg.sh, Math.round(0+(UIw+5)*i), game.canvasUI.height-20, UIw, UIw)
    }
    for (let i = 1; i <= Math.floor(this.charge); i++) {
      game.ctxUI.drawImage(this.bombImg.set, this.bombImg.sx, this.bombImg.sy, this.bombImg.sw, this.bombImg.sh, Math.round(game.canvasUI.width-(UIw+5)*i), game.canvasUI.height-45, UIw, UIw)
    }
    game.ctxUI.closePath();
  }
  dead() {
    if (this.hp < 1 && gameStarted) {
      gameStarted = false;
      console.log('GAME OVER');
      menu();
      if (isMobile) btnStart.style.display = 'block';
      bgwav.load();
      bgwav.pause();
      bosswav.load();
      bosswav.pause();
      game.init();
      setTimeout(() => {
        game.ctxBg.clearRect(0,0,game.canvasBg.width,game.canvasBg.height);
      },10);
    }
    this.hp--;
    this.alive = false;
    this.x = -10;
    this.y = -10;
  }
  revive() {
    if (!this.alive) {
      detonate();
      this.x = game.startX;
      this.y = game.startY;
      this.alive = true;
      this.invulnerable = true;
      setTimeout(() => this.invulnerable = false,4000);
    }
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
    game.ctx.beginPath();
    //game.ctx.fillStyle = "black";
    //game.ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    //game.ctx.fill();
    game.ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, Math.round(this.x-this.width/2), Math.round(this.y-this.width/2), this.width, this.width)
    game.ctx.closePath();
  }
}
// Rect bullet
class bulletPlayer extends Object {
  draw() {
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    //game.ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    game.ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, Math.round(this.x-this.width/2), Math.round(this.y-this.width/2), this.width, this.width)
    game.ctx.fill();
    game.ctx.closePath();
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
    this.x = game.player.x-game.player.width;
    this.y = game.player.y;
    let height = game.canvas.height - (game.canvas.height-this.y);
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, Math.round(game.player.x-game.player.width/6-this.width), Math.round(game.player.y-game.canvas.height), this.width*2, game.canvas.height)
    game.ctx.rect(game.player.x-game.player.width/6-this.width/2, game.player.y, this.width, -height);
    //game.ctx.stroke();
    game.ctx.closePath();
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
    super.draw();
    this.r += 0.05;
    this.x = this.r * (this.dx / game.speed) + this.x
    this.y = this.r + (this.dy / game.speed) + this.y
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

    this.typeImg = this.bulletType%4 * 20
    this.img = {set:animals,sx:15,sy:this.typeImg,sw:15,sh:20};
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

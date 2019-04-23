// Boss
class Boss extends Enemy{
  constructor(x, y, width, height, color, dx, dy, type, bulletType, hp, img) {
    super(x, y, width, height, color, dx, dy=2, type, bulletType, hp=300, img)
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
    this.hpImg = {set:foods,sx:0,sy:33,sw:178,sh:45};
    this.barPointerImg = {set:foods,sx:0,sy:0,sw:50,sh:23};

    this.img = img;
  }
  hpBar() {
    let x = 79, y = 17;
    let max = (game.canvas.width-2*x)/this.startHp;
    let length = this.hp*max;
    game.ctx.beginPath();
    game.ctx.fillStyle = 'black';
    game.ctx.rect(x, y, game.canvas.width-2*x, 20);
    game.ctx.fill();
    game.ctx.closePath();
    game.ctx.beginPath();
    game.ctx.fillStyle = 'red';
    game.ctx.rect(x, y, length, 20);
    game.ctx.fill();
    game.ctx.drawImage(this.hpImg.set, this.hpImg.sx, this.hpImg.sy, this.hpImg.sw, this.hpImg.sh, 20, -5, game.canvas.width-40, 66)
    game.ctx.closePath();
  }
  bossPointer() {
    game.ctx.beginPath();
    game.ctx.fillStyle = 'black';
    game.ctx.rect(this.x+this.width/2-30/2, game.canvas.height-12, 30, 10);
    //game.ctx.fill();
    game.ctxUI.drawImage(this.barPointerImg.set, this.barPointerImg.sx, this.barPointerImg.sy, this.barPointerImg.sw, this.barPointerImg.sh, Math.round(this.x+this.width/2-30/2), game.canvasUI.height-70, 40, 20)
    game.ctx.closePath();
  }
  draw() {
    // BOSS ??????
    super.draw();
    if (this.x <= this.width+10) {
      this.dx = 1;
      setTimeout(() => this.dx = 0,60);
    }
    if (this.x >= game.canvas.width-this.width-10) {
      this.dx = -1;
      setTimeout(() => this.dx = 0,60);
    }

    if (this.y >= game.canvas.height/6) this.dy = 0;
    if (this.swapTime%this.maxSwapShoot == 0 && this.dy == 0 && this.swap) {
      this.dx = 2*getRndInteger(-1,1);
    }
    if (this.swapTime == this.maxSwapTime) {
      if (this.swap) {
        setTimeout(() => {
          bullet6(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", 2, 30);
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
class Boss1 extends Boss {
  constructor(x, y, width, height, color, dx, dy, type, bulletType, hp,img) {
    super(x, y, width, height, color, dx, dy=2, type, bulletType, hp=300)
    this.patternStart = true;
    this.state = 1;
    this.img = img;

    this.name = this.constructor.name;
    //console.log(img.set)
  }
  checkMovement() {
    if (this.dx > 0) {
      this.img.sx = 45;
    } else if (this.dx < 0) {
      this.img.sx = 60;
    } else {
      this.img.sx = 75;
    }
  }
  draw() {
    this.checkMovement();
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.rect(this.x, this.y, this.width, this.height);
    //game.ctx.fill();
    game.ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, Math.round(this.x), Math.round(this.y-this.height*1.5/3), this.width, this.height*1.5)
    game.ctx.closePath();
    if (this.patternStart) {
      this.pattern();
    }
    if (this.hp <= this.startHp*0.2 && this.state == 1) {
      this.state = 2;
      this.hp = this.startHp;
      detonate();
      this.middle();
      this.idle();
      setTimeout(() => this.pattern(),1000);
    }
  }
  pattern() {
    if (this.y >= game.canvas.height/6 && this.patternStart) {
      this.dy = 0;
      this.patternStart = false;
    }
    if (!this.patternStart && game.bossAlive) {
      if (this.state == 1) {
        setTimeout(() => {if (this.state == 1) this.idle()},1000);
        setTimeout(() => {if (this.state == 1) this.atk()},1000);
        setTimeout(() => {if (this.state == 1) this.move('right','down')},2000);
        setTimeout(() => {if (this.state == 1) this.atk()},2000);

        setTimeout(() => {if (this.state == 1) this.move('left','up')},4000);
        setTimeout(() => {if (this.state == 1) this.atk()},4000);

        setTimeout(() => {if (this.state == 1) this.idle()},6000);
        setTimeout(() => {if (this.state == 1) this.atk()},6000);

        setTimeout(() => {if (this.state == 1) this.move('left','down')},8000);
        setTimeout(() => {if (this.state == 1) this.atk()},8000);

        setTimeout(() => {if (this.state == 1) this.move('right','up')},10000);
        setTimeout(() => {if (this.state == 1) this.atk()},10000);

        setTimeout(() => {if (this.state == 1) this.idle()},12000);
        setTimeout(() => {if (this.state == 1) this.pattern()},12000);
      }
      else {
        setTimeout(() => {if (this.state == 2) this.atk()},2000);
        setTimeout(() => {if (this.state == 2) this.atk()},6000);
        setTimeout(() => {if (this.state == 2) this.pattern()},8000);
      }
    }
  }
  middle() {
    let dy = (game.canvas.height/6 - this.y) * .025;
    let dx = (game.canvas.width/2-this.width/2 - this.x) * .025;
    var distance = Math.sqrt(dx*dx + dy*dy);
    let px = 10;
    if(distance > px){
      dx *= px/distance;
      dy *= px/distance;
    }
    this.x += dx;
    this.y += dy;
    if (Math.abs(dx) > 0.01) {
      setTimeout(() => this.middle(),10);
    }
  }
  idle() {
    this.dy = 0;
    this.dx = 0;
  }
  move(dirx,diry) {
    if (dirx == 'left') {
      this.dx = -1;
    } else {
      this.dx = 1;
    }
    if (diry == 'up') {
      this.dy = -0.5;
    } else {
      this.dy = 0.5;
    }
  }
  atk() {
    if (this.state == 1) {
      if (game.bossAlive) {
        bullet1(game.enemyBullet, this.x+this.width/2, this.y+this.height/2+10, 15, "red", game.speed/3, 4);
        bullet3(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", game.speed/3, 4);
        bullet33(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", game.speed/3, 4);
      }
    } else {
      if (game.bossAlive) {
        bullet6(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", 3, 8);
        bullet6(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", 3, 8,1);
      }
    }
  }
}

class Boss2 extends Boss1 {
  atk() {
    if (this.state == 1) {
      if (game.bossAlive) bullet7(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", 0.5, 4);
    } else {
      if (game.bossAlive) {
        bullet7(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", 3, 8);
      }
    }
  }
}
class Boss3 extends Boss1 {
  pattern() {
    if (this.y >= game.canvas.height/6 && this.patternStart) {
      this.dy = 0;
      this.patternStart = false;
    }
    if (!this.patternStart && game.bossAlive) {
      if (this.state == 1) {
        setTimeout(() => {if (this.state == 1) this.idle()},1000);
        setTimeout(() => {if (this.state == 1) this.atk()},1000);
        setTimeout(() => {if (this.state == 1) this.move('right','down')},2000);
        setTimeout(() => {if (this.state == 1) this.atk()},2000);

        setTimeout(() => {if (this.state == 1) this.idle()},4000);
        setTimeout(() => {if (this.state == 1) this.atk()},4000);
        setTimeout(() => {if (this.state == 1) this.move('left','up')},6000);

        setTimeout(() => {if (this.state == 1) this.idle()},8000);
        setTimeout(() => {if (this.state == 1) this.atk()},8000);

        setTimeout(() => {if (this.state == 1) this.move('left','down')},10000);
        setTimeout(() => {if (this.state == 1) this.atk()},10000);

        setTimeout(() => {if (this.state == 1) this.idle()},12000);
        setTimeout(() => {if (this.state == 1) this.atk()},12000);
        setTimeout(() => {if (this.state == 1) this.move('right','up')},14000);

        setTimeout(() => {if (this.state == 1) this.idle()},16000);
        setTimeout(() => {if (this.state == 1) this.pattern()},16000);
      }
      else {
        this.idle();
        this.middle();
        setTimeout(() => {if (this.state == 2) this.atk()},2000);
        setTimeout(() => {if (this.state == 2) this.pattern()},28000);
      }
    }
  }
  atk() {
    if (this.state == 1) {
      if (game.bossAlive) {
        bullet8(game.enemyBullet, this.x+this.width/2, this.y+this.height/2+10, 15, "red", game.speed/3, 4);
      }
    } else {
      if (game.bossAlive) {
        bullet9(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", 3, 8);
      }
    }
  }
}
class Boss4 extends Boss1 {
  pattern() {
    if (this.y >= game.canvas.height/6 && this.patternStart) {
      this.dy = 0;
      this.patternStart = false;
    }
    if (!this.patternStart && game.bossAlive) {
      if (this.state == 1) {
        setTimeout(() => {if (this.state == 1) this.idle()},1000);
        setTimeout(() => {if (this.state == 1) this.atk()},1000);
        setTimeout(() => {if (this.state == 1) this.move('right','down')},2000);
        setTimeout(() => {if (this.state == 1) this.atk()},2000);

        setTimeout(() => {if (this.state == 1) this.idle()},4000);
        setTimeout(() => {if (this.state == 1) this.atk()},4000);
        setTimeout(() => {if (this.state == 1) this.move('left','up')},6000);

        setTimeout(() => {if (this.state == 1) this.idle()},8000);
        setTimeout(() => {if (this.state == 1) this.atk()},8000);

        setTimeout(() => {if (this.state == 1) this.move('left','down')},10000);
        setTimeout(() => {if (this.state == 1) this.atk()},10000);

        setTimeout(() => {if (this.state == 1) this.idle()},12000);
        setTimeout(() => {if (this.state == 1) this.atk()},12000);
        setTimeout(() => {if (this.state == 1) this.move('right','up')},14000);

        setTimeout(() => {if (this.state == 1) this.idle()},16000);
        setTimeout(() => {if (this.state == 1) this.pattern()},16000);
      }
      else {
        this.idle();
        this.middle();
        setTimeout(() => {if (this.state == 2) this.atk()},2000);
        setTimeout(() => {if (this.state == 2) this.atk()},3000);
        setTimeout(() => {if (this.state == 2) this.atk()},4000);
        setTimeout(() => {if (this.state == 2) this.pattern()},2000);
      }
    }
  }
  atk() {
    if (this.state == 1) {
      if (game.bossAlive) {
        bullet8(game.enemyBullet, this.x+this.width/2, this.y+this.height/2+10, 15, "red", game.speed/3, 4);
      }
    } else {
      if (game.bossAlive) {
        if (this.circled !== true) {
          this.circled = true;
          circleBeam(game.enemyBullet,this.x+this.width/2, this.y+this.height/2-20, 15, "red", game.speed/3)
          setTimeout(() => circleBeam(game.enemyBullet,this.x+this.width/2, this.y+this.height/2-20, 15, "red", game.speed/3), 3500)
          setTimeout(() => circleBeam(game.enemyBullet,this.x+this.width/2, this.y+this.height/2-20, 15, "red", game.speed/3), 7000)
        }
        bullet1(game.enemyBullet, this.x+this.width/2, this.y+this.height/2+10, 15, "red", game.speed/3, 4);
        bullet3(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", game.speed/3, 4);
        bullet33(game.enemyBullet, this.x+this.width/2, this.y+this.height/2, 15, "red", game.speed/3, 4);
      }
    }
  }
}

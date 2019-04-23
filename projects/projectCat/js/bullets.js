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
class bulletC8 extends bulletC {
  draw() {
    //pg.draw.circle(screen, WHITE, (int(self.r * pl.cos(self.angle) + \
    //                    self.x), int(self.r * pl.sin(self.angle) + self.y)), 3)
    super.draw();
    this.r *= 0.05;
    this.x = this.r * (this.dx / game.speed) + this.x
    this.y = this.r * (this.dy / game.speed) + this.y
  }
}
class bulletC9 extends bulletC {
  draw() {
    super.draw();
    if (this.dy == 0) {
      this.dy = 0.0000001;
      setTimeout(() => {
        this.dy = game.speed/1.5;
        this.dx = getRndInteger(-2,2);
      },2000);
    }
  }
}
class circleBeamu extends bulletC {
  constructor(x, y, width, height, color, dx, dy, dmg, img) {
    super(x, y, width, height, color, dx, dy, dmg, img);
    this.timer = 0;
    this.angle = 0;
  }
  draw() {
    this.timer += 1;
    if (this.timer == 15) {
      this.timer = 0;
    }

    this.angle += 0.01;
    game.ctx.beginPath();
    //game.ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, Math.round(this.x-this.width/2), Math.round(this.y-this.width/2), this.width, this.width)
    game.ctx.closePath();

    game.ctx.save();
    game.ctx.translate(game.canvas.width/2, game.canvas.height/4);
    game.ctx.rotate(Math.PI/180 + this.angle);
    game.ctx.translate(-game.canvas.width/2, -game.canvas.height/4);
    game.ctx.drawImage(this.img.set, this.img.sx, this.img.sy, this.img.sw, this.img.sh, Math.round(this.x-this.width/2), Math.round(this.y-this.width/2), this.width, this.width)
    game.ctx.restore();
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

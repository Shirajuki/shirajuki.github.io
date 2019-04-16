class gameState {
  init() {
    //// CONFIG
    this.canvasBg = document.getElementById("bg");
    this.ctxBg = game.canvasBg.getContext("2d");
    this.ctxBg.webkitImageSmoothingEnabled = false;
    this.ctxBg.mozImageSmoothingEnabled = false;
    this.ctxBg.imageSmoothingEnabled = false;

    this.canvasOverlay = document.getElementById("overlay");
    this.ctxOverlay = this.canvasOverlay.getContext("2d");

    this.canvasUI = document.getElementById("ui");
    this.ctxUI = this.canvasUI.getContext("2d");
    this.ctxUI.webkitImageSmoothingEnabled = false;
    this.ctxUI.mozImageSmoothingEnabled = false;
    this.ctxUI.imageSmoothingEnabled = false;

    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    this.speed = 10;
    this.waveCount = -1;

    //// COOLDOWN
    // this.player this.bullet
    this.maxcd = 10;
    this.cd = this.maxcd;
    // enemy spawn + this.bullet
    this.maxWave = 400, this.cdWave = this.maxWave;
    this.shotcd = 0;

    //// PLAYER
    // this.player size
    this.paddleHeight = 25;
    this.paddleWidth = 6;
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
    this.paddleY = (this.canvas.height - this.paddleHeight) / 2;
    // this.player this.bullet
    this.startX = this.canvas.width / 2, this.startY = this.canvas.height - 100;
    this.player = new Player(this.startX, this.startY, 10, 10, "aqua");
    this.bullet = [];
    this.shoot = false;
    this.left = false, this.up = false, this.right = false, this.down = false, this.shift = false;
    this.laserbeam = false;
    // this.player this.speed
    this.normalSpeed = 7
    this.mvspeed = this.normalSpeed;

    //// ENEMY
    this.enemyHp = 6;
    this.enemies = [];
    this.enemyBullet = [];
    this.enemySize = 30;

    this.danger = false;
    this.dangerSign = false;
    this.bossAlive = false;
    this.boss = [];
    this.bossVolumeFade = false;
    //// OTHERS
    this.items = [];
    this.particles = [];
    this.sign = {set:foods,sx:0,sy:78,sw:179,sh:20};
    this.endlessMode = false;
    this.screenShake = false;
    this.detonating = false;
    this.alpha = 0;
    this.delta = 0.04;
    document.getElementById('none').style.backgroundColor = 'white';
  }
}
let game = new gameState();
game.init();
//// EVENT
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("touchstart", touchStart, false);
document.addEventListener("touchmove", touchMove, false);
document.addEventListener("touchend", touchEnd, false);

let isMobile = false;
if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || /Android|iPhone|Windows Phone|webOS|iPod|BlackBerry/i.test(navigator.userAgent)) {
    isMobile = true;
};

let touchStartX = 0, touchStartY = 0;
function touchMove(e) {
  if (!e) var e = event;

  if(e.touches) {
    if (e.touches.length == 1) { // Only deal with one finger
        let touch = e.touches[0]; // Get the information for finger #1
        game.paddleX = touch.pageX;
        game.paddleY = touch.pageY;
        let dx = touchStartX-game.paddleX;
        let dy = touchStartY-game.paddleY;
        if (game.player.x - dx >= game.player.width*1.5 && game.player.y - dy >= game.player.height/2 &&
        game.player.x - dx <= game.canvas.width-game.player.width*1.5 && game.player.y - dy <= game.canvas.height-game.player.height*1.5) {
          if (game.laserbeam) {
            dx*=0.5;
            dy*=0.5;
          }
          game.player.x -= dx;
          game.player.y -= dy;
        }
        touchStartX = game.paddleX;
        touchStartY = game.paddleY;
      } else if (e.touches.length == 2) { // Only deal with one finger
        if (game.player.alive) chargeBeam();
      }
  }
}
function touchStart(e) {
  let touch = e.touches[0];
  touchStartX = touch.pageX;
  touchStartY = touch.pageY;
  game.shoot = true;
}
function touchEnd(e) {
  game.shoot = false;
}
function keyDownHandler(e) {
  if (!gameStarted) {
    if(e.keyCode == 38) {
      moveMenu(chooseMeny.indexOf(1),'up'); // game.up
    }
    else if(e.keyCode == 40) {
      moveMenu(chooseMeny.indexOf(1),'down');
    }
    else if (e.keyCode == 88) { // x
      menyChoose(chooseMeny.indexOf(1));
    }
  } else {
    if (e.keyCode == 88) { // x
      game.shoot = true;
    }
    else if (e.keyCode == 67) {
      if (game.player.alive) chargeBeam();
    }
    else if (e.keyCode == 32) { // space
      game.player.power++;
      console.log(game.player.power)
    }
    else if(e.keyCode == 37) {
      game.left = true;
    }
    else if(e.keyCode == 38) {
      game.up = true;
    }
    else if(e.keyCode == 39) {
      game.right = true;
    }
    else if(e.keyCode == 40) {
      game.down = true;
    }
    else if(e.keyCode == 226) {
      game.shift = true;
    }
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 88) {
    game.shoot = false;
  }
  else if(e.keyCode == 37) {
    game.left = false;
  }
  else if(e.keyCode == 38) {
    game.up = false;
  }
  else if(e.keyCode == 39) {
    game.right = false;
  }
  else if(e.keyCode == 40) {
    game.down = false;
  }
  else if(e.keyCode == 226) {
    game.shift = false;
  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function splatter(antall,x=100,y=100,colorRange=[0,55],lifeTime,size) {
  // function splat(arr,antall,x,y,size,color,game.speed)
  splat(game.particles, antall, x, y, size, colorRange, game.speed, lifeTime);
}
function endless() {
  if (!game.endlessMode) {
    game.screenShake = true;
    game.maxWave = 30;
    game.enemyHp = 15;
    detonate();
    setTimeout(() => detonate(),100);
    setTimeout(() => detonate(),200);
    setTimeout(() => game.screenShake = false,3000);
    game.sign = {set:foods,sx:0,sy:98,sw:179,sh:20};
    game.endlessMode = true
    game.alpha = 1;
    game.dangerSign = true;
    setTimeout(() => game.dangerSign = false,7000);
  }
}
function playerShoot(x,y,bulletSize,color,shotcd) {
  let shootSprite = {set:sprite1,sx:385,sy:1,sw:13,sh:13};
  atkwav.load();
  atkwav.play();
  let rnd = getRndInteger(0,9);
  shootSprite.sx = rnd*12 + rnd*2 + 385;
  // 1 - 3
  if (game.player.power < 4) {
    if (game.player.power >= 1 && game.player.power < 2) {
      bullet1(game.bullet, x, y, bulletSize, color, game.speed, 1, shootSprite);
      //bullet2(game.bullet,x,y,bulletSize,color,game.speed);
      //bullet3(game.bullet,x,y,bulletSize,color,game.speed);
      //bullet4(game.bullet,x,y,bulletSize,color,game.speed);
      //bullet5(game.bullet,x,y,bulletSize,color,game.speed,3,shootSprite);
      //bullet6(game.bullet,x,y,bulletSize,color,1);
    }
    if (game.player.power >= 2) {
      bullet1(game.bullet, x - 20, y, bulletSize, color, game.speed, 1, shootSprite);
      bullet1(game.bullet, x + 20, y, bulletSize, color, game.speed, 1, shootSprite);
    }
    if (game.player.power >= 3) {
      bullet1(game.bullet, x, y, bulletSize, color, game.speed, 1, shootSprite);
    }
  }
  // 4 - 6
  else if (game.player.power < 7) {
    if (game.player.power >= 4 && game.player.power < 5) {
      bullet2(game.bullet, x, y -10, bulletSize + 10, color, game.speed, 1.5, shootSprite);
    }
    if (game.player.power >= 5) {
      bullet1(game.bullet, x - 20, y + 10, bulletSize + 10, color, game.speed, 3, shootSprite);
      bullet1(game.bullet, x + 20, y + 10, bulletSize + 10, color, game.speed, 3, shootSprite);
    }
    if (game.player.power >= 6) {
      bullet1(game.bullet, x, y -10, bulletSize + 10, color, game.speed, 3, shootSprite);
    }
  }
  // 7 - 8
  else if (game.player.power < 10) {
    if (game.player.power >= 7) {
      bullet1(game.bullet, x, y, bulletSize, color, game.speed, 2, shootSprite);
      bullet3(game.bullet, x - 20, y + 10, bulletSize, color, game.speed, 2, shootSprite);
      bullet3(game.bullet, x + 20, y + 10, bulletSize, color, game.speed, 2, shootSprite);
    }
    if (game.player.power >= 8) {
      bullet1(game.bullet, x - 30, y + 30, bulletSize, color, game.speed, 3, shootSprite);
      bullet1(game.bullet, x + 30, y + 30, bulletSize, color, game.speed, 3, shootSprite);
    }
    if (game.player.power >= 9) {
      bullet3(game.bullet, x - 40, y + 30, bulletSize, color, game.speed, 2, shootSprite);
      bullet3(game.bullet, x + 40, y + 30, bulletSize, color, game.speed, 2, shootSprite);
      endless();
    }
  } else {
    console.log('TBA')
    game.player.power = 9;
  }
}
function debug() {
  return
  hpImg = {set:foods,sx:0,sy:33,sw:178,sh:45};
  let x = 65, y = 17;
  let max = (game.canvas.width-2*x)/200;
  let length = 200*max;
  game.ctx.beginPath();
  game.ctx.fillStyle = 'red';
  game.ctx.rect(x, y, length, 20);
  game.ctx.fill();
  game.ctx.drawImage(hpImg.set, hpImg.sx, hpImg.sy, hpImg.sw, hpImg.sh, 0, -10, game.canvas.width, 70)
  game.ctx.closePath();
}
function chargeBeam() {
  let beamTime = 5000;
  if (game.player.charge> 0 && !game.laserbeam) {
    game.player.charge--;
    game.laserbeam = true;
    detonate();
    powerwav.load();
    powerwav.play();
    beam(game.bullet, game.player.x, game.player.y, 40, "indigo", game.speed*10, 0.5);
    setTimeout(() => {
      game.laserbeam = false;
      setTimeout(() => {
        game.bullet = [];
        game.shoot = true;
      },10);
    },beamTime);
  }
}
function detonate() {
  game.alpha = 1;
  game.detonating = true;
  setTimeout(() => game.enemyBullet = [],100);
}
function changeDifficulty() {
  game.enemyHp += 5;
}
//// SPAWNERS
// Spawn game.enemies
function spawn() {
  if (game.danger || game.bossAlive || false) {
    return
  }
  game.waveCount++;
  //console.log(game.waveCount)
  game.cd = game.maxcd;
  game.cdWave = game.maxWave;
  let end = getRndInteger(4,8);
  let type = getRndInteger(1,5);
  let j = 1;
  function f() {
    let color = "blue";
    let x = getRndInteger(0 + game.enemySize, game.canvas.width - game.enemySize);
    let vx = 0, vy = 1;
    let hp = getRndInteger(game.enemyHp/2,game.enemyHp);
    if (type == 2 || type == 3) vy = 1*getRndInteger(10,20)/10;
    if (type == 2) getRndInteger(0, game.canvas.width/2);
    else if (type == 3) x = getRndInteger(game.canvas.width/2, game.canvas.width);
    else if (type == 5) x = game.canvas.width/2 + game.enemySize*2;
    game.enemies.push(new Enemy(x, -game.enemySize*1.5, game.enemySize, game.enemySize, color, vx, vy, type, getRndInteger(1,6), hp));
    j++;
    if(j < end ){
      setTimeout(f, 1000);
    }
  }
  f();
}
function spawnBoss() {
  bossMode();
  changeDifficulty();
  let size = 50;
  let x = (game.canvas.width/2)-size/2;
  game.enemies.push(new Boss(x, -size*1.5, size, size, "cyan", 0, 0.3, 6, 6, game.enemyHp*30));
}

function spawnItem(x,y,type = 0) {
  let size = 20;
  let color = 'black';
  if (type == 0) game.items.push(new Item(x, y, size, size, color, 0, 3, {set:foods,sx:56,sy:8,sw:26,sh:16},type));
  if (type == 1) game.items.push(new Item(x, y, size, size, color, 0, 3, {set:foods,sx:82,sy:0,sw:25,sh:19},type));
}
function bossMode() {
  if (game.bossVolumeFade) {
    game.bossVolumeFade = false;
    let interval = setInterval(() => {
      bgwav.volume += 0.005;
      if (bgwav.volume >= 0.95) clearInterval(interval);
    },100);
  } else {
    game.bossVolumeFade = true;
    let interval = setInterval(() => {
      bgwav.volume -= 0.05;
      if (bgwav.volume <= 0.05) clearInterval(interval);
    },100);
    bosswav.load();
    bosswav.play();
  }
}
function drawDanger(dangerImg) {
  game.ctxOverlay.drawImage(dangerImg.set, dangerImg.sx, dangerImg.sy, dangerImg.sw, dangerImg.sh, 0, game.canvas.height/2, game.canvas.width, 45)
}

//// DRAW EVERYTHING
function draw() {
  drawBg();
  game.ctxOverlay.clearRect(0,0,game.canvasOverlay.width,game.canvasOverlay.height);
  if (game.dangerSign) {
    game.alpha -= game.delta;
    if (game.alpha <= 0 || game.alpha >= 1) game.delta = -game.delta;
    game.ctxOverlay.globalAlpha = game.alpha;
    //console.log(game.alpha)
  }

  if (game.detonating) {
    game.alpha -= 0.025;
    if (game.alpha <= 0) {
      game.detonating = false;
      game.alpha = 0.99;
      game.delta = Math.abs(game.delta);
    }
    game.ctxOverlay.beginPath();
    game.ctxOverlay.fillStyle = 'white';
    game.ctxOverlay.rect(0, 0, game.canvas.width, game.canvas.height);
    game.ctxOverlay.fill();
    game.ctxOverlay.closePath();
    game.ctxOverlay.globalAlpha = game.alpha;
  }
  game.ctxUI.clearRect(0,0,game.canvasUI.width,game.canvasUI.height);
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  if (game.dangerSign) drawDanger(game.sign);

  game.maxcd = getRndInteger(20, 30); // ENEMY CD
  if (game.waveCount%10 == 0 && game.waveCount > 0 && game.maxWave >= 20 && !game.endlessMode) {
    game.danger = true;
    game.waveCount++;
  }
  // Boss spawner
  if (game.danger) {
    game.alpha = 1;
    game.dangerSign = true;
    game.screenShake = true;
    game.danger = false;
    game.bossAlive = true;
    setTimeout(() => {
      alertwav.load();
      alertwav.play();
    },200)
    setTimeout(() => {
      game.dangerSign = false;
      game.screenShake = false;
    },3000);
    setTimeout(spawnBoss,4000);
  }
  // PLAYERS EVENTHANDLERS
  if (game.player.alive) {
    /*
    if (isMobile && false) {
      //get the distance between the mouse and the ball on both axes
      //walk only the an eight of the distance to create a smooth fadeout
      var dx = (game.paddleX - game.player.x) * .125;
      var dy = (game.paddleY - game.player.y) * .125;
      //calculate the distance this would move ...
      var distance = Math.sqrt(dx*dx + dy*dy);
      //... and cap it at 5px
      let px = 10;
      if(distance > px){
        dx *= px/distance;
        dy *= px/distance;
      }
      if (game.player.x + dx >= game.player.width*1.5 && game.player.y + dy >= game.player.height/2 &&
      game.player.x + dx <= game.canvas.width-game.player.width*1.5 && game.player.y + dy <= game.canvas.height-game.player.height*1.5) {
        game.player.x += dx;
        game.player.y += dy;
      }
    }
    */
    // Shoot
    if (game.shoot == true && game.shotcd == 0 && !game.laserbeam) {
      let bulletSize = 30;
      let color = "indigo";
      let x = game.player.x;
      let y = game.player.y-50;
      game.shotcd = 7;
      playerShoot(x,y,bulletSize,color,game.shotcd);
    }
    // Player movement
    if (game.shift || game.laserbeam) {
      game.mvspeed = game.normalSpeed-4;
    } else {
      game.mvspeed = game.normalSpeed;
    }
    if (game.left && game.player.x >= game.player.width*1.5) {
      game.player.x -= game.mvspeed;
      game.player.img = {set:animals,sx:0,sy:80+game.player.typeImg,sw:15,sh:17};
    }
    if (game.up && game.player.y >= game.player.height/2) {
      game.player.y -= game.mvspeed;
    }
    if (game.right && game.player.x <= game.canvas.width-game.player.width*1.5) {
      game.player.x += game.mvspeed;
      game.player.img = {set:animals,sx:30,sy:80+game.player.typeImg,sw:15,sh:17};
    }
    if (game.down && game.player.y <= game.canvas.height-game.player.height*1.5) {
      game.player.y += game.mvspeed;
    }
    if (!game.left && !game.up && !game.right && !game.down) {
      game.player.img = {set:animals,sx:15,sy:80+game.player.typeImg,sw:15,sh:17};
    }
  }
  // draw game.player
  game.player.draw();
  debug();
  //// COOLDOWNS
  if (game.cd == 0 && game.cdWave == 0) {
    spawn();
  }
  if (game.cd != 0) {
    game.cd--;
  }
  if (game.shotcd != 0) {
    game.shotcd--;
  }
  if (game.cdWave != 0) {
    game.cdWave--;
  }
  //// LOOPS
  // Player bullets
  for (let i = game.bullet.length-1; i >= 0; i--) {
    let shot = game.bullet[i];
    shot.y -= shot.dy;
    shot.x += shot.dx;
    shot.draw();
    if (shot.y < -100 || shot.x < 0 || shot.x > 500) {
      game.bullet.splice(i, 1);
    }
  }
  // Particles
  for (let i = game.particles.length-1; i >= 0; i--) {
    let particle = game.particles[i];
    particle.y -= particle.dy;
    particle.x += particle.dx;
    particle.draw();
    if (particle.lifeTime == 0) game.particles.splice(i,1);
  }
  // Items
  for (let i = game.items.length-1; i >= 0; i--) {
    let item = game.items[i];
    item.y += item.dy;
    item.draw();
    if (game.player.getItem(item)) {
      game.items.splice(i, 1);
      if (item.type == 0) game.player.power+=0.2001;
      if (item.type == 1) game.player.hp+=0.3334;
      console.log(game.player.power,game.player.hp);
    }
  }
  // Enemy game.bullet
  for (let i = game.enemyBullet.length-1; i >= 0; i--) {
    let shot = game.enemyBullet[i];
    shot.y += shot.dy;
    shot.x += shot.dx;
    shot.draw();
    if (shot.y > game.canvas.height+10 || shot.y < -10 || shot.x < -10 || shot.x > game.canvas.width+10) {
      game.enemyBullet.splice(i, 1);
    }
    if (shot.collisionC(game.player)) {
      if (!game.player.invulnerable && game.player.alive) {
        game.enemyBullet.splice(i, 1);
        splatter(30,game.player.x-game.player.width*7,game.player.y-game.player.height*7, [0,55],getRndInteger(20,60),40)
        deadwav.play();
        game.player.dead();
        setTimeout(() => game.player.revive(),3000)
        console.log("DIEEEEEEEEEEEee")
      }

    }
    if (game.laserbeam) {
      if (game.bullet[0].collision(shot)) {
        game.enemyBullet.splice(i, 1);
        splatter(10,shot.x-25,shot.y,[150,255],getRndInteger(7,15),15)
      }
    }
  }
  // Enemies
  for (let i = game.enemies.length-1; i >= 0; i--) {
    let enemy = game.enemies[i];
    enemy.checkType();
    enemy.y += enemy.dy;
    enemy.x += enemy.dx;
    enemy.draw();
    if (enemy.shootCD == enemy.shootCDMaks) {
      let test = getRndInteger(2,5)
      for (let i = 0; i < test; i++) {
        setTimeout(() => enemy.shoot(game.enemyBullet),i*200);
      }
      enemy.shootCD = 0;
    }
    //// CHECK BOSS
    if (enemy.type >= 6) {
      enemy.hpBar();
      enemy.bossPointer();
      if (enemy.hp <= 0) {
        bossMode();
        bosswav.pause();
        detonate();
        spawnItem(enemy.x,enemy.y,1)
        setTimeout(() => game.bossAlive = false, 3000)
        game.maxWave -= 20;
        splatter(30,enemy.x,enemy.y, [0,55],getRndInteger(40,80),40)
      }
    }
    if (enemy.y > game.canvas.height + 100 || enemy.y < -200) {
      game.enemies.splice(i, 1);
    }

    if (enemy.hp <= 0) {
      enemyDeadwav.load();
      enemyDeadwav.play().catch(() => console.log());
      game.enemies.splice(i, 1);
      //killCount++;
      game.player.charge += 0.01667;
      splatter(30,enemy.x-50,enemy.y-50, [0,55],getRndInteger(7,20),30)
      let rng = getRndInteger(1,9)
      if (rng == 1) spawnItem(enemy.x,enemy.y);
      continue;
    }
    for (let j = game.bullet.length-1; j >= 0; j--) {
      let shot = game.bullet[j];
      let crash = true;
      // delete
      if (shot.collision(enemy)) {
        enemy.hp-=shot.dmg;
        splatter(10,enemy.x,enemy.y+20,[150,255],getRndInteger(7,15),15)
        if (!game.laserbeam) game.bullet.splice(j, 1)
      }
    }
  }
  if (gameStarted) requestAnimationFrame(draw);
}
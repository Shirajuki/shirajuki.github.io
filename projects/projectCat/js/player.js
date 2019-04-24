//// PLAYER
class Player extends Object {
  constructor(x, y, width, height, color, img) {
    super(x, y, width, height, color, img);
    this.power = 1;
    this.typeImg = getRndInteger(0,3)*17;
    this.img = {set:catsImg,sx:15,sy:this.typeImg,sw:15,sh:17};

    this.alive = true;
    this.invulnerable = false;
    this.invulnerableTimer = 0;
    this.charge = 3;
    this.hp = 2;
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
    for (let i = 0; i < Math.floor(this.hp+1); i++) {
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
      addScore(game.score);
      game.popup = true;
      popups("leaderboard");
      btnRestart.style.display = 'block';
      btnHome.style.display = 'block';
      document.getElementById('leaderboardClose').style.display = 'none';
      if (isMobile) btnStart.style.display = 'block';
      bgwav.load();
      bgwav.pause();
      bosswav.load();
      bosswav.pause();
      game.init();
      setTimeout(() => {
        game.ctxBg.clearRect(0,0,game.canvasBg.width,game.canvasBg.height);
        game.init();
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

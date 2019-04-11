//// LOADS
let gameStarted = false;
let loadedImg = 0;

let canvasBg = document.getElementById("bg");
let ctxBg = canvasBg.getContext("2d");
ctxBg.webkitImageSmoothingEnabled = false;
ctxBg.mozImageSmoothingEnabled = false;
ctxBg.imageSmoothingEnabled = false;
//// IMAGE
// Background
const bg = new Image();
bg.onload = () => {
    loadedImg++;
    checkLoaded();
};
bg.src = 'night.png';
let bg1Y = 0;
let bg2Y = 600;
let bgScrollSpeed = 3;
function drawBg() {
  if (screenShake) {
    ctxBg.save();
    let dx = Math.random()*5;
    let dy = Math.random()*2;
    ctxBg.translate(dx, dy);
  }
  bg1Y += bgScrollSpeed;
  bg2Y += bgScrollSpeed;
  if (bg1Y >= 595) bg1Y = -595;
  if (bg2Y >= 595) bg2Y = -595;
  //console.log(bg1Y,bg2Y)
  ctxBg.clearRect(0,0,canvasBg.width,canvasBg.height);
  ctxBg.drawImage(bg,0,0,canvas.width,canvas.height,0,bg1Y,canvas.width*3.35,canvas.height*4);
  ctxBg.drawImage(bg,0,0,canvas.width,canvas.height,0,bg2Y,canvas.width*3.35,canvas.height*4);
  if (screenShake) {
    ctxBg.restore();
  }
}

// Shots???
const sprite1 = new Image();
sprite1.onload =() => {
    loadedImg++;
    checkLoaded();
};
sprite1.src = 'sprite1.png';

// Laserbeam
const bluebeam = new Image();
bluebeam.onload = () => {
    loadedImg++;
    checkLoaded();
};
bluebeam.src = 'pinkbeam.png';

// Animals (20/17x15)
const animals = new Image();
animals.onload = () => {
    loadedImg++;
    checkLoaded();
};
animals.src = 'animals.png';

// Items
const foods = new Image();
foods.onload = () => {
    loadedImg++;
    checkLoaded();
};
foods.src = 'items.png';

// saiyan glow
const saiyan = new Image();
saiyan.onload = () => {
    loadedImg++;
    checkLoaded();
};
saiyan.src = 'saiyan.png';



//// Music
let loadedMusic = 0;
let bgVolume = 0.5;
// Background wav
const bgwav = new Audio('bgm.mp3');
bgwav.addEventListener('canplaythrough', () => {
  if (!gameStarted) {
    bgwav.volume = bgVolume;
    bgwav.loop = true;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// boss wav
const bosswav = new Audio('boss.WAV');
bosswav.addEventListener('canplaythrough', () => {
  if (!gameStarted) {
    loadedMusic++;
    checkLoaded();
  }
}, false);

// enemydead wav
const enemyDeadwav = new Audio('enemydead.wav');
enemyDeadwav.addEventListener('canplaythrough', () => {
  if (!gameStarted) {
    enemyDeadwav.volume = 0.1;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// dead wav
const deadwav = new Audio('dead.wav');
deadwav.addEventListener('canplaythrough', () => {
  if (!gameStarted) {
    deadwav.volume = 0.1;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// atk wav
const atkwav = new Audio('atk.wav');
atkwav.addEventListener('canplaythrough', () => {
  if (!gameStarted) {
    atkwav.volume = 0.017;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// power wav
const powerwav = new Audio('power.wav');
powerwav.addEventListener('canplaythrough', () => {
  if (!gameStarted) {
    powerwav.volume = 0.9;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// alert wav
const alertwav = new Audio('alert.wav');
alertwav.addEventListener('canplaythrough', () => {
  if (!gameStarted) {
    alertwav.volume = 0.4;
    loadedMusic++;
    checkLoaded();
  }
}, false);

function checkLoaded() {
  if (loadedImg == 6 && loadedMusic == 7) {
    console.log(`Loaded total tilesets: ${loadedImg}`);
    console.log(`Loaded total music: ${loadedMusic}`);
    gameStarted = true;
    setTimeout(() => {
      bgwav.play();
      draw();
    },50)
  }
}

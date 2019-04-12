//// LOADS
let gameLoaded = false;
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

// title
const titleFrame = new Image();
titleFrame.onload =() => {
    loadedImg++;
    checkLoaded();
};
titleFrame.src = 'frame.png';

// titlebg
const titleBg = new Image();
titleBg.onload =() => {
    loadedImg++;
    checkLoaded();
};
titleBg.src = 'titlebg.png';

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
  if (!gameLoaded) {
    bgwav.volume = bgVolume;
    bgwav.loop = true;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// boss wav
const bosswav = new Audio('boss.WAV');
bosswav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    loadedMusic++;
    checkLoaded();
  }
}, false);

// enemydead wav
const enemyDeadwav = new Audio('enemydead.wav');
enemyDeadwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    enemyDeadwav.volume = 0.1;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// dead wav
const deadwav = new Audio('dead.wav');
deadwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    deadwav.volume = 0.1;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// atk wav
const atkwav = new Audio('atk.wav');
atkwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    atkwav.volume = 0.017;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// power wav
const powerwav = new Audio('power.wav');
powerwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    powerwav.volume = 0.9;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// alert wav
const alertwav = new Audio('alert.wav');
alertwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    alertwav.volume = 0.4;
    loadedMusic++;
    checkLoaded();
  }
}, false);

function checkLoaded() {
  if (loadedImg == 8 && loadedMusic == 7) {
    console.log(`Loaded total tilesets: ${loadedImg}`);
    console.log(`Loaded total music: ${loadedMusic}`);
    gameLoaded = true;
    setTimeout(() => {
      menu();
    },50)
  }
}
function moveMenu(x,dir) {
  chooseMeny[x] = 0;
  if (dir == 'down') {
    if (x+1 == chooseMeny.length) {
      chooseMeny[0] = 1;
    } else {
      chooseMeny[x+1] = 1;
    }
  } else {
    if (x-1 == -1) {
      chooseMeny[chooseMeny.length-1] = 1;
    } else {
      chooseMeny[x-1] = 1;
    }
  }
}
function menyChoose(x) {
  if (x == 0) {
    console.log('start game');
    gameStarted = true;
    setTimeout(() => {
      bgwav.play();
      detonate();
      draw();
      document.getElementById('none').style.backgroundColor = 'black';
    },100);

  } else if (x == 1) {
    console.log('controls');

  } else {
    console.log('help');
  }
}
let gameStarted = false;
let chooseMeny = [1,0,0];
function menu() {
  ctxUI.clearRect(0,0,canvasUI.width,canvasUI.height);
  ctxUI.drawImage(titleBg,0,0,188,300,30,30,canvasUI.width-50,canvasUI.height-50);
  ctxUI.drawImage(titleFrame,0,0,64,100,0,0,canvasUI.width,canvasUI.height);
  let titleX = canvas.width/2;
  let titleY = 150;
  ctxUI.drawImage(titleFrame,64,0+(9*chooseMeny[0]),75,9,titleX,titleY, 150,20);
  ctxUI.drawImage(titleFrame,64,18+(9*chooseMeny[1]),75,9,titleX,titleY+30, 150,20);
  ctxUI.drawImage(titleFrame,64,36+(9*chooseMeny[2]),75,9,titleX,titleY+60, 150,20);
  let pointer = chooseMeny.indexOf(1);
  if (pointer !== -1) ctxUI.drawImage(titleFrame,64,54,5,7,titleX-20,titleY+(30*pointer)+2, 15,15);
  if (!gameStarted) requestAnimationFrame(menu);
}

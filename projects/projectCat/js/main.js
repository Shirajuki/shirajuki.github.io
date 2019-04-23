//// LOADS
let gameLoaded = false;
let loadedImg = 0;

//// IMAGE
// Background
const bg = new Image();
bg.onload = () => {
    loadedImg++;
    checkLoaded();
};
bg.src = './img/night.png';
let bg1Y = 0;
let bg2Y = 600;
let bgScrollSpeed = 3;
function drawBg() {
  if (game.screenShake) {
    game.ctxBg.save();
    let dx = Math.random()*5;
    let dy = Math.random()*2;
    game.ctxBg.translate(dx, dy);
  }
  bg1Y += bgScrollSpeed;
  bg2Y += bgScrollSpeed;
  if (bg1Y >= 595) bg1Y = -595;
  if (bg2Y >= 595) bg2Y = -595;
  //console.log(bg1Y,bg2Y)
  game.ctxBg.clearRect(0,0,game.canvasBg.width,game.canvasBg.height);
  game.ctxBg.drawImage(bg,0,0,game.canvasBg.width,game.canvasBg.height,0,bg1Y,game.canvasBg.width*3.35,game.canvasBg.height*4);
  game.ctxBg.drawImage(bg,0,0,game.canvasBg.width,game.canvasBg.height,0,bg2Y,game.canvasBg.width*3.35,game.canvasBg.height*4);
  if (game.screenShake) {
    game.ctxBg.restore();
  }
}

// title
const titleFrame = new Image();
titleFrame.onload =() => {
    loadedImg++;
    checkLoaded();
};
titleFrame.src = './img/frame.png';

// titlebg
const titleBg = new Image();
titleBg.onload =() => {
    loadedImg++;
    checkLoaded();
};
titleBg.src = './img/titlebg.png';

// Shots???
const sprite1 = new Image();
sprite1.onload =() => {
    loadedImg++;
    checkLoaded();
};
sprite1.src = './img/sprite1.png';

// Laserbeam
const bluebeam = new Image();
bluebeam.onload = () => {
    loadedImg++;
    checkLoaded();
};
bluebeam.src = './img/pinkbeam.png';

// cats (17x15)
const catsImg = new Image();
catsImg.onload = () => {
    loadedImg++;
    checkLoaded();
};
catsImg.src = './img/cats.png';

// dogs (20/22x15)
const dogsImg = new Image();
dogsImg.onload = () => {
    loadedImg++;
    checkLoaded();
};
dogsImg.src = './img/dogs.png';

// Items
const foods = new Image();
foods.onload = () => {
    loadedImg++;
    checkLoaded();
};
foods.src = './img/items.png';

// saiyan glow
const saiyan = new Image();
saiyan.onload = () => {
    loadedImg++;
    checkLoaded();
};
saiyan.src = './img/saiyan.png';



//// Music
let loadedMusic = 0;
let bgVolume = 0.5;
// Background wav
const bgwav = new Audio('./sfx/bgm.mp3');
bgwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    bgwav.volume = bgVolume;
    bgwav.loop = true;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// boss wav
const bosswav = new Audio('./sfx/boss.WAV');
bosswav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    bosswav.loop = true;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// enemydead wav
const enemyDeadwav = new Audio('./sfx/enemydead.wav');
enemyDeadwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    enemyDeadwav.volume = 0.1;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// dead wav
const deadwav = new Audio('./sfx/dead.wav');
deadwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    deadwav.volume = 0.1;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// atk wav
const atkwav = new Audio('./sfx/atk.wav');
atkwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    atkwav.volume = 0.017;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// power wav
const powerwav = new Audio('./sfx/power.wav');
powerwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    powerwav.volume = 0.9;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// item mp3
const itemmp3 = new Audio('./sfx/item.mp3');
itemmp3.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    itemmp3.volume = 0.2;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// nav mp3
const navmp3 = new Audio('./sfx/nav.mp3');
navmp3.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    navmp3.volume = 0.3;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// alert wav
const alertwav = new Audio('./sfx/alert.wav');
alertwav.addEventListener('canplaythrough', () => {
  if (!gameLoaded) {
    alertwav.volume = 0.4;
    loadedMusic++;
    checkLoaded();
  }
}, false);

// Check load
function checkLoaded() {
  if (loadedImg == 9 && loadedMusic == 9) {
    console.log(`Loaded total tilesets: ${loadedImg}`);
    console.log(`Loaded total music: ${loadedMusic}`);
    setTimeout(() => {
      gameLoaded = true;
      menu();
      let canvases = document.querySelectorAll('canvas');
      for (let i = 0, len = canvases.length; i < len; i++) {
        canvases[i].style.opacity = 1;
      }
      document.getElementById('loadScreen').style.visibility = 'hidden';
      document.getElementById('loadScreen').style.opacity = 0;
      if (isMobile) {
        btnStart.style.display = 'block';
        btnLeaderboard.style.display = 'block';
        btnControls.style.display = 'block';
        btnHelp.style.display = 'block';
        btnCredits.style.display = 'block';
      }
    },1000)
  }
}

// BUTTON EVENTS
let btnLeaderboard = document.getElementById('btnLeaderboard');
btnLeaderboard.onclick = () => {
  addScore(0);
  popups('leaderboard');
  game.popup = true;
  navmp3.play();
}
let btnControls = document.getElementById('btnControls');
btnControls.onclick = () => {
  popups('controls');
  game.popup = true;
  navmp3.play();
}
let btnHelp = document.getElementById('btnHelp');
btnHelp.onclick = () => {
  popups('help');
  game.popup = true;
  navmp3.play();
}
let btnCredits = document.getElementById('btnCredits');
btnCredits.onclick = () => {
  popups('credits');
  game.popup = true;
  navmp3.play();
}
let btnStart = document.getElementById('btnStart');
btnStart.onclick = () => {
  navmp3.play();
  menyChoose(0);
  btnStart.style.display = 'none';
  btnLeaderboard.style.display = 'none';
  btnControls.style.display = 'none';
  btnHelp.style.display = 'none';
  btnCredits.style.display = 'none';
}

let btnResume = document.getElementById('btnResume');
btnResume.onclick = () => {
  gamePause();
  navmp3.play();
}
let btnMute = document.getElementById('btnMute');
btnMute.onclick = () => {
  mute(btnMute);
  navmp3.play();
}
let btnPause = document.getElementById('btnPause');
btnPause.onclick = () => {
  gamePause();
  navmp3.play();
}
let btnRestart = document.getElementById('btnRestart');
btnRestart.onclick = () => {
  menyChoose(0);
  navmp3.play();
  if (isMobile) btnStart.style.display = 'none';
}
let btnClose = document.getElementsByClassName('btnClose');
for (var i = 0; i < btnClose.length; i++) {
  btnClose[i].onclick = () => {
    navmp3.play();
    menu();
    displayNone();
    game.popup = false;
  }
}
let btnQuit = document.getElementById('btnQuit');
btnQuit.onclick = () => {
  navmp3.play();
  gamePause();
  quit();
}

let btnHome = document.getElementById('btnHome');
btnHome.onclick = () => {
  game.popup = false;
  displayNone();
  quit();
};
function displayNone() {
  btnRestart.style.display = 'none';
  btnHome.style.display = 'none';
  document.getElementById('popup').style.display = 'none';
  document.getElementById('leaderboard').style.display = 'none';
  document.getElementById('controls').style.display = 'none';
  document.getElementById('help').style.display = 'none';
  document.getElementById('credits').style.display = 'none';
  document.getElementById('noneOverlay').style.backgroundColor = 'rgba(0,0,0,0)';
}
//// UI functions
function quit() {
  gameStarted = false;
  menu();
  if (isMobile) {
    btnStart.style.display = 'block';
    btnLeaderboard.style.display = 'block';
    btnControls.style.display = 'block';
    btnHelp.style.display = 'block';
    btnCredits.style.display = 'block';
    btnPause.style.display = 'none';
  }
  document.getElementById('leaderboardClose').style.display = 'block';
  displayNone();
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

// Music mute
let muted = false;
function mute(dom) {
  muted = dom.classList.toggle('muted');
}
//// MAIN MENU
function moveMenu(x,dir) {
  chooseMeny[x] = 0;
  navmp3.load();
  navmp3.play();
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
    console.log('Start Game');
    gameStarted = true;
    setTimeout(() => {
      document.getElementById('popup').style.display = 'none'
      document.getElementById('noneOverlay').style.backgroundColor = 'rgba(0,0,0,0)';
      bgwav.volume = bgVolume;
      bgwav.load();
      bgwav.play();
      game.init();
      detonate();
      draw();
      if (isMobile) {
        btnPause.style.display = 'block';
        setTimeout(() => btnPause.style.opacity = 0.3,3000)
      }
      document.getElementById('none').style.backgroundColor = 'black';
    },100);

  } else if (x == 1) {
    addScore(0);
    popups('leaderboard');
    game.popup = true;
  } else if (x == 2) {
    popups('controls');
    game.popup = true;
  } else if (x == 3) {
    popups('help');
    game.popup = true;
  } else {
    popups('credits');
    game.popup = true;
  }
}
let gameStarted = false;
let chooseMeny = [1,0,0,0,0];
function menu() {
  game.ctxUI.clearRect(0,0,game.canvasUI.width,game.canvasUI.height);
  game.ctxUI.drawImage(titleBg,0,0,188,300,30,30,game.canvasUI.width-50,game.canvasUI.height-50);
  game.ctxUI.drawImage(titleFrame,0,0,64,100,0,0,game.canvasUI.width,game.canvasUI.height);
  //document.getElementById('noneOverlay').style.backgroundColor = 'rgba(0,0,0,0)';
  if (!isMobile) {
    let titleX = game.canvas.width/2;
    let titleY = 110;
    game.ctxUI.drawImage(titleFrame,64,0 +(9*chooseMeny[0]),92,9,titleX,titleY,     165,20);
    game.ctxUI.drawImage(titleFrame,64,18+(9*chooseMeny[1]),92,9,titleX,titleY+30,  165,20);
    game.ctxUI.drawImage(titleFrame,64,36+(9*chooseMeny[2]),92,9,titleX,titleY+60,  165,20);
    game.ctxUI.drawImage(titleFrame,64,54+(9*chooseMeny[3]),92,9,titleX,titleY+90,  165,20);
    game.ctxUI.drawImage(titleFrame,64,72+(9*chooseMeny[4]),92,9,titleX,titleY+120, 165,20);
    let pointer = chooseMeny.indexOf(1);
    if (pointer !== -1) game.ctxUI.drawImage(titleFrame,64,90,5,7,titleX-20,titleY+(30*pointer)+2, 15,15);
  }
  if (!gameStarted) requestAnimationFrame(menu);
}
// POP UP!
function popups(id) {
  game.ctxUI.clearRect(0,0,game.canvasUI.width,game.canvasUI.height);
  game.ctxUI.drawImage(titleBg,0,0,188,300,30,30,game.canvasUI.width-50,game.canvasUI.height-50);
  game.ctxUI.drawImage(titleFrame,0,0,64,100,0,0,game.canvasUI.width,game.canvasUI.height);
  document.getElementById('noneOverlay').style.backgroundColor = 'rgba(0,0,0,0.8)';
  if (document.getElementById('popup').style.display !== 'flex') document.getElementById('popup').style.display = 'flex';
  if (document.getElementById(id).style.display !== 'block') document.getElementById(id).style.display = 'block';
  if (game.popup) requestAnimationFrame(() => popups(id));
}
// ADD SCORE TO LEADERBOARD
function addScore(value) {
  if (typeof(localStorage.score) == 'undefined') {
    localStorage.score = JSON.stringify(new Array());
  }
  let scores = JSON.parse(localStorage.score);
  let topScore = scores[0];
  if (value > 0) scores.push(value);
  scores.sort((a,b) => b - a);
  let max = 12;
  if (scores.length > max-1) scores.splice(max,1);
  document.getElementById('scores').innerHTML = '';
  for (let i = 0, len = scores.length; i < len; i++) {
    document.getElementById('scores').innerHTML += `<li>${scores[i]}</li>`;
  }
  localStorage.score = JSON.stringify(scores);
}
// GAME PAUSE MENU
function gamePause() {
  if (!game.bossAlive && !game.pause) {
    game.pause = true;
    bosswav.volume = 0;
    bgwav.volume = 0;
    document.getElementById('noneOverlay').style.backgroundColor = 'rgba(0,0,0,0.7)';
    document.getElementById('resumeGame').style.display = 'block';
    if (isMobile) btnPause.style.display = 'none';
  }
  else if (!game.bossAlive && game.pause) {
    game.pause = false;
    if (muted) {
      bosswav.volume = 0;
      bgwav.volume = 0;
    } else {
      bosswav.volume = 1;
      bgwav.volume = bgVolume;
    }
    document.getElementById('noneOverlay').style.backgroundColor = 'rgba(0,0,0,0)';
    document.getElementById('resumeGame').style.display = 'none';
    if (isMobile) btnPause.style.display = 'block';
    draw();
  }
}

// PAGE VISIBILITY API - Pause on tab out/unfocus
// Taken from moz-dev-page
// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
function handleVisibilityChange() {
  if (document.hidden) {
    if (gameStarted) gamePause();
  }
}
if (hidden !== 'undefined') document.addEventListener(visibilityChange, handleVisibilityChange, false);

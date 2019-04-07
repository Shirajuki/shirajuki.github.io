//// IMAGE LOADS
let loaded = 0;

let canvasBg = document.getElementById("bg");
let ctxBg = canvasBg.getContext("2d");
ctxBg.webkitImageSmoothingEnabled = false;
ctxBg.mozImageSmoothingEnabled = false;
ctxBg.imageSmoothingEnabled = false;
// Background
const bg = new Image();
bg.onload = () => {
    loaded++;
    checkLoaded();
};
bg.src = 'sky1.png';
let bg1Y = 0;
let bg2Y = 600;
let bgScrollSpeed = 3;
function drawBg() {
  bg1Y += bgScrollSpeed;
  bg2Y += bgScrollSpeed;
  if (bg1Y >= 595) bg1Y = -595;
  if (bg2Y >= 595) bg2Y = -595;
  //console.log(bg1Y,bg2Y)
  ctxBg.clearRect(0,0,canvasBg.width,canvasBg.height);
  ctxBg.drawImage(bg,0,0,canvas.width,canvas.height,0,bg1Y,canvas.width*3.35,canvas.height*4);
  ctxBg.drawImage(bg,0,0,canvas.width,canvas.height,0,bg2Y,canvas.width*3.35,canvas.height*4);
}

// Shots???
const sprite1 = new Image();
sprite1.onload =() => {
    loaded++;
    checkLoaded();
};
sprite1.src = 'sprite1.png';

// Laserbeam
const bluebeam = new Image();
bluebeam.onload = () => {
    loaded++;
    checkLoaded();
};
bluebeam.src = 'bluebeam.png';

// Animals (20/17x15)
const animals = new Image();
animals.onload = () => {
    loaded++;
    checkLoaded();
};
animals.src = 'animals.png';

// Items
const foods = new Image();
foods.onload = () => {
    loaded++;
    checkLoaded();
};
foods.src = 'goldfish.png';

// bigBossDogs
const bigDogs = new Image();
bigDogs.onload = () => {
    loaded++;
    checkLoaded();
};
bigDogs.src = 'sprite1.png';

function checkLoaded() {
  if (loaded == 6) {
    console.log(`Loaded total tilesets: ${loaded}`);
    draw();
  }
}

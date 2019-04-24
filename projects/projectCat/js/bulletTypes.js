//// BULLET TYPES
// Linear
function bullet1(arr,x,y,size,color,speed,dmg,img) {
  arr.push(new bulletC(x,y,size,size,color,0,speed,false,0,dmg,img));
}
// Double swing
function bullet2(arr,x,y,size,color,speed,dmg,img) {
  arr.push(new bulletC2(x,y,size,size,color,0,speed+2,true,0,dmg,img));
  arr.push(new bulletC2(x,y,size,size,color,0,speed+2,false,0,dmg,img));
}
// Double shottu
function bullet3(arr,x,y,size,color,speed,dmg,img) {
  arr.push(new bulletC(x-20,y+10,size,size,color,-1,speed,false,0,dmg,img));
  arr.push(new bulletC(x+20,y+10,size,size,color,1,speed,false,0,dmg,img));
}
// Double shottu 2
function bullet33(arr,x,y,size,color,speed,dmg,img) {
  arr.push(new bulletC(x-20,y+10,size,size,color,-2,speed,false,0,dmg,img));
  arr.push(new bulletC(x+20,y+10,size,size,color,2,speed,false,0,dmg,img));
}
// 3 forward - 3 back
function bullet4(arr,x,y,size,color,speed,dmg,img) {
  arr.push(new bulletC(x-20,y+10,size,size,color,-1,speed,false,0,dmg,img));
  arr.push(new bulletC(x,y,size,size,color,0,speed,false,0,dmg,img));
  arr.push(new bulletC(x+20,y+10,size,size,color,1,speed,false,0,dmg,img));

  arr.push(new bulletC(x-20,y+10,size,size,color,-1,-speed,false,0,dmg,img));
  arr.push(new bulletC(x,y,size,size,color,0,-speed,false,0,dmg,img));
  arr.push(new bulletC(x+20,y+10,size,size,color,1,-speed,false,0,dmg,img));
}
// Circle spread
function bullet5(arr,x,y,size,color,speed,dmg,img) {
  let antall = 14;
  let start = 0;
  let step = 2*Math.PI / antall;
  for (let i = 1; i <= antall; i++) {
    let angle = start + i * step;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    //arr.push(new bulletC(x,y,size,size,color,speed/2,speed));
    arr.push(new bulletC(x,y,size,size,color,vx,vy,false,0,dmg,img));
  }
}
// Circle spiral
function bullet6(arr,x,y,size,color,speed,end = 100,dir=0,img) {
  let j = 1;
  function f() {
    let antall = 20;
    let start = 0;
    let step = 2*Math.PI / antall;
    for (let i = 1; i <= antall; i++) {
      let angle = start + (j+i) * step;
      let vx = Math.cos(angle+2*j) * speed;
      let vy = Math.sin(angle+2*j) * speed;
      let r = 1;
      //arr.push(new bulletC(x,y,size,size,color,speed/2,speed));
      if (dir == 1) vx = -vx;
      arr.push(new bulletC6(x,y,size,size,color,vx,vy,false,0,0,img));
    }
    j++;
    if(j < end ){
        setTimeout(f, 300);
    }
  }
  f()
}
// Falling circle
function bullet7(arr,x,y,size,color,speed,end = 4,img) {
  let j = 1;
  function f() {
    let antall = 20;
    let start = 0;
    let step = 2*Math.PI / antall;
    for (let i = 1; i <= antall; i++) {
      let angle = start + (j+i) * step;
      let vx = Math.cos(angle+2*j) * speed;
      let vy = Math.sin(angle+2*j) * speed;
      let r = 1;
      //arr.push(new bulletC(x,y,size,size,color,speed/2,speed));
      arr.push(new bulletC7(x,y+(j*10),size,size,color,vx,vy,false,0,0,img));
    }
    j++;
    if(j < end ){
        setTimeout(f, 300);
    }
  }
  f()
}
// spiral circle
function bullet8(arr,x,y,size,color,speed,end = 4,img) {
  let j = 1;
  function f() {
    let antall = 20;
    let start = 0;
    let step = 2*Math.PI / antall;
    for (let i = 1; i <= antall; i++) {
      let angle = start + (j+i) * step;
      let vx = Math.cos(angle+2*j) * speed;
      let vy = Math.sin(angle+2*j) * speed;
      //arr.push(new bulletC(x,y,size,size,color,speed/2,speed));
      arr.push(new bulletC8(x,y+(j*10),size,size,color,vx,vy,false,0,0,img));
    }
    j++;
    if(j < end ){
        setTimeout(f, j*1);
    }
  }
  f()
}
// RAIN
function bullet9(arr,x,y,size,color,speed,end = 4,img) {
  let j = 1;
  let dir = 'left';
  end = 10;
  function f() {
    let antall = 20;
    let start = 0;
    dir = (dir == 'left') ? ('right') : ('left');
    let count = (dir == 'left') ? (antall) : (0);
    for (let i = antall; i >= 0; i--) {
      count--;
      if (dir !== 'left') count+=2;
      let rnd = getRndInteger(-5,5)
      setTimeout(() => arr.push(new bulletC9((i*20),y+(rnd*10),size,size,color,0,0,false,0,0)),count*100);
    }
    j++;
    if(j < end ){
        setTimeout(f, 3000);
    }
  }
  f()
}
// laserbeam go round and round
function circleBeam(arr,x,y,size,color,speed) {
  let j = 0;
  let end = 19;
  function f() {
    let antall = 1;
    for (let i = 1; i <= antall; i++) {
      arr.push(new circleBeamu(x,y,size,size,color,0,0,0,0,j));
    }
    console.log(j)
    j++;
    if(j < end ){
        setTimeout(f, 30);
    }
  }
  f()
}
// Beam
function beam(arr,x,y,size,color,speed, dmg,img) {
  arr[0] = new Beam(x-game.player.width,y,size,size,color, 0, 0, dmg,{set:bluebeam,sx:0,sy:0,sw:25,sh:100});
}

//// OTHERS
// Splatter
function splat(arr,antall,x,y,size=15,colorRange,speed,lifeTime) {
  let start = 0;
  let step = 2*Math.PI / antall;
  for (let i = 1; i <= antall; i++) {
    let angle = start + i * step;
    let vx = Math.cos(angle) * getRndInteger(1,4);
    let vy = Math.sin(angle) * getRndInteger(1,4);
    let rndSize = getRndInteger(size/1.5,size)/7;
    //let lifeTime = getRndInteger(5,15);
    let color = `rgb(${getRndInteger(colorRange[0],colorRange[1])},${getRndInteger(colorRange[0],colorRange[1])},${255})`;
    //arr.push(new bulletC(x,y,size,size,color,speed/2,speed));
    arr.push(new Splatter(x+10,y+10,8*rndSize,size*rndSize,color,vx,vy,false,0,lifeTime));
  }
}

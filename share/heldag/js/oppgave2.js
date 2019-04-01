// Deklarering av globale variabler
let slideshowCounter = 0;
let imageGallery, dotBox, divBox, videoBox;
const hytteInfo = [
  {navn:'Granstua', sengeplasser:'4', standard:'Middels', bilder: ['bilder/granstua/granstua01.jpg','bilder/granstua/granstua02.jpg','bilder/granstua/granstua03.jpg']},
  {navn:'Granbo', sengeplasser:'6', standard:'Lav', bilder: ['bilder/granbo/granbo01.jpg','bilder/granbo/granbo02.jpg','bilder/granbo/granbo03.jpg','bilder/granbo/granbo04.jpg']}
];
window.onload = function() {
  // Load av DOM-elementer
  imageGallery = document.getElementById('lightbox');
  divBox = document.getElementById('images');
  dotBox = document.getElementById('dotBox');
  videoBox = document.getElementById('videoBox');
  // Eventhandlers gitt ved anynomfunksjoner
  document.getElementById("granstua").onclick = () => lightbox(0);
  document.getElementById("granbo").onclick = () => lightbox(1);
  document.getElementById("kryss1").onclick = () => closeBox(imageGallery);
  document.getElementById("kryss2").onclick = () => closeBox(videoBox,1);
  document.getElementById('showVideo').onclick = () => showBox(videoBox,1);
  document.getElementById("knappForan").onclick = () => moveSlide(1);
  document.getElementById("knappTilbake").onclick = () => moveSlide(-1);
}
// Funsjon for å generere slideshow til respektive hytter
function lightbox(x) {
  // Sletter tidlige slides og dots om det allerede finnes
  while (dotBox.lastChild) dotBox.removeChild(dotBox.lastChild);
  let slides = document.getElementsByClassName('slides');
  while(slides[0]) slides[0].parentNode.removeChild(slides[0]);
  // Genererer bildeslides
  for (let i = 0; i < hytteInfo[x].bilder.length; i++) {
    let div = document.createElement('div'); // bildeboks
    let img = document.createElement('img'); // bilde
    let span = document.createElement('span'); // dot
    div.className = 'slides';
    img.src = hytteInfo[x].bilder[i]; // henter src fra array
    span.className = 'dot';
    span.value = i;
    span.onclick = function() {slide(this.value)};
    // Appender elementene til respektive parentNodes
    div.appendChild(img);
    divBox.appendChild(div);
    dotBox.appendChild(span);
  }
  // Skriver ut informasjon til hytte nr. x
  let hytteInfoKey = Object.keys(hytteInfo[x]);
  let hytteInfoValue = Object.values(hytteInfo[x]);
  let info = "";
  for (let i = 0; i < hytteInfoKey.length-1; i++) {
    info+= `${hytteInfoKey[i]}: ${hytteInfoValue[i]}<br/>`
  }
  document.getElementById('tekst').innerHTML = info;
  // Viser slideshow
  slide(0);
  showBox(imageGallery);
}
function showBox(dom, type=0) {
  dom.style.visibility = 'visible';
  dom.style.opacity = '1';
  if (type === 0) document.getElementById("main").style.display = "none";
}
function closeBox(dom, type=0) {
  dom.style.visibility = 'hidden';
  dom.style.opacity = '0';
  if (type === 0) document.getElementById("main").style.display = "block";
}
// Slideshow funksjoner
function moveSlide(x=1) {
  slideshowCounter += x;
  slide(slideshowCounter);
}
function slide(x) {
  let slides = document.getElementsByClassName("slides");
  slideshowCounter = x;
  if (slideshowCounter == slides.length) slideshowCounter = 0;
  else if (slideshowCounter == -1) slideshowCounter = slides.length-1;
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = "dot"
  }
  slides[slideshowCounter].style.display = "block";
  dots[slideshowCounter].classList.toggle("active");
}

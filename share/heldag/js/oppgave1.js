// Deklarering av globale variabler
let timer, tid;
const tider = [
  {tidstart: 10, tidslutt:16, makspris: 180},
  {tidstart: 16, tidslutt:20, makspris: 120}
];
window.onload = () => {
  // Events og load av DOM-elements
  document.getElementById("btn").onclick = beregn;
  let div = document.getElementById('divBox');
  tegnInputsTil(div);
  timer = document.getElementById('timer');
  tid = document.getElementsByName('tid');
  print('');
}
function tegnInputsTil(output) {
  for (let i = 0; i < tider.length; i++) {
    output.innerHTML += `
    <p>
      <input type='radio' name='tid' value='${tider[i].tidslutt-tider[i].tidstart}'> Kl. ${tider[i].tidstart} - ${tider[i].tidslutt}: Makspris: ${tider[i].makspris}kr
    </p>`;
  }
}
function print(x) {
  document.getElementById("output").innerHTML = x;
}
function beregn() {
  // Hente brukerinput-verdier
  let timerValue = parseInt(timer.value);
  let maksTidValue = 0;
  for (let i = 0; i < tid.length; i++) {
    if (tid[i].checked) maksTidValue = parseInt(tid[i].value);
  }
  let timepris = 50, pris = 0, avslag = 0, makspris = 0;
  // Kontrollsjekk for bruker-gitt input
  if (timerValue > maksTidValue || timerValue <= 0 || isNaN(timerValue)) {
    print('Feilmelding: Gitt timer må være heltall og over 0, man kan da også bare bestille innenfor valgt tidsperiode')
  } else { // Setter maks prisverdi fra valgt input
    if (maksTidValue == 6) {
      makspris = 180;
    } else {
      makspris = 120;
    }
    // Utregning av pris + evt. avslag
    pris = timepris*timerValue;
    if (pris > makspris) {
      avslag = pris-makspris;
      pris = pris-avslag;
    }
    print((avslag == 0) ? (`Pris: ${pris},-`) : (`Pris: ${pris},-<br/>Avslag: ${avslag},-`));
  }
}

// Deklarerer globale variabler
let table1, table2;
let hytte = [], hytteinfo = [];
let valgt = [];
let farger = ['red','yellow','green']

// Funksjoner for å resette applikasjonen
function resetValgt() {
  return [-1,-1];
}
function resetHytte() {
  let hytte = [
    {Hytte: '', Jul: '', Vinterferie: '', Påske: ''},
    {Hytte: 'Granstua', Jul: 'utleid', Vinterferie: 'ledig', Påske: 'ledig'},
    {Hytte: 'Granbo', Jul: 'ledig', Vinterferie: 'utleid', Påske: 'utleid'},
    {Hytte: 'Grantoppen', Jul: 'ledig', Vinterferie: 'ledig', Påske: 'utleid'},
    {Hytte: 'Granhaug', Jul: 'ledig', Vinterferie: 'utleid', Påske: 'utleid'}
  ];
  return hytte;
}
function resetInfo() {
  let hytteinfo = [
    {Hytte: '', Sengeplasser: '', Standard: '', Ukepris: '', Bilde: ''},
    {Hytte: 'Granstua', Sengeplasser: '4', Standard: 'Middels', Ukepris: '14 000', Bilde: 'bilder/meny/granstua.jpg'},
    {Hytte: 'Granbo', Sengeplasser: '6', Standard: 'Lav', Ukepris: '12 000', Bilde: 'bilder/meny/granbo.jpg'},
    {Hytte: 'Grantoppen', Sengeplasser: '8', Standard: 'Høy', Ukepris: '20 000', Bilde: 'bilder/meny/grantoppen.jpg'},
    {Hytte: 'Granhaug', Sengeplasser: '12', Standard: 'Høy', Ukepris: '28 000', Bilde: 'bilder/meny/granhaug.jpg'}
  ];
  return hytteinfo;
}
/* Oppstarts funksjon */
window.onload = () => {
  table1 = document.getElementById("table1");
  table2 = document.getElementById("table2");
  document.getElementById('btn').onclick = book;
  valgt = resetValgt();
  hytte = resetHytte();
  hytteinfo = resetInfo();
  drawTable(hytte,table1);
}
// Funksjon for å returnere respektive farger fra array til tabell ut fra hvor ledig hyttene er
function sjekkLedig(objArr,index) {
  let valgt = []; // lagerverdi
  for (let i = 1; i < objArr.length; i++) {
    let values = Object.values(objArr[i]); // Gjør om assosiativ array til vanlig liste
    valgt.push(values[index]);
  }
  let totaltAntall = objArr.length-1; // Maks antall hytter
  let antallLedig = 0; // Teller verdi for ledige hytter
  for (let i = 0; i < valgt.length; i++) {
    if (valgt[i] == 'ledig') antallLedig++;
  }
  // Betingelser for respektive farger
  let farge = '';
  if (antallLedig == totaltAntall) {
    farge = farger[2];
  }else if (antallLedig == 0) {
    farge = farger[0];
  }else {
    farge = farger[1];
  }
  return farge;
}
// Funksjon for å tegne tabell
function drawTable(objArr,output,type=0) {
  let keys = Object.keys(objArr[0]); // Gjøre om assosiativ array til vanlig liste
  for (let i = 0; i < objArr.length; i++) {
    let values = Object.values(objArr[i]); // Gjøre om assosiativ array til vanlig liste
    let tableRow = document.createElement('tr');
    for (let j = 0; j < values.length; j++) {
      // Lag enten table header eller vanlig celle
      let tableColumn = (i > 0) ? (document.createElement('td')) : (document.createElement('th'));
      tableColumn.innerHTML = (i > 0) ? (values[j]) : (keys[j].toUpperCase());
      if (j == objArr.length-1 && i > 0) tableColumn.innerHTML = `<img src="${values[j]}" width="150px">`;
      if (type == 0 && i == 0) {
        if (j > 0) {
          tableColumn.className = sjekkLedig(objArr,j);
        }
      }
      // Horizontal tabell
      if (type == 1 && i > 0) {
          tableColumn.id = i;
          tableColumn.className += ' td2';
      } else if (type == 0 && j > 0 && i > 0) { // Vertikal tabell
          tableColumn.id = j;
          tableColumn.className += ('td')
      }
      tableColumn.style.cursor = 'pointer';
      tableColumn.onclick = function() {visValg(this.id,this.className,type)}
      tableRow.appendChild(tableColumn);
    }
    if (type == 0) {
      output.appendChild(tableRow);
    }else {
      // printer ut hytter som er ledige og kan velges
      if (hytte[i][Object.keys(hytte[i])[valgt[0]]] == 'ledig' || i == 0) output.appendChild(tableRow);
    }
  }
}
function resetColor(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.backgroundColor = 'white';
  }
}
function reset(obj) {
  obj.innerHTML = '';
}
function visValg(id,className,type) {
  let nodes = document.getElementsByClassName(className);
  resetColor(nodes);
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id == id) nodes[i].style.backgroundColor = 'rgba(0,0,0,0.4)'
  }
  if (type == 1) {
    valgt[1] = id;
  }
  else {
    valgt[0] = id;
    resetInfo();
    reset(table2)
    drawTable(hytteinfo,table2,1);
  }
}
// Funksjon for å booke hytte
function book() {
  reset(table1);
  reset(table2);
  let i = parseInt(valgt[1]);
  // Kontrollsjekk
  if (i === -1) {
    drawTable(hytte,table1);
    return alert(`Velg en av hyttene i både tabell 1 og tabell 2 for å booke!`)
  }
  let j = Object.keys(hytte[i])[valgt[0]];
  hytte[i][j] = 'utleid';
  alert(`Du har booket hytta med navn: ${Object.values(hytte[i])[0]} i ${Object.keys(hytte[i])[valgt[0]]}!`)
  // Reloader tabellene
  drawTable(hytte,table1);
  valgt = resetValgt();
}

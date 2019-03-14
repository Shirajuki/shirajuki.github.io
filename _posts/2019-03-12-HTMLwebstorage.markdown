---
layout: posteses
title:  "HTML webstorage"
categories: blog/js
tags: [js]
description: "The Web Storage API, lagre verdier (bedre) enn bruk av cookies lokalt i nettleseren."
---

HTML webstorage
======
===

`sessionStorage` lagres i et annet lagringssted for tiden av et "page session" (så langt nettleseren er åpen: inkludert page reload/restore) (dataen slettes etter at nettleseren lukkes)

`localStorage` gjør de samme, men lagres fortsatt etter at nettleseren lukkes og åpnes (ingen utløpsdato)
Disse lagres dermed som en `object`

For å sjekke om nettleseren supporter localStorage og sessionStorage, kan vi bruke denne koden her:
```javascript
if (typeof(Storage) !== "undefined") {
  console.log('Webstorage support!')
} else {
  console.log('Ingen Webstorage her!')
}
```
Egenskaper og metoder:
```javascript
Storage.length // returnerer en int på antall element i lageren
Storage.key(n) // returnerer navnet til n-te index i lageren
Storage.getItem(kNavn) //returnere value
Storage.setItem(kNavn) //legger til navn
Storage.removeItem(kNavn) //Sletter navn
Storage.clear() //Tømmer alt i storage
```

localStorage/(sessionStorage) Object
------
---
```javascript
// 2 metoder som gir samme resultat
// Lagre
localStorage.setItem("fornavn", "Jonny");
localStorage.fornavn = "Jonny";
// Hent
var data = localStorage.getItem("fornavn");
var data = localStorage.fornavn;

// Slett
localStorage.removeItem("fornavn");
```

Siden webstorage kan bare lagre verdier i string format, må vi bruke JSON: `JSON.stringify()` og `JSON.parse()` når vi vil lagre arrays:
```javascript
var navn = ["Jonny"];

localStorage.setItem("fornavn", JSON.stringify(navn));
var data = JSON.parse(localStorage.getItem("fornavn"));
//eller
localStorage.fornavn = JSON.stringify(navn);
var data = JSON.parse(localStorage.fornavn);
```

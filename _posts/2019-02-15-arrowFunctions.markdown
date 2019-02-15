---
layout: posteses
title:  "Arrow Functions"
categories: js
description: "ES6 / ES2015 - En ny metode å skrive funksjoner på."
---
Arrow Functions
======
ES6 / ES2015
En ny metode å skrive funksjoner på. Lar deg dermed skrive funksjoner med mindre syntax:
Fra:
```javascript
const funksjon = function() {
  //...
}
// eller
function funksjon() {
  //...
}
```
til
```javascript
const funksjon = () => {
  //...
}
```
Eksempler:
```javascript
const funksjon = () => hendelse()

const funksjon = parameter => hendelse(parameter)

const funksjon = (parameter1, parameter2="test") => hendelse(parameter1,parameter2)
```
Implisitt `return` ved one line statements:
```javascript
const funksjon = () => 'test'
funksjon() //'test'
```
`this` på objektorienterte metoder er komplisert i pil funksjoner, og er derfor til dels ikke kompatibelt med det.
Bruk heller vanlige funksjoner.

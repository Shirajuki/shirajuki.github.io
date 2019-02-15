---
layout: posteses
title:  "Object.keys, values, entries"
categories: js
description: "ES6 / ES2015 - map,set,array"
---
Object.keys, values, entries
======

Object.keys(obj) – returns an array of keys.

Object.values(obj) – returns an array of values.

Object.entries(obj) – returns an array of [key, value] pairs.

```javascript
let user = {
  name: "John",
  age: 30
};
let keys = Object.keys(user); // ["name", "age"]
let values = Object.values(user); // ["John", 30]
let entries = Object.entries(user); // [ ["name","John"], ["age",30] ]
```

Map
------
---

Tenk det samme som objects:
```javascript
//Initialiseres:
const s = new Map()

//Legger til:
m.set('color', 'red')
m.set('age', 2)

//Henter verdi:
const color = m.get('color')
const age = m.get('age')

//Sjekker om verdi finnes:
const hasColor = m.has('color') //true || false

//Sletter:
m.delete('color')
m.clear()

//Lengden på map:
const size = m.size
```


Set
------
---

Object liste, med bare unike verdier, dvs. verdier kan ikke være lik hverandre.
Tenk at det er det samme som en `map`.
```javascript
//Initialiseres:
const s = new Set()

//Legger til:
s.add('one')
s.add('two')

//Sjekker om verdi finnes:
s.has('one') //true
s.has('three') //false

//Sletter:
s.delete('one')
s.clear()

//Lengden på set:
s.size
```

Array
------
---

Med arrayer brukes det vanlige array metoder:
```javascript
//Initialiseres:
const a = [1,2,3]

//Legger til:
a.push(4) //back
a.unshift(0) //front
a.fill(0)

//Sjekker om verdi finnes:
s.has('one') //true
s.has('three') //false

//Sletter:
a.pop() //back
a.shift() //front
a.splice(pos,1)

//Lengden på array:
a.length
```

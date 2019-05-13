---
layout: posteses
title:  "Google I/O '19 - JS(V8) update [CLASS]"
categories: blog/js
tags: [js]
description: "All hail the lord Google's new V8 ver, nytt i javascript siden 8.mai (Google I/O'19), spesielt om Objects/Class"
---

Tema: What's new in JavaScript (Google I/O '19) <br/> (Mest om OOP)
======
#### [VIDEOLENKE HER](https://www.youtube.com/watch?v=c0oy0vQKEZE)

## Endring av class

Man kan initalisere verdi uten `constructor()`
```javascript
// OLD
class Counter {
  constructor() {
    this._count = 0;
  }
  increment() {
    this._count++;
  }
}
// NEW
class Counter {
  this._count = 0;
  increment() {
    this._count++;
  }
}
```
Kan lett definere private variabel for objecter nå:
```javascript
class Counter {
  #count = 0;
  increment() {
    this.#count++;
  }
}
const counter = new Counter();
counter.#count; // - SyntaxError
counter.#count = 69; // - SyntaxError
```
Lettere extende classes med egne variabler uten `super()` og `constructor()`
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}
// OLD
class Cat extends Animal {
  constructor(name) {
    super(name);
    this.likesBaths = false;
  }
  meow() {
    console.log('Meow!')
  }
}
// NEW
class Cat extends Animal {
  this.likesBaths = false;
  meow() {
    console.log('Meow!')
  }
}
```

## Object.entries
```javascript
const object = {x: 20, y: 50};
const entries = Object.entries(object);
// - [['x',42],['y',50]]

// Brukes ofte i for...of - loop, for å iterere over en objekt
for (const [key, value] of entries) {
  console.log(`The value of ${key} is ${value}.`)
}
// Logs:
// The value of x is 20.
// The value of y is 50.

// Kan dermed gjøre entriesene om tilbake til objekt - NYTT
const result = Object.fromEntries(entries);
// - {x: 20, y: 50}
```

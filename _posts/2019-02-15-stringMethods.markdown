---
layout: posteses
title:  "String metoder"
categories: blog/js
tags: [js]
description: "ES6 / ES2015 - backtick strings"
---
String Methods
======

Template Literals
------
---

Bruk av backticks isteden for single eller double gåsetegn ('...') / ("..."):
```javascript
const string = `noe`
```
Hvorfor?

1.Multiline strings
------
---

For å ha en string over to linjer måtte man før i tiden bruke `\`

Dette render stringen uansett i én linje, man må da sette inn en newline `\n` om man ønsker det:
```javascript
const string =
  'første del \
andre del'
// 'første del andre del'

const string =
  'første linje\n \
andre linje'
//eller
const string = 'første linje\n' + 'andre linje'
```

Med backticks får man da:
```javascript
const string = `Hey
this
string
is awesome!`
//eller
const string = `
First
Second`.trim()
```

2.Interpolation
------
---

Det vil si at med backtick strings kan man sette variabel og metoder/funksjoner inn på en string med syntax `${...}`:
```javascript
const tekst = 'test'
const string = `something ${tekst}` //something test
//og
const string = `something ${1 + 2 + 3}` //something 6
const string2 = `something ${foo() ? 'x' : 'y'}`;

//dermed
let a = 10
let b = 5
const tekst = "Summen av "+a+" + "+b+" er "+(a+b); //Summen av 10 + 5 er 15
const tekst2 = `Summen av ${a} + ${b} = ${a+b}`; //Summen av 10 + 5 er 15
```

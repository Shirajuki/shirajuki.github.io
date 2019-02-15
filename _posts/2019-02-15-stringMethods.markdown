---
layout: posteses
title:  "String metoder"
categories: js
description: "ES6 / ES2015 - backtick strings"
---
String Methods
======

Template Literals
------
---

Bruk av backticks isteden for single / double gåsetegn '' / "":
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
const var = 'test'
const string = `something ${var}` //something test

const string = `something ${1 + 2 + 3}`
const string2 = `something ${foo() ? 'x' : 'y'}
```

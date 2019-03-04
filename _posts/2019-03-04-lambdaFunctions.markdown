---
layout: posteses
title:  "Lambda funksjon"
categories: blog/js
tags: [py]
description: "Equivalent to JS Arrow functions?"
---
Lambda funksjon
======

Syntax
------
---
`lambda arguments : expression`
```python
x = lambda a : a * 2
print(x(5)) #10

x = lambda a,b : a * b
print(x(5,2)) #10
```

Hvorfor?
------
---
Bør teknisk sett bare brukes som "1 use" funksjoner -> arrow funskjoner i javascript:
```javascript
const x = funksjon(a) {
  return a * 2
}
x(5) //10
const y= funksjon(a,b) {
  return a * b
}
y(5,2) //10

// eller

const x = a => a * 2
x(5) //10

const y = (a,b) => a * b
x(5,2) //10

// brukes:
let i = 0
let counter = setInterval(i => i+1 ,1000) // <--
```

---
layout: posteses
title:  "Console.log methods"
categories: blog/js
tags: [js]
description: "Tricks for debugging i javascript med hjelp av ulike console metoder"
---

console.log()
------
---

For å sjekke ulike variabler og muligens error i koden bruker vi ofte konsollen. Gjennom bruk av `console.log()` som de fleste vet, kan vi dermed skrive ut ulike variabler og objekter i konsollen for kontrollsjekk:

Hvordan kan vi bruke funksjonen på en mer effektiv måte, blir vist nedenfor:
```javascript
const foo = {navn: 'Jonny', kjonn: 'Gutt'};
const bar = {navn: 'isBoss', kjonn: 'Jente'};
console.log(foo); // > Object
console.log(bar); // > Object
// eller
console.log(foo,bar);
// Det vi får ut i konsollen er dermed bare verdiene, ikke variabel navnet.
```

Med bruk av `Computed Property Names` kan vi deretter sette variablene som objekt, og da dermed også få opp variabel navnet i konsollen:
```javascript
console.log({ foo, bar }); // > {foo: {}, bar: {}}
```

For å igjen få ut et finere utskrift i konsollen, kan vi også style det som vises i konsollen med CSS!
For eksempel, for å få utskrift som <span style="color: red;">Hello</span><span style="color: blue;"> World!</span>:
```javascript
console.log('%cHello','%cWorld','color: red;','color: blue;');
```

Men mange kan og har hørt om console.log(), det de ikke vet er at det finnes flere andre ulike metoder for console som:


console.table()
------
---
Logger array som tabeller:
```javascript
console.table([foo, bar])
```

| index | navn          | kjonn   |
| ----- | ------------- | ------- |
| 0     | "Jonny"       | "Gutt"  |
| 1     | "isBoss"      | "Jente" |

console.time()
------
---
Logger tiden brukt fra start til slutt, brukt innen performance test:
```javascript
console.time('loop') //egen definert navn som parameter
let i = 0;
while (i < 10000) { i++ }

console.timeEnd('loop')
```


console.trace()
------
---
Viser hvor f.eks funksjoner blir definert og callet:
```javascript
const sjekk = () => console.trace('sjekket!') // linje1
//linje 2
sjekk(); //linje 3
/*
Console:
> sjekket!
  sjekk @:1 // hvor funksjonen er definert
  sjekk @:3 // hvor funksjonen ble kjørt
*/
```

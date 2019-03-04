---
layout: posteses
title:  "List Comprehension"
categories: blog/py
tags: [py]
description: "'Phytonic' måte å iterere operatorer i en liste."
---
List Comprehension
======

List comprehensions er et mer konkret måte å lage liste med. Vanligvis for programmer som lager nye lister hvor hver element er et resultat av operatorer gitt `iterable`.

For eksempel, for å lage en liste av 2 gangern:

```python
liste = []
for i in range(11):
  liste.append(i*2)
print(liste) # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```
Vi kan deretter gjøre det samme med bruk av `map` og `lambda` funkjsoner:
```python
liste = list(map(lambda x: x*2, range(11)))
```
eller (best) med bruk av `List comprehensions`:
```python
liste = [x*2 for x in range(11)]
```

Hvorfor?
------
---
Med dette slipper man da å definere nye funksjoner, siden komplekse expressions og nestede funksjoner også funker for dette,

TL;DR: `CLEANier CODE`:
```python
from math import pi
liste = [str(round(pi, i)) for i in range(1, 6)]
print(liste) #['3.1', '3.14', '3.142', '3.1416', '3.14159']
```
```python
vec = [-4, -2, 0, 2, 4]
liste = [x for x in vec if x >= 0]
print(liste) #[0, 2, 4]
```
```python
vec = [[1,2,3], [4,5,6], [7,8,9]]
liste = [num for elem in vec for num in elem]
print(liste) #[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

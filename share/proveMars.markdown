---
layout: posteses
title:  "Repetisjon kap 7 - 8"
---
```python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 20 11:48:40 2019

@author: jolu0906
"""
# Importerer Pylab-biblioteket for å bruke pyplot, numpy og andre funksjoner.
import pylab as py

# Funksjon for å finne angitt tall tilnærmet fra en array
def finnTidspunkt(arr,T0):
    for index,T in enumerate(arr):
        if T > T0:
            return index
    return 0 # return indeks 0 om den ikke finner indeks til T0

#Program startintroduksjon
print('Python-program for å regne ut endringen av kroppstemperatur \
      ved hjelp av Newtons avkjøling. Og da også finne tidspunktet til \
      når døden inntraff hos en død person med en gitt kroppstemperatur \
      som er større eller ikke lik omgivelsestemperatur.')
run = True
while run:
    try: #Sjekker om bruker inputs verdi er tilstrekkelig/nok/evt. ingenting
        kroppsTemperatur = float(input('Gi input til kroppstemperaturen kroppen ble funnet i: '))
        omgivelsesTemperatur = float(input('Gi input til omgivelsestemperatur: '))
        if kroppsTemperatur <= omgivelsesTemperatur:
            print('Gitt feil verdi!\nPrøv igjen!')
            print()
        else:
            run = False
    except:
        print('Gitt feil verdi!\nPrøv igjen!')
        print()

#Tidssteg, timer til sekunder (1h = 3600s)
tids = 3600
dt = 1/tids

#Matriser
T = [0] # Kroppstemperatur
t = [0] # tid
Tder = [0] # Derivert av kroppstemperatur, brukt for newtons avkjølingslov + Eulers metode

#Initialbetingelser
T0 = omgivelsesTemperatur
T[0] = 37 # Vanlig kroppstemperatur som start verdi
t[0] = 0
k = -0.29 # Proporsjonalkonstant

# Eulers metode
index = 0
# Stopper ved brukerinputs kroppstemperatur til når kroppen ble funnet
while (T[index] > kroppsTemperatur):
    Tder.append(k*(T[index]-T0))
    T.append(T[index] + Tder[index]*dt)
    t.append(t[index] + dt)
    index += 1

# Plotting
py.plot(t,T,'b',t[index],T[index],'ro')
py.legend(['T(t)','tidspunkt'])
py.title('Kroppstemperatur som måles i kroppen i omgivelsestemperatur = {}'.format(omgivelsesTemperatur))
py.xlabel('Tid [h]')
py.ylabel('Temperatur [*C]')
py.grid(True)
py.show()
# Beregning på når døden inntraff gitt i timer og minutt gjennom gitt index
minutter = int(t[index]*60)
timer = int(minutter)//60
minutter = int(minutter-timer*60)
print('Tidspunktet for når døden inntraff er {} time og {} minutter.'.format(timer, minutter))

# Fin format tabell på print for hvert 30 minutt
print("\n\"Liste over kroppstemperatur og tidspunkt for hvert 30 minutt:\"")
print('+{:->8s}+{:->8s}+'.format("-","-"))
print('|{:^8s}|{:^8s}|'.format("t [min]","T [*C]"))
print('+{:->8s}+{:->8s}+'.format("-","-"))
# kjører for hvert 30 minutt, setter dermed loop x2
for i in range(int((index)/(tids/2))+1):
    minutt = 30*i
    timer = minutt//60
    minutt = (minutt//30)
    if minutt%2 == 0:
        minutt = 0
    else:
        minutt = 30
    index = finnTidspunkt(t,i/2)
    print('| {:02}:{:02}  |{:^8.2f}|'.format(timer,minutt,T[index]))
print('+{:->8s}+{:->8s}+'.format("-","-"))

'''
Newtons avkjølinglov: T'(t) = -k*(T(t)-T_0(t))

Hva jeg gjorde feil på:
Jeg hadde først og fremst misforstått oppgaveteksten og hva den spurte etter.
1. Misforsto oppgaven, visste ikke at liket ble funnet ved en brukerinput verdi,
trodde at kroppen ble fant når kroppstemperaturen var lik omgivelsestemp.
2. Satte ikke kroppstemperatur som bruker input siden jeg misforsto oppgaven
3. Rakk ikke å fikse en finere løsning på minutt telleren

For å komme frem til modellen blir naturligvis Eulers metode brukt for å da løse
difflikningne vi får fra Newtons Avkjøingslov.
For tidspunkt, finner jeg dermed når T nærmer seg T0 gjennom iterasjoner.
+
Iterasjonen kjøres dermed uendelig, stoppes når kroppstemperaturen er tilnærmet
lik funnet kroppstemperatur.
Print av for hvert 30 min blir dermed gjort ved formatering og funksjon for å
finne index.
'''
```

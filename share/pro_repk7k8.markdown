---
layout: posteses
title:  "Repetisjon kap 7 - 8"
---
```python
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 19 19:12:16 2019

@author: jolu0906
"""
from pylab import *
# Oppgave 7.1
def derivert(f,x,dx):
    return (f(x+dx) - f(x))/dx

def newtonsKvotient1():
    dx = 1E-8
    a = 2
    b = 5
    N = 10000
    funksjoner = ['2*x+1','x**2-4*x+5','exp(x)','exp(x)-5*x','6*sqrt(x)-x','5*exp(-2*x)','sqrt(log(x))','4*log(x**2)','4*5**(x**3 - 2*x)']
    #funksjoner = [funksjoner[0]]
    i = 0;
    def f(x):
        return eval(funksjoner[i])

    while i < len(funksjoner):
        x = linspace(a,b,N)
        y = derivert(f,x,dx)
        print(x,y)
        plot(x,y,label=funksjoner[i])
        i+=1
        legend()
    grid(True)
    show()
#newtonsKvotient1()

# Oppgave 7.2
def derivert2(f,x,dx=1E-8):
    return (f(x+dx) - f(x))/dx

# Oppgave 7.4
def partikkelPos():
    N = 10000
    start = 0
    slutt = 10
    dt = (slutt-start)/(N-1)
    t = linspace(start,slutt,N)
    def x(t):
        return t**3 + 1/3 * t
    s = x(t)
    v = derivert2(x,t)
    a = zeros(N)
    # Eulers metode
    for i in range(N-1):
        a[i+1] = (v[i+1] - v[i])/dt
    plot(t,s,t,v,t,a)
    legend(['s','v','a'])
    grid(True)
    show()
#partikkelPos()

# Oppgave 7.9
def temperaturTe():
    N = 1000
    start = 0
    slutt = 60
    t = linspace(start,slutt,N)

    def T(t):
        return 70*exp(-0.065*t)
    Tder = derivert2(T,t)
    plot(t,T(t),t,Tder)
    title('Temperatur i nylig lagd te etter t minutter')
    legend(['T(t)','Tder(t)'])
    grid(True)
    show()
#temperaturTe()

# Oppgave 7.11
def biologi():
    ## A ##
    N = 1000
    start = 0
    slutt = 100
    x = linspace(start,slutt,N)
    # Hvor stor bestand etter x år dyreart det er
    def f(x):
        return (100*x**2 + 1000)/(1.07*x**3 + 45)
    fder = derivert2(f,x)
    plot(x,f(x),x,fder)
    title('Hvor stor bestanden av en dyreart er etter x år i et avgrenset område')
    legend(['f(x)','f\'(x)'])
    grid(True)
    show()
    ## B ##
    ## Største verdi
    maxVerdi = max(fder)
    print(maxVerdi)
    ## C ##
    ## Index til den største verdi
    index = list(fder).index(maxVerdi)
    print(index)
#biologi()

# Oppgave 8.2
def diffLikning():
    N = 10
    a = 0
    b = 1

    dx = (b-a)/(N-1)
    x = linspace(a,b,N)
    f = zeros(N)
    f[0] = 0
    fderList = ['1','x[i]','4+3*f[i]','-4*f[i] - 3*x[i]','(3*x[i]**2 + 4*x[i] - f[i])/x[i]','x[i] + f[i]**2']
    #fderList = [fderList[0]]
    for j in range(len(fderList)):
        for i in range(N-1):
            fder = eval(fderList[j])
            f[i+1] = f[i] + fder*dx
        plot(x,f,label=fderList[j])
    legend()
    grid(True)
    show()
#diffLikning()

# Oppgave 8.5
def derIntgr():
    N = 1000
    a = 0
    b = 1
    dx = (b-a)/(N-1)
    x = linspace(a,b,N)
    def f(x):
        return x**2 + 2*x
    fder = derivert2(f,x)

    fIntgr = zeros(N)
    for i in range(N-1):
        fIntgr[i+1] = fIntgr[i] + fder[i+1]*dx

    plot(x,f(x),'r',x,fder,'b',x,fIntgr,'--')
    legend(['f(x)-ana','f\'(x)','f(x)'])
    grid(True)
    show()
#derIntgr()

# Oppgave 8.6
def skrivOmKode():
    N = 1000
    a = 0
    b = 1
    x = linspace(a,b,N)
    dx = x[1] - x[0]

    f = zeros(N)
    f[0] = 2
    for i in range(N-1):
        fder = 2*f[i]
        f[i+1] = f[i] + fder*dx
    plot(x,f)
    xlabel('x')
    ylabel('f(x)')
    title('Plott av f(x)')
    show()
#skrivOmKode()

# Oppgave 8.9
def kariPenger():
    N = 1000
    a = 0
    b = 15 # ÅR
    t = linspace(a,b,N)
    dt = (b-a)/(N-1)

    I = zeros(N) # Årsinntekt
    S = zeros(N) # Sparekonto kroner
    I[0] = 500000
    S[0] = 0
    for i in range(N-1):
        Ider = I[0] * log(1.006) * (1.006**t[i])
        Sder = 0.01 * I[i]
        I[i+1] = I[i] + Ider*dt
        S[i+1] = S[i] + Sder*dt

    plot(t,S)
    title('Karis sparekonto')
    xlabel('Tid/år')
    ylabel('kr')
    grid(True)
    show()
#kariPenger()

# Oppgave 8.16
def newtonAvkjoling():
    ## A ##
    N = 10000
    a = 0
    b = 30
    dt = (b-a)/(N-1)
    t = linspace(a,b,N)

    T = zeros(N)
    T[0] = 7
    for i in range(N-1):
        Tder = -0.16*(T[i]-20)
        T[i+1] = T[i] + Tder*dt
    ## B ##
    plot(t,T)
    grid(True)
    show()
    ## C ##
    for i in range(N-1):
        T0 = 5*cos(((pi**2)/15) * t[i]) + 19
        Tder = -0.16*(T[i]-T0)
        T[i+1] = T[i] + Tder*dt
    ## D ##
    plot(t,T)
    grid(True)
    show()
#newtonAvkjoling()

# Oppgave 8.19
def fuglX():
    ## A ##
    # sumF = ma => D = ma => a = D/m => a = 0.5/m
    ## B ##
    # Tid
    N = 1000
    a = 0
    b = 5
    dt = (b-a)/(N-1)
    t = linspace(a,b,N)
    # Init
    D = 0.5 # N
    m = 0.4 # kg
    v = zeros(N)
    s = zeros(N)
    v[0] = 22
    s[0] = 0
    # Euler-Cromer
    for i in range(N-1):
        a = D/m
        v[i+1] = v[i] + a*dt
        s[i+1] = s[i] + v[i+1]*dt
    ## C ##
    plot(t,s,t,v)
    legend(['s','v'])
    grid(True)
    show()
    ## D ##
    # L = -k(v(t)-w)**2
    # sumF = ma => D+L = ma => a = (D+L)/m => a = (-k(v(t)-w)**2 + D)/m
    ## E ##
    k = 0.083
    wList = [-5,0,10]
    for j,w in enumerate(wList):
        for i in range(N-1):
            L_vind = -k*(v[i] - w)**2
            a = (L_vind + D)/m
            v[i+1] = v[i] + a*dt
            s[i+1] = s[i] + v[i+1]*dt
        ## F ##
        subplot(3,1,(j+1))
        plot(t,s,t,v)
        legend(['s','v'])
        title('Fuglens fart og posisjon for w = {}'.format(w))
        grid(True)
        show()
        ## G ##
        # Mer vind hastighet gir mindre endring i v, s vil derfor holde oppe.
#fuglX()
```

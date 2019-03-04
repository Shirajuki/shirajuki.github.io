---
layout: posteses
title:  "Lambda funksjon"
categories: blog/js
tags: [py]
description: "Equivalent to JS Arrow functions?"
---
```python
# -*- coding: utf-8 -*-
"""
Created on Wed Jan 23 12:50:15 2019

@author: jolu0906
"""

from pylab import *

# Underveis oppgave 8.1
def underveis1():
    N = 100
    a = 0 #start
    b = 5 #slutt
    dx = (b-a)/(N-1) #steglengde
    f0 = 0 #initialbetingelse

    x = linspace(a,b,N) #x matrise med start- og slutt verdi
    f = zeros(N) #matrise som senere gir integral
    f[0] = f0

    for i in range(N-1):
        fder = 1
        f[i+1] = f[i]+fder*dx
    plot(x,f)
#underveis1()

# Underveis oppgave 8.2
def underveis2():
    N = 100
    a = 0 #start
    b = 10 #slutt
    dx = (b-a)/(N-1) #steglengde
    f0 = 0 #initialbetingelse

    x = linspace(a,b,N) #x matrise med start- og slutt verdi
    f = zeros(N) #matrise som senere gir integral
    f[0] = f0

    for i in range(N-1):
        fder = sin(x[i])-f[i]**3
        f[i+1] = f[i]+fder*dx
    plot(x,f)
#underveis2()

# Oppgave 8.1
'''
def funksjon(x):
    return funksjon

N = 100
a = -10 #start
b = 10 #slutt
dx = (b-a)/(N-1) #steglengde
f0 = 0 #initialbetingelse

x = linspace(a,b,N) #x matrise med start- og slutt verdi
f = zeros(N) #matrise som senere gir integral
f[0] = f0

EULERS METODE
for i in range(N-1):
    fder = funksjon(i)
    f[i+1] = f[i]+fder*dx
'''

# Oppgave 8.2
def start():
    oppg = 3 #skriv oppgavetall her!!
    N = 1000
    a = 0 #start
    b = 1 #slutt
    dx = (b-a)/(N-1) #steglengde
    f0 = 1 #initialbetingelse

    x = linspace(a,b,N)
    f = zeros(N)
    f[0] = f0
    fana = [1,1/2*x**2,4/3*e**(3*x)-4/3,1,1,1,1] #Gadd ikke å analytisere de andre :P
    for i in range(N-1):
        funksjon = [1,x[i],4+3*f[i],-4*f[i]-3*x[i],(3*x[i]**2 + 4*x[i]-f[i])/x[i],x[i]+f[i]**2]
        # i = 5 gir overflow, fordi: ikke innefor (-1.79769313486e+308, 1.79769313486e+308)
        funksjonn = ["1","x[i]","4+3*f[i]","-4*f[i]-3*x[i]","(3*x[i]**2 + 4*x[i]-f[i])/x[i]","x[i]+f[i]**2"]
        fder = funksjon[oppg]
        fderr = funksjonn[oppg]
        f[i+1] = f[i]+fder*dx
    clf()
    xlabel("x")
    ylabel("y")
    title("Differensiallikning: y' = {}".format(fderr))
    grid(True)
    plot(x,fana[oppg],"--",x,f)
#start()

# Oppgave 8.3
'''
Analytiske integralregning er ubestemte. Når vi jobber med numeriske regning,
trengs en initalbetingelse som bestemmer startverdien når vi integrerer.
Den blir bestemt*
'''
# Oppgave 8.5
def deriverIntegrer():
    def derivertSym(f,x,delta_x):
        fder = (f(x+delta_x) - f(x-delta_x))/(2*delta_x)
        return fder
    def ff(x):
        return x**2 + 2*x
    N = 100
    a = 0
    b = 10
    dx = (b-a)/(N-1)
    f0 = 0

    x = linspace(a,b,N)
    xy = derivertSym(ff,x,dx)
    f = zeros(N)
    f[0] = f0

    for i in range(N-1):
        fderr = xy[i]
        f[i+1] = f[i]+fderr*dx

    clf()
    xlabel("x")
    ylabel("y")
    title("Differensiallikning")
    grid(True)
    plot(x,ff(x),x,f)
    legend(["f(x)","integral av f'(x)"])
    show()
#deriverIntegrer()

# Oppgave 8.6
def fderLoopFix():
    N = 1000
    a = 0
    b = 1
    x = linspace(a,b,N)
    dx = x[1]-x[0]
    f = zeros(N)

    f[0] = 2
    for i in range(N-1):
        fder = 2*f[i]
        f[i+1] = f[i]+dx*fder
    plot(x,f)
    xlabel("x")
    ylabel("f(x)")
    title("Plott av f(x)")
    grid(True)
    show()
#fderLoopFix()

#Oppgave 8.8
from euler import eulersMetode
def yderrr(x,y):
    return -(x*y)/((x**2) + 1)
def oppgave():
    y,x = eulersMetode(yderrr,1,0,7,1000)
    def analytisk(x):
        return 1/sqrt(x**2 + 1)
    grid(True)
    plot(x,analytisk(x),x,y)
    legend(["Analytisk","Eulers Metode"])
    show()
#oppgave()

# Oppgave 8.9
def kari():
    N = 10000
    a = 0
    b = 15
    dx = (b-a)/(N-1)
    x = linspace(a,b,N)
    y0 = 500000
    y1,y2 = zeros(N),zeros(N)
    y1[0] = y0

    def Ider(t):
        return y1[0]*log(1.006)*1.006**x[t]
    def Sder(t):
        return 0.01 * y1[t]

    for i in range(N-1):
        fder1 = Ider(i)
        fder2 = Sder(i)
        y1[i+1] = y1[i]+fder1*dx
        y2[i+1] = y2[i]+fder2*dx
    plot(x,y2,label="S(t)")
    ylabel("kr")
    xlabel("t/år")
    grid(True)
    show()
#kari()

# Oppgave 8.10
from jonny import *
def tingFalle():
    # Fysiske størrelser
    g = 9.81 # tyngdeakselerasjonen i m/s^2
    m = 0.5 # masse i kg
    k = 0.2 # luftmotstandskoeffisienten i Nsm^-2
    # Tidsintervaller
    N = 10000 # antall intervaller
    tid = 10 # antall sekunder
    dt = tid/(N) # tidssteget
    # Matriser
    a,a2 = zeros(N),zeros(N) # akselerasjon i m/s^2
    v,v2 = zeros(N),zeros(N) # hastighet i m/s
    s,s2 = zeros(N),zeros(N) # posisjon i m
    t = zeros(N) # tid i s
    # Inititalbetingelser
    v[0],v2[0] = 0,0 # startfart 0 m/s
    s[0],s2[0] = 0,0 # startposisjon 0

    for i in range(N-1):
        a[i] = g - (k*v[i]*abs(v[i]))/m
        v[i+1] = v[i]+a[i]*dt
        s[i+1] = s[i]+v[i]*dt
        a2[i] = g
        v2[i+1] = v2[i]+a2[i]*dt
        s2[i+1] = s2[i]+v2[i]*dt

        t[i+1] = t[i] + dt

    #Plotting
    subplot(3,1,1)
    plot(t,a,'b-')
    title("Akselerasjon")
    xlabel("tid [s]")
    ylabel("akselerasjon [m/s^2]")

    subplot(3,1,2)
    plot(t,v,'r-')
    title("Hastighet")
    xlabel("tid [s]")
    ylabel("hastighet [m/s]")

    subplot(3,1,3)
    plot(t,s,'g-')
    title("Strekning")
    xlabel("tid [s]")
    ylabel("strekning [m]")

    tight_layout(w_pad=1)
    plt.subplots_adjust(bottom=1, right=1, top=2.3)
    show()
    subplot(3,1,1)
    plot(t,a2,'b-')
    title("Akselerasjon")
    xlabel("tid [s]")
    ylabel("akselerasjon [m/s^2]")

    subplot(3,1,2)
    plot(t,v2,'r-')
    title("Hastighet")
    xlabel("tid [s]")
    ylabel("hastighet [m/s]")

    subplot(3,1,3)
    plot(t,s2,'g-')
    title("Strekning")
    xlabel("tid [s]")
    ylabel("strekning [m]")

    tight_layout(w_pad=1)
    plt.subplots_adjust(bottom=1, right=1, top=2.3)
    show()
    print("\n\"Uten L\"")
    print('+{:->4s}+{:->8s}+{:->8s}+{:->8s}+'.format("-","-","-","-"))
    print('|{:^4s}|{:^8s}|{:^8s}|{:^8s}|'.format("t","a","v","s"))
    print('+{:->4s}+{:->8s}+{:->8s}+{:->8s}+'.format("-","-","-","-"))
    for i in range(tid):
        index = int((N/tid*i))
        print('|{:^4d}|{:^8.3f}|{:^8.3f}|{:^8.3f}|'.format(i+1,abs(a2[index]),abs(v2[index]),abs(s2[index])))
    print('+{:->4s}+{:->8s}+{:->8s}+{:->8s}+'.format("-","-","-","-"))
    print("\n\"Med L\"")
    print('+{:->4s}+{:->8s}+{:->8s}+{:->8s}+'.format("-","-","-","-"))
    print('|{:^4s}|{:^8s}|{:^8s}|{:^8s}|'.format("t","a","v","s"))
    print('+{:->4s}+{:->8s}+{:->8s}+{:->8s}+'.format("-","-","-","-"))
    for i in range(tid):
        index = int((N/tid*i))
        print('|{:^4d}|{:^8.3f}|{:^8.3f}|{:^8.3f}|'.format(i+1,abs(a[index]),abs(v[index]),abs(s[index])))
    print('+{:->4s}+{:->8s}+{:->8s}+{:->8s}+'.format("-","-","-","-"))
#tingFalle()

# Oppgave 8.11
def fiskepopulasjon():
    #Variabler
    N = 10000
    a = 0
    b = 10
    dt = (b-a)/N-1

    t = zeros(N) #/ år
    F = zeros(N) #fisk
    Fder = zeros(N)

    F[0] = 1000; #Fisk / time
    t[0] = 0
    k = 0.65 #reproduksjonsrate (stigning)
    be = 5400 #Bæreevne (max)

    #Eulers metode
    for i in range(N-1):
        Fder[i] = k*F[i] * (1 - F[i]/be) #y' = k * y * (1-(y/b))
        F[i+1] = F[i] + Fder[i]*dt
        t[i+1] = t[i] + dt

    #plot
    plot(t,F)
    title("Fiskepopulasjon")
    xlabel("Tid (år)")
    ylabel("Antall fisk")
    grid(True)
    show()
#fiskepopulasjon()

# Oppgave 8.12
def menneskepopulasjon():
    #Variabler
    N = 10000
    a = 2019
    b = 2519
    dt = (b-a)/(N-1)

    t = zeros(N) #/år
    M = zeros(N) #mennsker
    Mder = zeros(N)

    M[0] = 7E9
    t[0] = 0
    k = 0.0114 #reproduksjonsrate
    be = 10E9 #Bæreevne

    #Eulers Metode
    for i in range(N-1):
        Mder[i] = k*M[i]* (1-(M[i]/be))
        M[i+1] = M[i] + Mder[i]*dt
        t[i+1] = t[i] + dt
    #Plot
    plot(t,M)
    title("Menneskepopulasjon fra {} til {}".format(a,b))
    xlabel("Tid (år)")
    ylabel("Antall fisk")
    grid(True)
    show()
#menneskepopulasjon()

# Oppgave 8.13
def harepopulasjon(): ## Forstår ikke :D Sin/Cos/Tan funksjoner? Dobbel diff (y'') ?
    #Variabler
    N = 10000
    a = 0
    b = 10
    dt = (b-a)/(N-1)

    #Matriser
    t = zeros(N)
    H = zeros(N)
    Hder = zeros(N)

    #y' = k*y*(1-(y/be)) - y*n

    #Initalbetingelser
    H[0] = 1E3 #antall harer start
    k = 0.36 #reproduksjonsevne
    be = 1E4 #bæreevne
    #n = sin(t) #nedgangsrate varierer på årstall ???

    #Eulers metode
    for i in range(N-1):
        Hder[i] = k*H[i]*(1-(H[i]/be)) - H[i]*sin(radians(i)) #eksponensiell funk
        #print(???)
        H[i+1] = H[i] + Hder[i]*dt
        t[i+1] = t[i] + dt
    #Plot
    plot(t,H)
    title("Harepopulasjon med nedgangsrate variert med årstall")
    xlabel("tid (år)")
    ylabel("Antall harer")
    grid(True)
    show()
#harepopulasjon()

# Oppgave 8.14
def hareGaupePopulasjon():
    #Tidssteg
    N = 100000
    start = 0
    slutt = 400
    dt = (slutt-start)/(N-1)

    #Matriser
    t = zeros(N)
    H = zeros(N)
    G = zeros(N)

    #Initialbetingelser
    H[0] = 2000
    G[0] = 10
    t[0] = 0
    a = 0.1 #reproduksjonsevne
    b = 10000 #bæreevne
    c = 0.005 #hare-gaupe møterate - Forhold til artene
    d = 0.00005 #hare-gaupe møterate 2 - forhold til artene
    e = 0.06 #Nedgangsrate for gauper

    f = 0.05 #Aldersrate for harer
    g = 0.02 #Aldersrate for gauper

    #Eulers metode
    for i in range(N-1):
        Hder = a*H[i]*(1 - H[i]/b) - c*H[i]*G[i] - f*H[i]
        Gder = d*H[i]*G[i] - e*G[i] - g*G[i]
        H[i+1] = H[i] + Hder*dt
        G[i+1] = G[i] + Gder*dt
        t[i+1] = t[i] + dt

    #Plotting
    ax = figure().add_subplot(111)
    data1 = ax.plot(t,H,"-b")
    ax2 = ax.twinx()
    data2 = ax2.plot(t,G,"-r")
    ax.legend(data1+data2,["Harer","Gauper"])
    title("Vekst i hare- og gaupepopulasjon")

    ax.set_xlabel("t (måneder)")
    ax.set_ylabel("H (Antall Harer)")
    ax2.set_ylabel("G (Antall Gauper5)")
    ax2.set_ylim(0,30)
    ax.set_ylim(0,3000)
    ax.grid(True)
    show()
#hareGaupePopulasjon()

# Oppgave 8.16
def newtonsAvkjolinglov():
    #Tidssteg
    N = 10000
    start = 0
    slutt = 30
    dt = (slutt-start)/(N-1)

    #Matriser
    t = zeros(N)
    T = zeros(N)
    T0 = 0
    Tder = 0

    #Initialbetingelser
    T[0] = 7
    t[0] = 0

    #T'(t) = -k*(T(t)-T_0(t))
    '''A'''
    #Eulers metode
    for i in range(N-1):
        Tder = -0.16*(T[i] - 20)
        T[i+1] = T[i] + Tder*dt
        t[i+1] = t[i] + dt
    '''B'''
    plot(t,T)
    '''C'''
    for i in range(N-1):
        Tder = -0.16*(T[i] - T0)
        #Tder = -0.16*(T[i] - 20)
        T0 = 5 * cos(((math.pi**2)/15) * i) + 19
        T[i+1] = T[i] + Tder*dt
    plot(t,T)
    title("Newtons avkjøling, varmeanlegg i en bil")
    legend(["Ødelagt","Mer ødelagt"])
    xlabel("Tid")
    ylabel("Temperatur [*C]")
    grid(True)
    show()
#newtonsAvkjolinglov()

# Oppgave 8.17
def familiemiddag():
    #Tidssteg
    N = 10000
    start = 0
    slutt = 4
    dt = (slutt-start)/(N-1)

    #Matriser
    t = zeros(N)
    T = zeros(N)
    T0 = 0
    Tder = 0
    a = zeros(N)
    v = zeros(N)

    #Initialbetingelser
    T[0] = 0
    t[0] = 0

    #T'(t) = -k*(T(t)-T_0(t))

    #Eulers metode
    for i in range(N-1):
        p = uniform(1,2)
        T0 = 35 * log(v[i]+1) + 0.4*v[i]*sin(2*pi*p*t[i]) + 37.7
        Tder = -4*(T[i] - T0)
        T[i+1] = T[i] + Tder*dt
        t[i+1] = t[i] + dt
        a = 2000*exp(-500*t[i]**2)
        v[i+1] = v[i]+a*dt

    plot(t,T)
    title("Kalkunens temperatur under panseret")
    xlabel("Tid")
    ylabel("Temperatur [*C]")
    grid(True)
    show()
#familiemiddag()

# Oppgave 8.18
def diffLikningFiks():
    N = 1000
    a = 0 #startposisjon
    b = 10 #endposisjon
    dt = (b-a)/(N-1)

    '''
    # Matriser
    x = zeros(N)
    y = zeros(N)

    #Eulers method
    for i in range(N-1):
        vx = 0.5*x[i]
        vy = 0.5*y[i]
        x[i+1] = x[i]+dt*vx
        y[i+1] = y[i]+dt*vy
    '''

    xy = zeros([N,2])
    xy[0][0] = 0
    xy[0][1] = 0
    for i in range(N-1):
        v = 0.5*xy[i]
        xy[i+1] = xy[i] + dt*v
    print(xy[:5])
#diffLikningFiks()

# Oppgave 8.19
def fugl():
    D = 0.5 #N
    ## A #
    '''
    sum F_x = ma_x
    D = ma_x
    a_x = D/m

    a = 0.5/m
    '''
    N = 1000
    a = 0
    b = 5
    dt = (b-a)/(N-1)
    m = 0.4 #kg

    v = zeros(N)
    s = zeros(N)
    t = zeros(N)
    v[0] = 22 #m/s
    s[0] = 0

    '''
    ## B #
    # Eulers method
    for i in range(N-1):
        a = D/m
        v[i+1] = v[i] + dt*a
        s[i+1] = s[i] + dt*v[i+1]
        t[i+1] = t[i] + dt

    ## C #
    subplot(2,1,1)
        title("Strekning")
        xlabel("Tid [s]")
        ylabel("Strekning [m]")
        plot(t,s,'r')
        grid(True)

        subplot(2,1,2)
        title("Fart")
        xlabel("Tid [s]")
        ylabel("Fart [m/s]")
        plot(t,v,'r')
        grid(True)

        tight_layout(w_pad=5)
        show()
    '''

    ## D #
    '''
    L = -k(v(t)-w)^2
    sum F_x = ma_x
    D + L = ma_x
    a_x = (D+L)/m

    a = 0.5-k*(v(t) - w)^2/m
    '''

    ## E #
    k = 0.083
    w = [-5,0,10]
    def EulersMetode(t,s,v,w):
        for i in range(N-1):
            a = D-k*((v[i]-w)**2)/m
            v[i+1] = v[i] + dt*a
            s[i+1] = s[i] + dt*v[i+1]
            t[i+1] = t[i] + dt
        tegnPlot(t,s,v)

    def tegnPlot(x1,y1,y2):
        clf()
        subplot(2,1,1)
        title("Strekning")
        xlabel("Tid [s]")
        ylabel("Strekning [m]")
        plot(t,y1,'r')
        grid(True)

        subplot(2,1,2)
        title("Fart")
        xlabel("Tid [s]")
        ylabel("Fart [m/s]")
        plot(t,y2,'r')
        grid(True)

        tight_layout(w_pad=5)
        show()

    for i in w:
        EulersMetode(t,s,v,i)
#fugl()

# Oppgave 8.20
def pendel():
    N = 1000
    a = 0
    b = 1
    dt = (b-a)/(N-1)

    #Matriser
    t = linspace(a,b,N)
    w = zeros(N)
    theta = zeros(N)
    theta0 = pi/10
    theta[0] = theta0
    g = 9.81
    L = 0.5 # [m]

    x = zeros(N)
    y = zeros(N)

    # Eulers metode
    for i in range(N-1):
        wDer = -(g/L) * (theta[i])
        thetaDer = w[i]
        w[i+1] = w[i] + wDer*dt
        theta[i+1] = theta[i] + thetaDer*dt

        #x[i+1] = x[i] + L*sin(theta[i])*dt
        #y[i+1] = y[i] - L*sin(theta[i])*dt
    x = L*sin(theta)
    y = -L*cos(theta)
    # Utrykk
    thetaUttrykk = [theta0 * cos(sqrt((g/L))*x) for x in t]
    xx = L*sin(thetaUttrykk)
    yy = -L*cos(thetaUttrykk)

    #Plotting
    plot(x,y)
    plot(xx,yy,'r--')
    grid(True)
    show()
pendel()
```

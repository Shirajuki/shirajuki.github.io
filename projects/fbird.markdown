---
layout: posteses
title:  "Flappybird - AI???"
---
```python
# -*- coding: utf-8 -*-
"""
Created on Wed Jan 23 12:50:15 2019

@author: jolu0906
"""
import pygame as pg
import pylab as pl
#Initialize pygame
pg.init()
clock = pg.time.Clock()
pg.display.set_caption("JonnyIsBoss")
pg.font.init()

width, height = 600, 400
screen = pg.display.set_mode((width,height))
WHITE = 255, 255, 255
BLACK = 0, 0, 0
RED = 255, 0, 0
GREEN = 0, 200, 0
myfont = pg.font.SysFont('Comic Sans MS', 14)

# Global variables
w = 50 # Width pipe
gap = 100 # Gap pipe x
door = 120 # Gap pipe y
max_height = 50

class obstacle():
    def __init__(self, x, y, h, y2, h2):
        self.x = x
        self.y = y
        self.h = h
        self.k = True
        self.y2 = y2
        self.h2 = h2
    def draw(self):
        pg.draw.rect(screen, GREEN, (self.x, self.y, w, self.h), 0)
        pg.draw.rect(screen, GREEN, (self.x, self.y2, w, self.h2), 0)

class character():
    def __init__(self, x, y, size, distance, ranged):
        self.x = x
        self.y = y
        self.size = size
        self.speed = 0
        self.dead = False
        self.jump = False
        self.lookDistance = distance
        self.pipeRange = ranged
    def draw(self):
        pg.draw.rect(screen, RED, (self.x, self.y, self.size, self.size), 0)

#Bird list
def createBird(n,startDistance,startRanged,look=20):
    players = []
    for i in range(n):
        distance, ranged = 0,0
        if startDistance == 0:
            distance = pl.randint(-look,look) * pl.uniform(-2,2)
            ranged = pl.randint(-look,look) * pl.uniform(-2,2)
        else:
            ranged = startRanged * pl.uniform(-2,2)
            distance = startDistance * pl.uniform(-2,2)
        if (i == 0):
            players.append(character(width/4, height/2, 20, startDistance, startRanged))
        else:
            players.append(character(width/4, height/2, 20, distance, ranged))
    return players

players = createBird(100,0,0)
#players = createBird(100,4.829852862102945,-1.1365292896447063)
#players = createBird(100,5.644755204819829,0.0)

#Pipe list
def createObstacles():
    obstacles = []
    x0, y0, h = width/4 + w + gap, 0, 0
    while x0 < width*2: #Draw obstacles after each
        h = pl.randint(max_height, height - door - max_height)
        obstacles.append(obstacle(x0, y0, h, y0 + h + door, height - h))
        x0 += w + gap
    return obstacles
obstacles = createObstacles()

#Count variables
kill = False
one,two = 0,0
scoreMax = 0 #check score max
runTime = 0 #check how many time it run with same gen
maxError = 20
score = 0
speed = 2
fps = 200
running = True
while running:
    clock.tick(fps)
    for e in pg.event.get():
        if e.type == pg.QUIT:
            running = False

        if e.type == pg.KEYUP:
            if e.key == pg.K_LEFT:
                kill = True
                pl.time.sleep(2)
                running = False

    screen.fill(WHITE)
    #Loop pipes
    for e in obstacles:
        if (e.x + w) <= 0:
            h = pl.randint(max_height, height - door - max_height)
            e.x = (w + gap)*len(obstacles) - w
            e.y2 = e.y + h + door
            e.h = h
            e.h2 = height-h
            e.k = True
            #Reset pipe to start
        if (e.x - width/4) <= 0 and e.k and e.y == 0:
            e.k = False
            #Pipe check turn of
            score += 1
            print(score)
        #Speed of pipes
        e.x -= speed
        e.draw()
        #Hit detection
        for p in players:
            #Detection here:
            if ((p.x + p.size) > e.x and p.x < e.x + w\
            and p.y + p.size > e.y and p.y < e.y + e.h) or \
            ((p.x + p.size) > e.x and p.x < e.x + w\
            and p.y + p.size > e.y2 and p.y < e.y2 + e.h2) or \
            (p.y <= 0 or (p.y + p.size) >= height):
                p.dead = True
            #'''    
            if e.x in range(int(width/4 - w - p.pipeRange), int(width/4 + gap + p.pipeRange)) and \
            p.y > (e.h + door - p.size - p.lookDistance):
                #p.speed = -5
                p.jump = True
            #'''
    fil = open('jonny.txt','a+') #write
    for p in players:
        if p.jump:
            p.speed = -5
            p.jump = False
        a = 9.81/60
        p.speed += a
        p.y += p.speed
        if p.dead:
            players.remove(p)
        p.draw()
        if len(players) == 1 or kill:
            #or runTime >= maxError
            if score >= scoreMax:
                scoreMax = score
                print("ScoreMAX",scoreMax)
                fil.write('{} {} \n'.format(p.lookDistance, p.pipeRange))
                fil.close()
            else:
                runTime+=1
                if runTime%100 == 0:
                    fil.write('{} {} \n'.format(p.lookDistance, p.pipeRange))
                    fil.close()
                #print("RUN",runTime)
            ##restart
            score = 0
            fil = open('jonny.txt','r') #read
            data = fil.read().split()
            one,two = float(data[-2]),float(data[-1])
            players = createBird(100,float(data[-2]),float(data[-1]))
            obstacles = createObstacles()
            fil.close()
    textsurface = myfont.render("Score: {} _ScoreMax: {} _Detail: {} , {} _Run: {}".format(score,scoreMax,round(one,4),round(two,4),runTime), True, BLACK)
    screen.blit(textsurface,(0,0))
    pg.display.update()
pg.quit()
```

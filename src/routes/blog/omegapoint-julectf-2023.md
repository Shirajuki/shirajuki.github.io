---
title: "Omegapoint Norway's JuleCTF 2023: Organizational review"
date: '2024-01-17'
category: 'writeup'
description: "Following the success of our internal security Capture The Flag competition held in October, I was once again entrusted with organizing a Capture the Flag event for Omegapoint. However, this time, it was designed to be open externally for everyone!"
tags:
  - 'omegapoint-ctf'
  - 'ctf'
---

## Introduction

Following the success of our internal security Capture The Flag competition held in October, I was once again entrusted with organizing a Capture the Flag event. However, this time, it was designed to be open externally for everyone!

> At Omegapoint Norway, we are passionate about building security in every aspect of our work. Security is not just an optional feature; it is ingrained in our development philosophy. We firmly believe in the "secure by design" approach, embedding security measures into the code's foundation. To share and spread this belief and knowledge, we decided to host Omegapoint Norway's first Christmas-themed Capture The Flag (CTF) challenge where the participants could put their cybersecurity skills to the test and compete for exciting prizes.

The competition was designed as an advent calendar tailored for developers and pentesters, following to the traditional Capture The Flag format while incorporating additional elements aimed at making it similar to an advent calendar. This approach allowed participants to fully embrace the holiday spirit while engaging in the coming challenges.

Scheduled from December 3rd to December 31st, the event released a set of two challenges every Sunday of Advent. Initially, these challenges were worth 2 points within the first 72 hours of release. After this period, if solved, they are decreased to only give out 1 point. Additionally, a rule was introduced to heighten the challenge’s excitement where achieving the first successful solution, also known as first-blood, would earn you an additional point as well.

With the rules set, the participants aimed to solve as many challenges as possible from the advent calendar hosted at http://julectf.omegapoint.no. Even after the event’s conclusion, the challenges remain accessible for at least a couple of weeks for those interested in experimenting further. The winners were eligible for the following prizes:

- 1st place: ZSA Voyager worth 5000 NOK
- 2nd - 5th place: 2x Yubico YubiKey 5C each

Moreover, three random lucky participants were chosen to receive Omegapoint merchandise as additional prizes.

![The awesome prize pool](https://hackmd.io/_uploads/ByTrjMh_a.jpg)


## Statistics

It was awesome to have a total of 126 users join us, a number that I’d argue isn’t too shabby for our first CTF held externally. Among these participants, 18 successfully managed to solve at least one challenge, and an impressive 4 individuals solving every single challenge. It was incredibly amazing to witness the engagement of hundreds of participants with our advent calendar, all showcasing superb efforts.

![Statistics: total solve count by challenges](https://hackmd.io/_uploads/rJbXhfhO6.png)
![Statistics: score distribution and solve percentages per challenges](https://hackmd.io/_uploads/Sk542Gh_6.png)

While the feedback from our community has been overwhelmingly positive and incredibly valuable, the ratio of solutions to the total registered users suggests that for an advent calendar with limited time, the challenges might have been somewhat too challenging for some participants. Despite this observation, it was fascinating to witness some of the participants showcasing diverse techniques and openly sharing solutions and writeups on the Discord server that was set up for this occasion.

There were a total of 8 challenges ranging in difficulty from easy to medium, offering a maximum of 16 points. The set of challenges included problems in various domains like reverse engineering, cryptography, web security, and forensics. The skill level demonstrated by the participants was truly remarkable, reflecting significant effort and hard work put into solving these challenges.

![The final scoreboard](https://hackmd.io/_uploads/r11osG3dT.png)


## Infrastructure

### CTFd
For hosting a successful CTF, the foundation lies in having well-crafted challenges and, notably, a dependable CTF platform. There are several options available for such CTF platforms, including [CTFd](https://github.com/CTFd/CTFd), [rCTF](https://github.com/redpwn/rctf), and [RACTF](https://github.com/ractf/core). After careful consideration of the several options, CTFd was chosen, recognized as the most widely used and popular platform to date. The decision was influenced by its user-friendly interface during local testing and its robust support, including its theming and plugin engine.

> It is a known problem that CTF competitions using CTFd is prone to easily crash either at the start of the competition or under heavy user traffic due to its disproportionate amount of resource consumption in relation to the amount of connections. Load balancers are therefore a necessity if one plans to host CTF competition catering to thousands of users. Fortunately, in our case, dealing with hundreds of participants, this was not a significant concern.

The CTFd platform was configured for self-hosting using Azure VM and Docker. I opted for a straightforward default setup equipped with 2 workers, which thankfully proved sufficient to manage the participation of all the hundred participants that were registered.

![The homepage on the CTFd platform](https://hackmd.io/_uploads/Sy3ujGndT.png)

To infuse a cozy Christmas-themed feeling into our platform, a custom theme derived from the core base theme of CTFd were developed, involving significant visual changes to the user interface. This tailored customization aimed to make the platform resemble an advent calendar while aligning with our established design guidelines. Alongside this, a custom “Scoring & Achievements” feature were developed as a plugin to complement our custom scoring logic and contribute to keeping the participant engaged throughout the competition.

![The list over all the challenges](https://hackmd.io/_uploads/Bkz3nGn_6.png)

![An example of a challenge, detailed](https://hackmd.io/_uploads/ByBvNEhOT.png)



### Azure VM
Azure VMs served as the hosting environment for both the CTFd platform and the challenges, facilitated through Docker and docker-compose files. This approach was chosen to attain complete control and granular oversight over the infrastructure. However, this approach demanded a certain level of manual labor in configuring the infrastructure, deploying challenges, and managing the server. Since the given the time constraints, extensive planning and setup weren’t feasible, I opted for a straightforward approach, handling most tasks manually via a VPS due to its simplicity and speed.

> Adjustments were made to the Network Security Group (NSG) to allow inbound traffic on designated ports required for the CTFd platform and challenge functionalities (e.g., HTTP/HTTPS ports, SSH).

An enhancement for a future work would be the integration of an infrastructure as code approach. Utilizing tools like Bicep deployment scripts, Ansible or Terraform would streamline a future infrastructure setup, offering better scalability, reproducibility, and simplify the maintenance for upcoming CTF competitions.

### Nginx
> IP-based Rate Limiting ❤️

Nginx played a critical role in the CTF setup this time, extensively used both on the platform and within the web challenges for its feature of IP-based rate limiting rule. This feature made it possible to restrict clients to a specified number of requests within a designated timeframe. As the setup was entirely manual via a VM, Nginx served additional purposes, such as domain configuration and reverse proxy, effectively routing the user traffic to different backend servers based on some set of rules.

These tailored Nginx configurations proved immensely beneficial, significantly contributing to protecting the platform and the web challenges from excessive loads.

## Closing Thoughts

Reflecting on the CTF with the overwhelmingly positive feedback received, I am truly thrilled with how the competition turned out. While the infrastructure isn’t flawless, it certainly served its purpose. Looking ahead, I am determined to improve it further by implementing a CI/CD pipeline for a more streamlined challenge deployment process as well as considering Infrastructure as Code (IaC) integration for enhanced scalability and management down the line. Overall, the entire process has been incredibly enlightening and enjoyable.

Thank you for reading!

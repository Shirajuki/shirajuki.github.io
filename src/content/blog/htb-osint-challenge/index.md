---
title: "Writeup: [HTB] OSINT CHALLENGE TIME by @sinfulz!"
description: "The challenge description is: Yummy Crusty Pizza have been working on their secret recipe for over two decades, serving only the best pizza in the city. A hacker recently broke into their OLD database and dumped their recipe online, can you retrieve it?"
pubDate: "Feb 28 2021"
heroImage: "/banner/blog-placeholder-2.jpg"
draft: false
tags:
  - "writeup"
  - "osint"
  - "beginner"
  - "2021"
---

### Challenge description

> Yummy Crusty Pizza have been working on their secret recipe for over two decades, serving only the best pizza in the city. A hacker recently broke into their OLD database and dumped their recipe online, can you retrieve it?

**Beware of errors and bad practices as this my first ever write up, written for the OSINT challenge made by @s1nfulz and @0xLegacyy**

As this is an OSINT challenge, the first thing to be done is to find the website and I began to dork the google.
After multiple attempts the term `intext:"Yummy Crusty Pizza"` gave the result: https://www.yummycrustypizza.com/
![Google search on yummy crusty pizza](https://i.imgur.com/8rXiZgP.png)

Going to the site greets us to a templatemo site, and the one thing that pops out is the "database" navigation
![Yummy Crusty Pizza website](https://i.imgur.com/CRPcviv.jpg)

Upon navigating to the database site (https://www.yummycrustypizza.com/database), we see that it is taken down:
![Database page of Yummy Crusty Pizza](https://i.imgur.com/ibBmOkt.png)

Knowing that the `/database` was taken down, I began checking the webarchive for an archivation of the page. (which there is)
![List over the Web-archives](https://i.imgur.com/f2cetoX.png)
![The webarchive of the database page](https://i.imgur.com/mlxcFu4.png)

We see a dump of the user database with hashed password of 6 users here, pasting the dump on to https://crackstation.net/ we get the password for the user `sinfulz` which is `password5`.
![Crackstation on the hashes](https://i.imgur.com/TteudjO.png)

Knowing the password I try to find a place to login with the password. The first thing was to pop up gobuster to fuzzsearch the directory and routes.
Doing this we find the route https://www.yummycrustypizza.com/logs, however the combination of username and password doesn't work. Releasing this, I try to find other clues.

Looking at the footer we see links to different social media accounts for Yummy Crusty Pizza
![Social media icons](https://i.imgur.com/Km6uSV1.png)

- https://github.com/yummycrustypizza
- https://www.pinterest.com.au/yummycrustypizza/?invite_code=4d3b280567034fc4832010e537b2c631&sender=777434091833570390
- https://www.instagram.com/yummycrustypizza/
- https://twitter.com/YMMYCRSTYPZZA

Going to the sites we see that there's nothing interesting on the github and pinterest accounts. However the instagram accounts gives us our first "fake flag": `SINFULZ{We're_n0_str4ng3rs_t0_l0v3}` and the twitter account we find this interesting post:
![Twitter page](https://i.imgur.com/hWmeJfW.png)

Knowing that the dump is located in pastebin, we go to the site https://pastebin.com/BvatWyq8:
![Pastebin](https://i.imgur.com/rc1mtaT.png)
And there the secret recipe is found at https://cryptobin.co/j5h5l4y8
Going to the site we find out that we need a password to unlock the file.
![Cryptobin](https://i.imgur.com/vBYWN3j.png)
Remembering the password we've found earlier, `password5`, unlocks us the file and there we find our real flag: `SINFULZ{DUMPED_SECRETS_ON_PUBLIC_SITES_ARE_REAL}`
![Decrypted cryptobin showing the pizza recipe / flag](https://i.imgur.com/1FWZ98M.png)

Finding the flag, I set out my journey to find the easter egg made by Legacyy. However, after testing out all sort of google dorking, fuzz searches and hash/password bruteforcing, I failed miserably.

After reading another tweet from the creator of the challenge @s1nfulz, I see hint on the `favicon.ico` and the potential easter egg located in the file `sin_pizza_n-obg_2.ico`. However with the hint, I wasn't able to find the easter egg after spamming all types of stegonography techniques on the given `favicon.ico` file, reverse image searching and fuzzing for the file `sin_pizza_n-obg_2.ico`. _(No I didn't because I am an idiot)_ My journey had to be ended here I thought...
![Sneak peek twitter feed on the easter egg](https://i.imgur.com/pcLjHsd.png)

_Sike!_ After some day (4 days) later, I've refreshed my thoughts and began to start searching for the easter egg once again. This time I focused more on the stegonography part instead of OSINT. As usual stego challenges, I began running `strings` and there I found a big clue which made the next part quite trivial:

```
...
$w+W
)K(*
&okp
easter egg here:xor
key: legacyy
:qou
#mhm
H#$l
...
```

Knowing this I set up a python script to xor the file with the given key `legacyy`:

```python
# Read the bytes
a = b""
with open("favicon.ico","rb") as f:
    a = f.read()
# Find index location of the string "easter"
index = a.find(b"easter")
# print(a[index:index+54])
key = b"legacyy" # key
n = 1 # key offset
# XOR and print output
for i in range(index,index+54):
    c = a[i] ^ key[n%len(key)]
    print(chr(c),end="")
    n+=1
print()
```

This gives us the output:
![Python script output](https://i.imgur.com/CsiHL8Q.png)

- Easter egg is finally found: `waterproof toaster :)`

This wraps up my first ever writeup. I would like give lots of thanks to @s1nfulz and @0xLegacyy for a great beginner friendly OSINT challenge, and would love to take part in future challenges like this again

Thank you for reading!

### Flags

- **Fake flag:** `SINFULZ{We're_n0_str4ng3rs_t0_l0v3}`
- **Real flag:** `SINFULZ{DUMPED_SECRETS_ON_PUBLIC_SITES_ARE_REAL}`
- **Easter egg:** `waterproof toaster :)`

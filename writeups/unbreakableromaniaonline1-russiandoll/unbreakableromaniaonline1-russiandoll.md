# [Unbreakable Romania Online 1](https://unr1.cyberedu.ro/) : russiandoll

**Category:** [misc, programming]

**Points:** 70 (dynamic)

**Solves:** 43

**Difficulty:** medium

**Description:**

>Can you unfold the secrets lying within?
>
>Flag format: ctf{sha256}
>
>Goal: You have to understand what type of file is attached to this challenge, restore the original files and try to gain access to the flag.
>
>The challenge was created by Bit Sentinel.

**Files:**

- [jibeqnocfjjuijypians](https://api.cyberedu.ro/v1/contest/unr1/challenge/81469120-0c6e-11eb-b745-edda158222f6/download/106)
---

## writeup

### inspecting the downloaded file

running `file` on the downloaded file reveals that it is a gzip compressed archive

```plaintext
jibeqnocfjjuijypians: gzip compressed data, was "ognhhfcfspjokexhjwoo"
last modified: Mon Oct 12 09:33:12 2020, from Unix, original size modulo 2^32 14527
```

using `7z` to extract it, we get another archive, this time copressed with zip

```plaintext
ognhhfcfspjokexhjwoo: Zip archive data, at least v1.0 to extract
```

### digging deeper

let's keep extracting it with `7z`

```plaintext
Enter password (will not be echoed):
```

of course that would have been too simple...

john will handle it

```bash
zip2john ognhhfcfspjokexhjwoo > hash
john hash --wordlist=/usr/share/dict/rockyou.txt
```

```plaintext
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
password         (ognhhfcfspjokexhjwoo/hash)
1g 0:00:00:00 DONE (2020-12-24 18:57) 25.00g/s 409600p/s 409600c/s 409600C/s 123456..christal
Use the "--show" option to display all of the cracked passwords reliably
Session completed
```

extracting the archive with the cracked password results in a flie `archives/kkpjjvslqucmkudjqspk` which is again a gzip compressed archive

after manually peeling back a few layers, a third archive format emerges

```plaintext
yrcpacrptgxicwigdrpu: 7-zip archive data, version 0.4
```

### automating the work

the script should loop indefinitely, taking certain actions on specific file formats:
- **gzip archive**: extract it
- **7-zip archive**: crack the password and extract it
- **zip archive**: crack the password, extract it and move the obtained file from the subdirectory up one level
- **ascii text**: display contents
- **other**: halt

the following bash script does the same thing, except for the part with the subdirectories. it extracts both `gzip` and `7-zip` archives with the `-oarchives/` option, placing the resulting files in a subdirectory, the same way as `zip` archives do. this helps with wildcard-matching the resulting file

```bash
#!/bin/bash

mv "$1" archive

while true; do
    if [ -n "$(file archive | grep 'Zip archive data')" ]; then
        echo "zip"
        zip2john archive > hash
        john hash --wordlist=/usr/share/dict/rockyou.txt
        password=$(john hash --show | grep archive | cut -d':' -f2)
        7z x archive -p$password
        mv archives/* archive
    elif [ -n "$(file archive | grep '7-zip archive data')" ]; then
        echo "7-zip"
        7z2john archive > hash
        john hash --wordlist=/usr/share/dict/rockyou.txt
        password=$(john hash --show | grep archive | cut -d':' -f2)
        7z x archive -p$password -oarchives/
        mv archives/* archive
    elif [ -n "$(file archive | grep 'gzip compressed data')" ]; then
        echo "gzip"
        7z x archive -oarchives/
        mv archives/* archive
    elif [ -n "$(file archive | grep 'ASCII text')" ]; then
        echo "flag"
        mv archive flag.txt
        cat flag.txt
        exit
    else
        echo "unknown archive format"
        exit
    fi
    sleep 1
done
```

### obtaining the flag

run the script with the initial archive as parameter

```bash
./matrioska.sh jibeqnocfjjuijypians
```

and watch john do it's thing

after a few minutes it reaches the plain textfile and the flag will be printed

```plaintext
ctf{8ffe609c04a7001a908da5b481442ce1ce3208f2a4f3a6862e144bb1f320c54e}
```

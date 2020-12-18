# [Unbreakable Romania Online 1](https://unr1.cyberedu.ro/) : russiandoll

**Category:** [Misc, Programming]

**Points:** 70 (dynamic)

**Solves:** 43

**Difficulty:** Medium

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

### WIP

```bash
#!/bin/bash

mv "$1" archive

while true; do
    if [ -n "$(file archive | grep 'Zip archive data')" ]; then
        echo "zip"
        zip2john archive > ziphash
        password=$(john ziphash --wordlist=~/Desktop/rockyou.txt | grep archive | cut -d' ' -f1)
        if [ -z "$password" ]; then
            password=$(john ziphash --show | grep archive | cut -d':' -f2)
        fi
        7z x archive -p$password
        mv archives/* archive
    elif [ -n "$(file archive | grep '7-zip archive data')" ]; then
        echo "7-zip"
        7z2john archive > ziphash
        password=$(john ziphash --wordlist=~/Desktop/rockyou.txt | grep archive | cut -d' ' -f1)
        if [ -z "$password" ]; then
            password=$(john ziphash --show | grep archive | cut -d':' -f2)
        fi
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

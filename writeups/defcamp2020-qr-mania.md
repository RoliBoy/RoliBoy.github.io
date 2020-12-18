# [DefCamp 2020 CTF](https://link.com) : qr-mania

**Category:** [Network, Misc, Programming]

**Points:** 50 (dynamic)

**Solves:** 75

**Difficulty:** Medium

**Description:**

> We intercepted some weird requests. See if you can extract some useful information.
>
> Flag format: CTF{sha256}
>
> The challenge was proposed by BIT SENTINEL.

**Files:**

- [challenge.pcap](https://api.cyberedu.ro/v1/contest/dctf2020/challenge/e40d5bc0-3565-11eb-b8d6-afd86980505c/download/457)

---

## writeup

```bash
tshark -r challenge.pcap --export-objects "http,resources"
```

### extracting the order from EXIF

```bash
ls resources/*.png |\
xargs -n1 exiftool |\
grep -i 'file name\|comment' |\
awk '{print $NF}' |\
tr '\n' ' ' |\
sed 's/\/69/\n/g' |\
sed '/^ $/d' |\
sort -nk2 |\
awk '{print "resources/"$1}' >\
order.txt
```


### decode qr codes

convert the images to monochrome and decode them:

```python
#!/usr/bin/env python
from pyzbar.pyzbar import decode
from PIL import Image

with open("order.txt") as order:
    for file in order:
        original_image = Image.open(file.strip())
        original_pixels = original_image.load()

        monochrome_image = Image.new(original_image.mode, original_image.size)
        monochrome_pixels = monochrome_image.load()

        background = original_pixels[0, 0]

        for i in range(original_image.size[0]):
            for j in range(original_image.size[1]):
                if original_pixels[i, j] == background:
                    monochrome_pixels[i, j] = (255, 255, 255, 255)
                else:
                    monochrome_pixels[i, j] = (0, 0, 0, 255)
        print(decode(monochrome_image)[0].data.decode('utf-8'), end='')
    print()
```

`CTF{2b2e8580cdf35896d75bfc4b1bafff6ee90f6c525da3b9a26dd7726bf2171396}`

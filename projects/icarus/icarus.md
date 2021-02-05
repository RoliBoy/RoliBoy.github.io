<div align="center" style="margin-bottom:32px">
<a href="./icarus.html"><img width="256" src="icarus-logo.png"></a>
<h1>Archiso profile for CTF players</h1>
<!-- <h1>linux distro for CTF players</h1> -->
<a href="./packages.html">package list</a>
|
<a href="./shortcuts.html">keyboard shortcuts</a>
|
<a href="./screenshots.html">screenshots gallery</a>
|
<a href="./downloads.html">iso downloads</a>
</div>


## OwO what's this? [WIP]

`btw i use arch` + `1337 h4x0r` + `r/unixporn` = `icarus`

icarus is intended to be used as a live system, ensuring you have an intact working environment each boot, containing every obscure ctf tool in existence

## icarus vs kali and parrot [WIP]

both kali and parrot are distributions focused on pentesting so they lack tools frequently used by ctf players. and neither of them is arch based so they are objectively worse


## installation instructions [WIP]  

- follow the [build guide](https://github.com/roliboy/icarus#build-instructions) to create an iso or [download](downloads.html) a prebuilt one
- copy the iso file to the usb flash drive with `dd`
```plaintext
dd bs=4M if=icarus.iso of=/dev/sdX status=progress oflag=sync
```
if you built the iso from source you can just run `make burn`
- (optional) create persistence partition on the usb flash drive
```plaintext
sudo fdisk /dev/sdX
Command (m for help): n
Partition number (4-248, default 4): 4
First sector (4491216-31334336, default 4491264): 4491264
Last sector, +/-sectors or +/-size{K,M,G,T,P} (4491264-31334336, default 31334336): 31334336
Command (m for help): w
```

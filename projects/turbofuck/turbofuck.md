# Turbofuck

Optimizing compiler for brainfuck.

currently targeting:
- C source
- 32 bit intel netwide assembly source
- x86/i386 ELF executable
- 64 bit intel netwide assembly source [WIP]
- x86\_64/amd64 ELF executable

optimization passes implemented:
- combine repeating instructions
- remove dead code
- replace clear loops
- replace multiply loops


## Usage

turbofuck [options] filename

## Examples

compile programs/mandelbrot.bf into a 32 bit elf executable
```bash
turbofuck -o mandelbrot programs/mandelbrot.bf -felf32
```

compile programs/pi.bf into 64 bit NASM source code, with 2 byte cells
```bash
turbofuck -o pi programs/pi.bf -fasm64 -c2
```

compile programs/hanoi.bf into C source code, without optimizing multiply loops
```bash
turbofuck -o hanoi programs/hanoi.bf -fc -Onomultiply
```

## Installation

install the crystal compiler from your package manager of choice

on arch

```bash
pacman -S crystal
```

or follow the [official installation guide](https://crystal-lang.org/install/)

## Tests

run all tests

```bash
crystal spec
```

run all tests only for elf32 target

```bash
crystal spec --tag elf32
```

run the 'hello world' test for all targets

```bash
crystal spec --tag helloworld
```

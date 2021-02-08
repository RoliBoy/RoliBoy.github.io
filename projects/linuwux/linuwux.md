>GNyU + Winyux
>
>I'd just wike to intewject fow a moment. What you'we wefewwing to as Winyux, is in fact, GNyU/Winyux, ow as I've wecentwy taken to cawwing it, GNyU pwus Winyux. Winyux is nyot an opewating system unto itsewf, but wathew anyothew fwee componyent of a fuwwy functionying GNyU system made usefuw by the GNyU cowewibs, sheww utiwities and vitaw system componyents compwising a fuww OS as definyed by POSIX.
>
>Many computew usews wun a modified vewsion of the GNyU system evewy day, without weawizing it. Thwough a pecuwiaw tuwn of events, the vewsion of GNyU which is widewy used today is often cawwed "Winyux", and many of its usews awe nyot awawe that it is basicawwy the GNyU system, devewoped by the GNyU Pwoject.
>
>Thewe weawwy is a Winyux, and these peopwe awe using it, but it is just a pawt of the system they use. Winyux is the kewnyew: the pwogwam in the system that awwocates the machinye's wesouwces to the othew pwogwams that you wun. The kewnyew is an essentiaw pawt of an opewating system, but usewess by itsewf; it can onwy function in the context of a compwete opewating system. Winyux is nyowmawwy used in combinyation with the GNyU opewating system: the whowe system is basicawwy GNyU with Winyux added, ow GNyU/Winyux. Aww the so-cawwed "Winyux" distwibutions awe weawwy distwibutions of GNyU/Winyux.
>
> --*Wichawd Stawwman*

## usage

### per-application

invoke commands like usual, but prefixed with `LD_PRELOAD=./libowo.so`

```bash
LD_PRELOAD=./libowo.so cat owo.c
```

### system-wide

place the absolute path to the shared object inside `/etc/ld.so.preload`

## side effects
- occasional kernel panics
- systemd service hangs (booting in single user mode recommended)

## FAQ
>why not replace write syscall

Spending a day to compile the linux kernel is a higher price than i'm willing to pay for a meme

>application X doesn't get owofied

That happens because:
- the executable is not dynamically linked
- it does not depend on libc
- it uses some obscure libc printing function that i haven't replaced yet
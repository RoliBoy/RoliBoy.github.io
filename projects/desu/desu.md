you just typed out a long ass command but forgot that it needs superuser privileges to run. you could go back to the beginning of the line and add `sudo` wasting keystrokes, or just append `desu` at the end

![desu](desu.png)

```bash
~ ❯❯❯ cat /etc/shadow
'/etc/shadow': Permission denied (os error 13)

~ ❯❯❯ cat /etc/shadow desu
bin:!*:18502::::::
daemon:!*:18502::::::
mail:!*:18502::::::
...
```

## installation

clone [this](https://github.com/roliboy/desu) git repo, run `make` and be happy

## supported shells

- fish
- bash (still work in progress)
- zsh (it claims to be compatible with bash so it should work ¯\\\_(ツ)\_/¯)
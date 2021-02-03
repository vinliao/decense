# Decense 🦕
Decense (deno license) allows you to generate a license with one `deno run` command—no downloading, no `chmod +x ./program_name`, no installing.

## Steps to run
1. Make sure Deno is installed
2. Run `deno run --allow-write --allow-net https://deno.land/x/decense/main.ts`
3. Pick your license and enter your name
4. 🦕🎉

## Questions
Q: Why is there an `--allow-write` and `--allow-net`?

A: Deno is secure by default—accessing the network and writing files locally requires additional permission. Those two commands are used to fetch the license and write it on your computer.

Q: Where does the license comes from?

A: All these license templates comes from [this github repository.](https://github.com/nishanths/license)

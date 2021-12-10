# Bytecode Explorer

A V8 bytecode visualizer, generating comments to explain each line.
Currently only supports minimal functions, with no use of closures and restrained calls to outside functions.

***

## Getting Started

1. `npm i` from `client/` and `server/`.
2. Run `npm run dev` from within any of the two folders.
3. Write code on the left, click to get bytecode to the right.
   > if the output is empty, make sure to place a call to your function inside the left console.

**The starting code example is an example of code that DOESN'T work, so aim for anything lower-level than that.**

***

## Tech Stack

- ⚛ React
- 🍫  Koa

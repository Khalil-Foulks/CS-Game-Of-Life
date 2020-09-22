# Cellular Automata and Conway's "Game of Life"

---

Welcome to John Conway's "Game of Life"! This is a computer science
classic from 1970, a program that simulates a _cellular automaton_
(plural _automata_). It has connections to all kinds of different
aspects of computer science and nature.

![example-patterns](https://media.giphy.com/media/4VVZTvTqzRR0BUwNIH/giphy.gif)

[from Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)

## The Game of Life

---

A very famous cellular automaton is John Conway's [Game of
Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
app. This game is a class of discrete model known as a *[Cellular
Automaton](https://en.wikipedia.org/wiki/Cellular_automaton)*, abbreviated *CA*.

It's made up of a grid of cells (usually 2D, but can be any dimension)
that follow a simple set of rules from which complex behaviors can
emerge.

In the Game of Life, these rules examine each cell of the grid. For each
cell, it counts that cell's eight neighbors (up, down, left, right, and
diagonals), and then act on that result.

* If the cell is alive **and** has 2 or 3 neighbors, then it remains
  alive. Else it dies.
* If the cell is dead **and** has exactly 3 neighbors, then it comes to
  life. Else if remains dead.

From those two rules, many types of "creatures" can be created that
[move around the
"landscape"](https://www.youtube.com/watch?v=28vxPvTDh4E).

Note: cells that are off the edge of the grid are typically assumed to
be dead. (In other cases, people sometimes code it up to wrap around to
the far side.)

## Cellular Automata

---

A _cellular automaton_ (plural: cellular automata, abbreviated _CA_) is a
program that operates on data typically stored in a 2D grid. (1D, 3D and _n_-D
cellular automata run on lines, cubes, etc.)

A simple set of rules describes how the value in a cell on the grid changes over
time, often as the result of the states of that cell's neighbors.

> Sometimes neighbors includes the 4 orthogonally adjacent cells; sometimes it
> includes all 8 surrounding cells including diagonals.

Each round of the simulation examines the current state of the grid, and then
produces an entirely new grid consisting of the old state. (Remember the
discussion about double buffers earlier--we don't want to modify the same grid
we're examining, lest we munge future results.)

This new grid becomes the "current" state of the simulation, and the process
repeats. Each new grid is referred to as a _generation_.

The beautiful thing about cellular automata is that sometimes very complex
behavior can emerge from very simple rules.

Practically speaking, CAs have been used in biological and chemical simulations
and other areas of research, such as CA-based computer processors, and other
numeric techniques.

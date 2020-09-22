import React from 'react';

const GameRules = () => {
    return (
        <div className ='rules'>
            <h2>Rules</h2>
            <p><span>Source:</span> <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target='blank'>Wikipedia</a></p>
            <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, (or populated and unpopulated, respectively).</p> <p>Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
            <ol>
                <li>Any live cell with two or three live neighbours survives.</li>
                <li>Any dead cell with three live neighbours becomes a live cell.</li>
                <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
            </ol>
            <p id='note'> <span>Note:</span> Cells that are off the edge of the grid are assumed to be dead.</p>
        </div>
    )
}

export default GameRules;
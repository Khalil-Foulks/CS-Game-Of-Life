import React from 'react';


/**
 * Game Of Life By John Conway
 * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 * 1. Render grid
 * 2. Spawn life on click
 * 3. Implement game logic
 */

export default class GameOfLife extends React.Component {

    static field = {
        columnsAmount: 25,
        rowsAmount: 25,
    };
    static cellState = {
        ALIVE: true,
        DEAD: false,
    };

    // Initialization

    constructor(props) {
        super(props);

        this.state = {
            cells: this.initializeCells(),
            isGameRunning: false,
            generation: 0,
            color: ['#03c6fc', '#8f00db', 'blue'],
            speed: 1000, // 1sec 
            columns: 25,
            rows: 25,
        };
        setInterval(() => this.live(), this.state.speed) 
    }

    // Creates the cells for the grid
    initializeCells() {
        let cells = [];

        for (let columnIndex = 0; columnIndex < GameOfLife.field.columnsAmount; columnIndex++) {
            cells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < GameOfLife.field.rowsAmount; rowIndex++) {
                cells[columnIndex][rowIndex] = GameOfLife.cellState.DEAD; //cell at row and column is dead by default
            }
        }

        return cells;
    }

    // end Initialization

    // Game update logic

    //double buffering - using application state to create a new state for cells and setting that as the new cell state 
    live() {
        // if game is not running do nothing
        if (!this.state.isGameRunning) {
            return;
        }

        const newCells = [];
        
        for (let columnIndex = 0; columnIndex < this.state.columns; columnIndex++) {
            newCells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < this.state.rows; rowIndex++) {
                newCells[columnIndex][rowIndex] = this.computeNewCellState(columnIndex, rowIndex) // cell at row and column is dead or alive based on computeNewCellState (rules)
            }
        }

        this.setState({generation: this.state.generation += 1}) // increment generation count by 1
        this.setState({cells: newCells}) // update cells state using newCells
    }

    // rules logic
    computeNewCellState(columnIndex, rowIndex) {
        const aliveNeighboursAmount = this.computeAliveNeighboursAmount(columnIndex, rowIndex);
        const currentCellState = this.state.cells[columnIndex][rowIndex];

        if (currentCellState === GameOfLife.cellState.ALIVE) {
            if (aliveNeighboursAmount < 2) {
                return GameOfLife.cellState.DEAD;
            } else if (aliveNeighboursAmount === 2 || aliveNeighboursAmount === 3) {
                return GameOfLife.cellState.ALIVE; 
            } else if (aliveNeighboursAmount > 3) {
                return GameOfLife.cellState.DEAD;
            }
        } else {
            if (aliveNeighboursAmount === 3) {
                return GameOfLife.cellState.ALIVE;
            }
        }

        return GameOfLife.cellState.DEAD;
    }

    computeAliveNeighboursAmount(columnIndex, rowIndex) {
        let aliveNeighboursAmount = 0;

        const neighbourOffsets = [
            [-1, 0], // left (W)
            [-1, 1], // top left (NW)
            [0, 1], // top (N)
            [1, 1], // top right (NE)
            [1, 0], // right (E)
            [1, -1], // bottom right (SE)
            [0, -1], // bottom (S)
            [-1, -1], // bottom left (SW)
        ];

        for (const neighbourOffsetKey in neighbourOffsets) {
            const [xOffset, yOffset] = neighbourOffsets[neighbourOffsetKey]; // grabs each direction array from neighborOffsets

            let newColumnOffset = columnIndex + xOffset; //holds count for column index being checked
            let newRowOffset = rowIndex + yOffset; //holds count for row index being checked

            // Check boundaries
            if (newColumnOffset < 0 || newColumnOffset > this.state.columns - 1) { // ignores columns that are not neighbors
                continue; // "jumps over" one iteration in the loop
            }
            if (newRowOffset < 0 || newRowOffset > this.state.rows - 1) { // ignores rows that are not neighbors
                continue; // "jumps over" one iteration in the loop 
            }

            const neighbourState = this.state.cells[newColumnOffset][newRowOffset];
            if (neighbourState === GameOfLife.cellState.ALIVE) {
                aliveNeighboursAmount++; // increase count by 1 for every neighbor that is alive
            }
        }

        return aliveNeighboursAmount;
    }

    // end Game update logic

    // User Interactions

    // resets grid to all dead cells
    resetCells() {
        let cells = [];

        for (let columnIndex = 0; columnIndex < this.state.columns; columnIndex++) {
            cells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < this.state.rows; rowIndex++) {
                cells[columnIndex][rowIndex] = GameOfLife.cellState.DEAD;
            }
        }

        this.setState({cells: cells})
        this.setState({generation: 0})
    }

    // randomizes current grid
    randomizeCells() {
        let cells = [];

        for (let columnIndex = 0; columnIndex < this.state.columns; columnIndex++) {
            cells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < this.state.rows; rowIndex++) {
                // randomizes each cell between 1-3, if number is > 1 cell, is dead, otherwize it's alive
                cells[columnIndex][rowIndex] = Math.floor(Math.random() * 3) + 1 > 1 ? GameOfLife.cellState.DEAD : GameOfLife.cellState.ALIVE; 
            }
        }

        this.setState({cells: cells})
        this.setState({generation: 0})
    }

    // resets grid and makes it 25x25
    async grid25x25() {
        await this.setState({columns: 25})
        await this.setState({rows: 25})
        this.resetCells()
    }

    // resets grid and makes it 15x15
    async grid15x15() {

        await this.setState({columns: 15})
        await this.setState({rows: 15})
        this.resetCells()
    }

    // inverses state
    toggleCellState(columnIndex, rowIndex) {
        const newCellsState = this.state.cells; //current cell state

        newCellsState[columnIndex][rowIndex] = !newCellsState[columnIndex][rowIndex]; //changes cell state to be the inverse of whatever it currently is

        this.setState({state: newCellsState}) // update state of cell to be alive or dead on click
    }

    //pauses and starts game 
    toggleIsGameRunning() {
        this.setState({isGameRunning: !this.state.isGameRunning})
    }

    // disables buttons if game is running
    isDisabled() {
        if (!this.state.isGameRunning){
            return false
        }
        return true
    }

    // end User Interactions

    // Rendering

    //renders grid
    renderCells() {
        return (
            <div className="GameOfLife__cells">
                {this.state.cells.map((rows, columnIndex) => {
                    return this.renderColumn(rows, columnIndex)
                })}
            </div>
        );
    }

    //renders columns
    renderColumn(rows, columnIndex) {
        return (
            <div className="GameOfLife__column" key={`column_${columnIndex}`}>
                {rows.map((cellState, rowIndex) => {
                    const cellModifier = cellState === GameOfLife.cellState.DEAD ? 'dead' : 'alive';
                    return <div
                        className={`GameOfLife__cell GameOfLife__cell--${cellModifier}`}
                        key={`cell_${columnIndex}_${rowIndex}`}
                        onClick={() => this.toggleCellState(columnIndex, rowIndex)}
                        style={cellState === GameOfLife.cellState.ALIVE ? {backgroundColor: `${this.state.color[Math.floor(Math.random() * 3)]}`} : {backgroundColor: 'white'}}
                    />
                })}
            </div>
        )
    }

    //start button
    renderStartGameButton() {
        const buttonLabel = this.state.isGameRunning ? 'Stop' : 'Start';

        return (
            <button
                className="GameOfLife__startGameButton"
                onClick={() => this.toggleIsGameRunning()}
            >
                {buttonLabel}
            </button>
        )
    }

    //clear button
    renderClearGameButton() {
        const buttonLabel = 'Clear'
        const clickable = this.state.isGameRunning ? 'notClickable' : 'clickable';

        return (
            <button
                className="GameOfLife__clearGameButton"
                id = {`${clickable}`}
                onClick={() => this.resetCells()}
                disabled = {this.isDisabled()}
            >
                {buttonLabel}
            </button>
        )
    }

    //random button
    renderRandomGameButton() {
        const buttonLabel = 'Random'
        const clickable = this.state.isGameRunning ? 'notClickable' : 'clickable';

        return (
            <button
                className="GameOfLife__RandomGameButton miscButton"
                id = {`${clickable}`}
                onClick={() => this.randomizeCells()}
                disabled = {this.isDisabled()}
            >
                {buttonLabel}
            </button>
        )
    }

    renderGrid25x25() {
        const buttonLabel = '25x25'
        const clickable = this.state.isGameRunning ? 'notClickable' : 'clickable';

        return (
            <button
                className="GameOfLife__25x25Button miscButton"
                id = {`${clickable}`}
                onClick={() => this.grid25x25()}
                disabled = {this.isDisabled()}
            >
                {buttonLabel}
            </button>
        )
    }

    //makes 15x15 grid button
    renderGrid15x15() {
        const buttonLabel = '15x15'
        const clickable = this.state.isGameRunning ? 'notClickable' : 'clickable';

        return (
            <button
                className="GameOfLife__15x15Button miscButton"
                id = {`${clickable}`}
                onClick={() => this.grid15x15()}
                disabled = {this.isDisabled()}
            >
                {buttonLabel}
            </button>
        )
    }

    render() {
        return (
            <div className="GameOfLife">
                <div className="GameOfLifeInfo">
                    <p className ='generation'>Generation: {this.state.generation}</p>
                    {this.renderStartGameButton()}
                    {this.renderClearGameButton()}
                    {this.renderRandomGameButton()}
                    {this.renderGrid15x15()}
                    {this.renderGrid25x25()}
                </div>
                {this.renderCells()}
            </div>
        );
    };

    // end Rendering

}

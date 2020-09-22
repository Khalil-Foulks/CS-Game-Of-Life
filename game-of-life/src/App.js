import React from 'react';
import './App.css';
import Board from './components/Board';
import GameRules from './components/GameRules';

function App() {
  return (
    <div className="App">
      <h1>Conway's Game Of Life</h1>
      <div className = 'main_container'>
        <GameRules/>
        <Board/>
      </div>
    </div>
  );
}

export default App;

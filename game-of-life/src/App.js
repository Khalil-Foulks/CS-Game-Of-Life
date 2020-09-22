import React from 'react';
import './App.css';
import Rules from './components/Rules';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <h1>Conway's Game Of Life</h1>
      <div className = 'main_container'>
        <Rules/>
        <Board/>
      </div>
    </div>
  );
}

export default App;

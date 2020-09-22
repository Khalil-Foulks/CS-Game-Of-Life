import React from 'react';
import './App.css';
import Board from './components/Board';
// import Rules from './components/Rules';

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

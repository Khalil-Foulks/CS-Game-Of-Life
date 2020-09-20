import React from 'react';
import './App.css';
import Rules from './components/rules'

function App() {
  return (
    <div className="App">
      <h1>Conway's Game Of Life</h1>
      <Rules/>
    </div>
  );
}

export default App;

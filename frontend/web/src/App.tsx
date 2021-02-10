import React from 'react';
import logo from './logo.svg';
import logo2 from './assets/notizen.svg'
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo2} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
}

export default App;

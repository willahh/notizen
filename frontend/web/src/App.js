import React from 'react';
import logo from './logo.svg';
import Text from '@notizen/frontend-common/components/Text';
import Text2 from '@notizen/frontend-common/components/Text2';
import Text3 from '@notizen/frontend-common/components/Text3';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Text>Common Component package</Text>
        <Text2></Text2>
        <Text3></Text3>
      </header>
    </div>
  );
}

export default App;

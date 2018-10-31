import React, { Component } from 'react';
import Pomodoro from './Pomodoro.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 id="title">JitomaTimer</h1>
        <Pomodoro />
        <div id="credits">
          <p>Designed and coded by: Ivan Chavez E.</p>
        </div>
      </div>
    );
  }
}

export default App;

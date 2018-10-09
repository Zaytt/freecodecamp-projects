import React, { Component } from 'react';
import './App.css';
import QuoteMachine from './QuoteMachine';


class App extends Component {
  render() {
    return (
      
      <div id="quote-box" className="App">
        <QuoteMachine />
      </div>
    );
  }
}

export default App;

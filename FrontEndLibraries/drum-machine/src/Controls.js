import React, {Component} from 'react';
import './Controls.css';

class Controls extends Component{
  
  render(){
    return (
      <div id="controls-container">
        <p>Volume:</p>
        <input type="range" min="1" max="100" value="50"/>
      </div>
    );
  }
}

export default Controls;
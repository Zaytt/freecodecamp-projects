import React, {Component} from 'react';
import DrumPad from './DrumPad.js';
import Controls from './Controls.js';
import './DrumMachine.css';

const sounds = [
    { id:"cymbal", letter:"Q", sound:"https://www.myinstants.com/media/sounds/cymbal-crash.mp3"},
    { id:"bass-drum", letter:"W", sound:"https://www.myinstants.com/media/sounds/bass-drum.mp3"},
    { id:"deep-bass", letter:"E", sound:"https://www.myinstants.com/media/sounds/lex-808-kick-im-boomin.mp3"},
    { id:"chord-1", letter:"A", sound:"https://www.myinstants.com/media/sounds/rho1.mp3"},
    { id:"chord-2", letter:"S", sound:"https://www.myinstants.com/media/sounds/rho2.mp3"},
    { id:"chord-3", letter:"D", sound:"https://www.myinstants.com/media/sounds/rho3.mp3"},
    { id:"clap", letter:"Z", sound:"https://www.myinstants.com/media/sounds/clap.mp3"},
    { id:"guitar-1", letter:"X", sound:"https://www.myinstants.com/media/sounds/sync-4.mp3"},
    { id:"guitar-2", letter:"C", sound:"https://www.myinstants.com/media/sounds/sync-5.mp3"}
    
  ];

class DrumMachine extends Component{
  
  
  render(){
    return (
      <div id="drum-machine">
        <div id="drum-pad-container">
      
          {sounds.map(d => ( <DrumPad data = {d} /> ))}

        </div>
        <div id="controls-container">
          <div id="display"></div>
          <Controls />
        </div>
      </div>
    );
  }
  
}

export default DrumMachine;
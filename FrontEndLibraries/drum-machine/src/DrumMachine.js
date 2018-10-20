import React, {Component} from 'react';
import DrumPad from './DrumPad.js';
import Controls from './Controls.js';
import './DrumMachine.css';

const sounds = [
    { id:"cymbal", letter:"Q", keycode: 81, sound:"https://www.myinstants.com/media/sounds/cymbal-crash.mp3"},
    { id:"bass-drum", letter:"W", keycode: 87, sound:"https://www.myinstants.com/media/sounds/bass-drum.mp3"},
    { id:"deep-bass", letter:"E", keycode: 69, sound:"https://www.myinstants.com/media/sounds/lex-808-kick-im-boomin.mp3"},
    { id:"chord-1", letter:"A", keycode: 65, sound:"https://www.myinstants.com/media/sounds/rho1.mp3"},
    { id:"chord-2", letter:"S", keycode: 83, sound:"https://www.myinstants.com/media/sounds/rho2.mp3"},
    { id:"chord-3", letter:"D", keycode: 68, sound:"https://www.myinstants.com/media/sounds/rho3.mp3"},
    { id:"clap", letter:"Z", keycode: 90, sound:"https://www.myinstants.com/media/sounds/clap.mp3"},
    { id:"guitar-1", letter:"X", keycode: 88, sound:"https://www.myinstants.com/media/sounds/sync-4.mp3"},
    { id:"guitar-2", letter:"C", keycode: 67, sound:"https://www.myinstants.com/media/sounds/sync-5.mp3"}
    
  ];

class DrumMachine extends Component{
  constructor(){
    super();
    this.state = {
      currentSound : ''
    }
    
    this.updateCurrentSound = this.updateCurrentSound.bind(this);
  }
  
  updateCurrentSound = (sound) => {
    this.setState({
      currentSound : sound
    });
  }
  

  componentDidMount(){
    
    document.addEventListener("keydown", (event) => {
      switch(event.keyCode){
        case 81:
          this.refs['Q'].play();
          break;
        case 87:
          this.refs['W'].play();
          break;
        case 69:
          this.refs['E'].play();
          break;
        case 65:
          this.refs['A'].play();
          break;
        case 83:
          this.refs['S'].play();
          break;
        case 68:
          this.refs['D'].play();
          break;
        case 90:
          this.refs['Z'].play();
          break;
        case 88:
          this.refs['X'].play();
          break;
        case 67:
          this.refs['C'].play();
          break;
        default:
      }
      
      
    });
    
  }
  
  render(){
    return (
      <div id="drum-machine">
        <div id="drum-pad-container">
      
          {sounds.map(d => ( <DrumPad ref = {d.letter} data = {d} updateCurrentSound = {this.updateCurrentSound}/> ))}

        </div>
        <div id="controls-container">
          <Controls sound = {this.state.currentSound}/>
        </div>
      </div>
    );
  }
  
}

export default DrumMachine;
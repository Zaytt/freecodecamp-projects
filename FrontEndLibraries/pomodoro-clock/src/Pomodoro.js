import React, {Component} from 'react';
import './Pomodoro.css';

class Pomodoro extends Component{
  constructor(){
    super();
    
    this.state= {
      phase: 'work',
      time: 1500,
      running: false
    }
    
    this.changeIcon = this.changeIcon.bind(this);
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.startPause = this.startPause.bind(this);
    this.countdown = this.countdown.bind(this);
  }
  
  componentDidMount(){
    this.countdown();
  }
  
  
  changeIcon(){  
    
    if(this.state.phase === 'work'){
      this.state.phase = 'rest';
    } else {
      this.state.phase = 'work';
    }
    this.forceUpdate();
    
    this.reset();
    
  }
  
  
  startPause(){
    this.setState({running : !this.state.rnning});
  }
  
  reset(){
    
    let phase = this.state.phase;
    this.setState({time: phase === 'work'? 1500 : 300, running: false});
    
  }
  
  formatTime(seconds){
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    
    return minutes+":"+seconds;
  }
  
  countdown(){
    setInterval( () => {
      if(this.state.running)
        this.setState({ time: this.state.time-1});
    }, 1000 );
  }
  
  
  
  render(){
    return (
      <div id="pomodoro-container">
        <div id="icon-container"><i id="icon" onClick={this.changeIcon} className={this.state.phase === 'work' ? "fas fa-laptop-code" : "fas fa-umbrella-beach"}></i></div>
        <div id="time-left">{this.formatTime(this.state.time)}</div>
        <div id="actions-container">
          <i id="start_stop" onClick = {this.startPause} className={this.state.running ? "fas fa-pause" : "fas fa-play"}></i>
          <i id="reset" onClick={this.reset} className="fas fa-redo-alt"></i>        
        </div>
        
      </div>
    );
  }
}

export default Pomodoro;
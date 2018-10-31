import React, {Component} from 'react';
import './Pomodoro.css';


let countdown = null;


class Pomodoro extends Component{
  constructor(){
    super();
    
    this.state= {
      phase: 'work',
      timeLeft: 1500,
      status: 'ready',
      workTime: 25,
      breakTime: 5
    }
    
    this.changeIcon = this.changeIcon.bind(this);
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.startPause = this.startPause.bind(this);
    this.changeWorkTime = this.changeWorkTime.bind(this);
    this.changeBreakTime = this.changeBreakTime.bind(this);
    this.downtick = this.downtick.bind(this);
    this.sessionEnd = this.sessionEnd.bind(this);

  }
  
  
  
  changeIcon(){  
    //TODO: FIND OUT WHY IT WONT UPDATE THE PHASE IMMEDIATLY AS IT IS REQUIRED FOR THE RESET CALL
    if(this.state.phase === 'work'){
      this.state.phase = 'rest';
    } else {
      this.state.phase = 'work';
    }
    this.forceUpdate();
    
    this.reset();
  }
  
  
  startPause(){
    let status = this.state.status;
    
    if(status === 'ready'){
      countdown = setInterval(this.downtick, 1000 );
      this.setState({ status: 'running'});
    } else if(status === 'paused'){
      this.setState({ status: 'running'});
    } else {
      this.setState({ status: 'paused'});
    } 
  }
  
  reset(){
    let clip1 = document.getElementById('beep');
    let clip2 = document.getElementById('keepup');    
    
    clip1.pause();
    clip1.currentTime = 0;
    clip2.pause();
    clip2.currentTime = 0;
    this.setState(
      {
        phase: 'work',
        timeLeft: 1500, 
        status: 'ready',
        workTime: 25,
        breakTime: 5
      });
    clearInterval(countdown); 
    
  }
  
  
  /**
    Takes an argument in seconds and returns it in the format 'mm:ss'
  **/
  formatTime(seconds){
    let minutes = Math.floor(seconds / 60);
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds % 60;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    
    return minutes+":"+seconds;
  }
  
  
  
  /**
    Ticks down the timer and triggers the session end when timer reaches 0
  **/
  downtick(){
    let timeLeft = this.state.timeLeft;
    
    if(this.state.status === 'running'){
      this.setState({ timeLeft: this.state.timeLeft-1});
      if(timeLeft === 0){
        this.sessionEnd();
      }
    } else
      return;
  }
  
  changeWorkTime(event){
    let workTime = this.state.workTime;
    if(workTime <= 1 || workTime >= 60)
      return;
    event.target.id === 'session-increment' ? 
      this.setState({workTime: workTime+1, timeLeft : workTime*60+60}) : 
      this.setState({workTime: workTime-1, timeLeft : workTime*60-60});
  }
  
  changeBreakTime(event){
    let breakTime = this.state.breakTime;
    if(breakTime <= 1 || breakTime >= 60)
      return;
    event.target.id === 'break-increment' ? 
      this.setState({breakTime: breakTime+1}) : this.setState({breakTime: breakTime-1});
  }
  
  
  
  /**
    Plays the sounds of the session's end and starts a new work/break session
  **/
  sessionEnd(){
    let phase = this.state.phase;
    let workTime = this.state.workTime;
    let breakTime = this.state.breakTime;
    let clip1 = document.getElementById('beep');
    let clip2 = document.getElementById('keepup');    
    
    if(phase === 'work'){
      clip1.pause();
      clip1.currentTime = 0;
      clip1.play();
      setTimeout(3000);
      this.setState({ phase: 'rest', timeLeft: breakTime*60});
      
    } else if(phase === 'rest'){
      clip1.pause();
      clip1.currentTime = 0;
      clip1.play();
      
      setTimeout(()=> {
        clip2.pause();
        clip2.currentTime = 0;
        clip2.play(); 
      }, 5000);
      this.setState({ phase: 'work', timeLeft: workTime*60});
    }
  }
  
  
  render(){
    let phase = this.state.phase;
    return (
      
      <div id="pomodoro-container">
      
        <div id="session-display">
          <div id="timer-label">{this.state.phase}</div>
          <div id="icon-container"><i id="icon" className={this.state.phase === 'work' ? "fas fa-laptop-code" : "fas fa-umbrella-beach"}></i></div>
          <div id="time-left">{this.formatTime(this.state.timeLeft)}</div>
          <div id="actions-container">
            <i id="start_stop" onClick = {this.startPause} className={this.state.status === 'running' ? "fas fa-pause" : "fas fa-play"}></i>
            <i id="reset" onClick={this.reset} className="fas fa-redo-alt"></i>        
          </div>
        </div>
        <div id="controls-container">
          <div className="controller">
            <div id="session-length">{this.state.workTime}</div>
            <div className="button-container">
              <i id="session-increment"  onClick={this.changeWorkTime} className="fas fa-plus"></i>
              <span id="session-label">Work</span>
              <i id="session-decrement"  onClick={this.changeWorkTime} className="fas fa-minus"></i> 
            </div>
          </div>
          <div className ="controller">
            <div id="break-length">{this.state.breakTime}</div>
            <div className="button-container"> 
              <i id="break-increment" onClick={this.changeBreakTime} className="fas fa-plus"></i>
              <span id="break-label">Rest</span>
              <i id="break-decrement" onClick={this.changeBreakTime} className="fas fa-minus"></i>
            </div>
          </div>
        </div>
        <audio  id="beep"  src= {phase === 'work' ? 'https://www.myinstants.com/media/sounds/alarm_clock.mp3': 'https://www.myinstants.com/media/sounds/gta-san-andreas-keep-up-motherfucker1.mp3'} />
      </div>
    );
  }
}

export default Pomodoro;
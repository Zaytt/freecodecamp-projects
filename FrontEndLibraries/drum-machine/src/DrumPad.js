import React, { Component } from 'react';

class DrumPad extends Component{
  
  constructor(props){
    super(props);
    this.id =  this.props.data.id;
    this.letter =  this.props.data.letter;
    this.sound = this.props.data.sound;
    
    this.play = this.play.bind(this);
  }

  
  play(){
    let clip = document.getElementById(this.props.data.letter);
    clip.play();
  }
  
  render(){
    return (
      <div className ="drum-pad" onClick={this.play}>
        <p> {this.letter} </p>
        <audio id={this.letter} className = "clip">
          <source src={this.sound} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio> 
      </div>
    );
  }
  
}

export default DrumPad;
import React, { Component } from 'react';

class DrumPad extends Component{
  
  constructor(props){
    super(props);
    this.id =  this.props.data.id;
    this.letter =  this.props.data.letter;
    this.sound = this.props.data.sound;  
    this.updateSound =  this.props.updateCurrentSound;
    
    this.play = this.play.bind(this);
    this.activatePad = this.activatePad.bind(this);
    this.deactivatePad = this.deactivatePad.bind(this);
    this.state = {
      isActive : false
    }
  }

  play(){
    let clip = document.getElementById(this.props.data.letter);
    
    clip.load();
    this.activatePad();
    clip.play();
    setTimeout(this.deactivatePad,200);
    this.props.updateCurrentSound(this.id);
    
  }
  
  activatePad(){
    this.setState({
      isActive: true
    });
  }
  
  deactivatePad(){
    this.setState({
      isActive: false
    });
  }
  
  
  
  render(){
    return (
      <div id={this.id} className = {this.state.isActive ? 'drum-pad light-up' : 'drum-pad'} onClick={this.play}>
        <p> {this.letter} </p>
        <audio  id={this.letter } className = "clip" src={this.sound} />
      </div>
    );
  }
  
}

export default DrumPad;
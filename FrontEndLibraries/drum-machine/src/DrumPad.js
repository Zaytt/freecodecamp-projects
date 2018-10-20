import React, { Component } from 'react';

class DrumPad extends Component{
  
  constructor(props){
    super(props);
    this.id =  this.props.data.id;
    this.letter =  this.props.data.letter;
    this.sound = this.props.data.sound;  
    this.updateSound =  this.props.updateCurrentSound;
    
    this.play = this.play.bind(this);
    console.log(this);
  }

//  componentDidMount(){
//    document.getElementById(this.letter).addEventListener("keydown", function(event){
//      //do something on keydown
//      console.log("pressing key");
//      if(event.keyCode === 81){
//          this.play();
//      }
//    });
//    
//  }
  play(){
    let clip = document.getElementById(this.props.data.letter);
    
    clip.load();
    clip.play();
    this.props.updateCurrentSound(this.id);
    
  }
  
  render(){
    return (
      <div id={this.id} className ="drum-pad" onClick={this.play}>
        <p> {this.letter} </p>
        <audio  id={this.letter } className = "clip" src={this.sound} />
      </div>
    );
  }
  
}

export default DrumPad;
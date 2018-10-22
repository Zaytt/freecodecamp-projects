import React, {Component} from 'react';
import './Controls.css';

class Controls extends Component{
  
  constructor(props){
    super(props);
    
    
  }

  
  render(){
    
    return (
      <div id="controls-container">
        <div id="display"><p>{this.props.sound}</p></div>
        
      </div>
    );
  }
}

export default Controls;
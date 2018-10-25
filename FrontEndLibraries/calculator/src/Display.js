import React, {Component} from 'react';

class Display extends Component{
  
  render(){
    return (
      <div id="screen">
        <div id="operations">{this.props.exp}</div>
        <div id="display">{this.props.result}</div>
      </div>
    );
  }
}

export default Display;
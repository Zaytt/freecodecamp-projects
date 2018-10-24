import React, {Component} from 'react';

class Button extends Component{
  
  
  render(){
    const gridArea = { gridArea : this.props.gridArea};
    let buttonClass = '';
    switch (this.props.number){
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
        buttonClass = 'button silver';
        break;
      case '/':
      case 'x':
      case '-':
      case '+':
      case '%':
        buttonClass = 'button purple';
        break;
      case '=':
        buttonClass = 'button pink';
        break;
      case 'AC':
        buttonClass = 'button salmon';
        break;
    }
    
    return(
      <div id={this.props.id} style= {gridArea} className={buttonClass}><p>{this.props.number}</p></div>
    );
  }
}

export default Button;
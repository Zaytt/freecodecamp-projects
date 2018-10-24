import React, {Component} from 'react';
import Display from './Display.js';
import Button from './Button.js';
import './Calculator.css';

const buttons = [ {key: 'AC', value: 'clear'}, 
                  {key: '%', value: 'percentage'}, 
                  {key: '/', value: 'div'}, 
                  {key: '7', value: 'seven'}, 
                  {key: '8', value: 'eight'}, 
                  {key: '9', value: 'nine'}, 
                  {key: 'x', value: 'mult'}, 
                  {key: '4', value: 'four'}, 
                  {key: '5', value: 'five'}, 
                  {key: '6', value: 'six'},
                  {key: '-', value: 'subs'}, 
                  {key: '1', value: 'one'}, 
                  {key: '2', value: 'two'}, 
                  {key: '3', value: 'three'}, 
                  {key: '+', value: 'add'}, 
                  {key: '0', value: 'zero'}, 
                  {key: '.', value: 'dot'}, 
                  {key: '=', value: 'equal'} ];

class Calculator extends Component{
  
  
  
  render(){
    return(
      <div id="calc-container">
        <Display />
        <div id="pad-container">
          {buttons.map( obj =>(
              <Button id={obj.value} number={obj.key} gridArea= {obj.value} />
            
          ))}
        </div>
      </div>
    );
    
  }
}

export default Calculator;
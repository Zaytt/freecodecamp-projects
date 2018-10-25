import React, {Component} from 'react';
import Display from './Display.js';
import Button from './Button.js';
import * as math from 'mathjs'
import './Calculator.css';

const buttons = [ {key: 'AC', value: 'clear'}, 
                  {key: '%', value: 'module'}, 
                  {key: '/', value: 'divide'}, 
                  {key: '7', value: 'seven'}, 
                  {key: '8', value: 'eight'}, 
                  {key: '9', value: 'nine'}, 
                  {key: 'x', value: 'multiply'}, 
                  {key: '4', value: 'four'}, 
                  {key: '5', value: 'five'}, 
                  {key: '6', value: 'six'},
                  {key: '-', value: 'subtract'}, 
                  {key: '1', value: 'one'}, 
                  {key: '2', value: 'two'}, 
                  {key: '3', value: 'three'}, 
                  {key: '+', value: 'add'}, 
                  {key: '0', value: 'zero'}, 
                  {key: '.', value: 'decimal'}, 
                  {key: '=', value: 'equals'} ];

class Calculator extends Component{
  
  constructor(){
    super();
    
    this.state = {
      expression: '',
      result: '0', 
      equals: false
    };
    
    this.clear = this.clear.bind(this);
    this.updateExpression = this.updateExpression.bind(this);
    this.equals = this.equals.bind(this);
    this.setButtonAction = this.setButtonAction.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.printDigitLimit = this.printDigitLimit.bind(this);
  }
  
  clear = () => {
    this.setState({
      expression: '',
      result: '0'
    });
  }
  
  
  updateExpression = (event) => {
    let symbol = event.target.innerText;
    symbol = symbol === 'x' ? '*' : symbol;
    let exp = this.state.expression;
    let result = this.state.result;
    let newExp = '';
    let newResult = '';
    let lastChar = exp.charAt(exp.length-1);
    
    let regexNumbers =  /([0-9.])/;
    let regexDecimal = /\./;
    let regexZeros = /^0.+/;
    let regexOperators = /[%*\/]/
    
    if(result == 'DIGIT LIMIT MET')
      return;
    
    
    //Checks if the inputted symbol is a number or an operator
    if(regexNumbers.test(symbol)){
      if(this.state.equals){
        this.clear();
        this.setState({equals: false});
        newExp = symbol;
        newResult = symbol;
      } else 
      if(result.length > 15){
        this.printDigitLimit();
        return;
      }else
      if(!regexNumbers.test(lastChar)){
        newResult = symbol;
        newExp = exp.concat(symbol);
      } else
      //Checks if a dot is already in the input
      if(symbol === '.'&& regexDecimal.test(result)){
        newExp = exp;
        newResult = result;
      } else {
        newExp = exp.concat(symbol);
        //If last input was a zero or an operator, replace it with the new input
        newResult = result === '0' ? symbol : result.concat(symbol);
      }
    } else {
      if(this.state.equals){
        this.setState({equals: false});
        newExp = result.concat(symbol);
        newResult = symbol;
      } else
      if(exp.length === 0 && regexOperators.test(symbol)){
        newExp = exp;
        newResult = result;
      } else 
 
      //Checks if the last input was already an operator
      if(!regexNumbers.test(lastChar)){
        newResult = symbol;
        newExp = exp.slice(0, -1).concat(symbol);
      } else {
        newResult = symbol;
        newExp = exp.concat(symbol);  
      }
      
      
    }
    
    
    
    this.setState(
      { expression: newExp, result: newResult}
    );
  }
  
  printDigitLimit(){
    let temp = this.state.result;
    this.updateResult('DIGIT LIMIT MET');
    setTimeout(function () { this.updateResult(temp); }.bind(this), 1500);
    
  }
  
  updateResult = (result) =>{
    //DISPLAY THE TYPED SYMBOL
    this.setState({result: result});
  }
  
  equals = () => {
    this.setState({equals: true})
    if(this.state.expression.length == 0)
      return;
    let newResult = math.format(math.eval(this.state.expression), 13);
    this.setState({
      result: newResult
    });
  }
  
  setButtonAction = (symbol) => {
    let action = '';
    switch(symbol){
      case 'AC':
        action = this.clear;
        break;
      case '=':
        action = this.equals;
        break;
      default:
        action = this.updateExpression;
        break;
    }
    return action;
  }
  
  render(){
    return(
      <div id="calc-container">
        <Display exp = {this.state.expression} result={this.state.result}/>
        <div id="pad-container">
          {buttons.map( obj =>(
              <Button key={obj.key} id={obj.value} number={obj.key} gridArea= {obj.value} update={this.setButtonAction(obj.key)}/>
            
          ))}
        </div>
      </div>
    );
    
  }
}

export default Calculator;
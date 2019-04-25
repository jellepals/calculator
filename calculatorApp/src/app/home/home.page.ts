import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  userIsCurrentlyTyping: boolean = false;
  displayValue: string; 
  currentOperand: string;
  errorMessage: string;
  get currentValue(){
    return parseFloat(this.displayValue)
  };
  accumulator: number;

  constructor(){
    this.allClear();
  }

  touchDigit(event){
    let digit = event.srcElement.innerText;
    if(!this.userIsCurrentlyTyping){
      this.displayValue = digit; 
      this.userIsCurrentlyTyping = true;
    } else {
      this.displayValue = this.displayValue + digit; 
    }
  }

  touchBinOp(event){
    this.currentOperand = event.srcElement.innerText;
    this.accumulator = this.currentValue;
    this.userIsCurrentlyTyping = false; 
  }

  touchUnOp(event){
    this.currentOperand = event.srcElement.innerText;
    switch(this.currentOperand){
      case '%': this.displayValue = (this.currentValue/100).toString();  break;
      case '+/-': this.displayValue = (-1*this.currentValue).toString();  break;
      case 'Rand': this.displayValue = Math.random().toString(); break;
      case "√": this.displayValue = (Math.sqrt(this.currentValue)).toString(); break;
      default: this.errorMessage = `Onbekende operator $(this.currentOperand)`; break;
    }
  }

  touchEquals(){
    switch(this.currentOperand){
      case "-": this.displayValue = (this.accumulator - this.currentValue).toString(); break;
      case "+": this.displayValue = (this.accumulator + this.currentValue).toString(); break;
      case "+/-": this.displayValue = (this.accumulator / this.currentValue).toString(); break;
      case "*": this.displayValue = (this.accumulator * this.currentValue).toString(); break;
      default: this.errorMessage = `Onbekende operator $(this.currentOperand)`; break;
    }
    this.userIsCurrentlyTyping = false;
  }

  allClear(){
    this.displayValue = "0"; 
    this.userIsCurrentlyTyping = false;
    this.errorMessage = '';
  }

}

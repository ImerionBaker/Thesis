import { LightningElement } from 'lwc';
export default class hello extends LightningElement {
  greeting = 'World';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template:`
  <button nbbutton *ngIf="!value">{{value}}</button>
  <button nbButton hero status="success" *ngIf="value == 'X'">{{ value }}</button>
  <button nbButton hero status="info" *ngIf="value == 'O'">{{ value }}</button>
  `,
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() value: 'X' | 'O';
  
  constructor() {
    this.value = 'O';
  }
}

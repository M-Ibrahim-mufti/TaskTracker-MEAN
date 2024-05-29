
// Imports use in this component
import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnChanges {

  //creating task visibility variable of type boolean
  buttonTitle?:string = 'Add Task';
  taskVisibility?:boolean;
  
  // defining prop variable of type string
  @Input() buttonName?: string;
  
  // this line of code is creating a custom event that is emitting an object with the value of { fieldVisibility } set to boolean 
  @Output() taskVisible = new EventEmitter<{fieldVisibility: boolean;}>()
  
  constructor() {}
  
  // a function a that is setting the value of taskVisibility to its alternative
  setTaskVisibility():void {
    this.taskVisibility = !this.taskVisibility;
    if(this.taskVisibility) {
      this.buttonTitle = 'Close Task';
    }
    else {
      this.buttonTitle = 'Add Task';
    }
    // this line of code is emitting the custom event that holds the value in fieldVisibility assigned with taskVisibility 
    this.taskVisible.emit({fieldVisibility: this.taskVisibility})
  }

  ngOnChanges(): void { }
}

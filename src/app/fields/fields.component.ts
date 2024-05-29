import { NgIf } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import axios from "axios"
@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [NgIf],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.css'
})
export class FieldsComponent implements OnInit {

  // Variable declarations 
  taskId?:number
  taskTitle?:string
  taskDescription?:string
  taskReminder?:boolean

  // declaration of prop with the type of boolean
  @Input() toggleFieldVisibility?: boolean; 
  @Input() getTask!:() => void 
  
  // creating a custom event with the saveTask which will be an object with taskId, taskTitle, TaskDescription, taskReminder with their respected data type
  // @Output() saveTask = new EventEmitter<{taskId:number; taskTitle:string; taskDescription: string; taskReminder:boolean;}>()
  @Output() taskInserted: EventEmitter<void> = new EventEmitter<void>();
  constructor () {

    // Initially stating the values of declared variables
    this.taskId = 0;
    this.taskTitle = "";
    this.taskDescription = "";
    this.taskReminder = false;
  }

  // on change method in Angular 
  setTaskTitle(event:Event):void {
    const inputElement = event.target as HTMLInputElement;
    this.taskTitle = inputElement.value;
  }

  setTaskDescription(event:Event):void {
    const inputElement = event.target as HTMLInputElement;
    this.taskDescription = inputElement.value;
  }

  setTaskReminder(event:Event):void {
    const inputElement = event.target as HTMLInputElement;
    this.taskReminder = inputElement.checked;
  }

  // Handle submission of task if any field is empty alert with error and return
  async handleSubmit():Promise<void> {
    if(this.taskTitle == '' || this.taskDescription == '') { alert("Fields cannot be blank"); return; }
    try {
      const response = await axios.post('http://localhost:5000/insertData', {
        TaskName: this.taskTitle,
        TaskDescription: this.taskDescription,
        TaskStatus: this.taskReminder
      })
      this.taskInserted.emit();
      console.log(response);
    }
    catch (err) {
      console.log(err);
    }
  }
  // emitting the saveTask event which will hold the values of tasks;
    // this.saveTask.emit({
    //   taskId:this.taskId!++,
    //   taskTitle:this.taskTitle!,
    //   taskDescription: this.taskDescription!,
    //   taskReminder: this.taskReminder!
    // })  

  ngOnInit(): void { 
  }
}

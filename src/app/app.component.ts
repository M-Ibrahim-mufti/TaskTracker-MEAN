import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { FieldsComponent } from './fields/fields.component';
import { TasksComponent } from './tasks/tasks.component';
import axios from 'axios';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ButtonComponent, FieldsComponent, TasksComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular-practice';
  toggleFieldsVisibility?: boolean
  
  savedTask = new Array;

  constructor(){ }

  // handleTaskSave(task: {taskId:number, taskTitle: string; taskDescription: string; taskReminder: boolean}) :void {
  //   this.savedTask.push(task);
  //   console.log(this.savedTask);
  // }

  toggleFields(toggleVisibility: {fieldVisibility:boolean}):void{
    this.toggleFieldsVisibility = toggleVisibility.fieldVisibility    
  }

  async getTasks():Promise<void>{
    try {
      const task = await axios.get("http://localhost:5000/retrieveTasks")
      this.savedTask = task.data;
    } catch(error) {
      console.log(error)
    }
  }

  onTaskInserted():void {
    this.getTasks();
  }
  ngOnInit():void {
    this.getTasks();
  }

}

import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, NgClass ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnChanges{

  // setting the props value and assigning it with array of any type
  @Input() savedTask: any;

  // creating an object or array
  assignedTask = new Array;

  constructor () {}

  // function that remove task with respect to their ids
  removeTasks(taskId: string):void {
    try {
      const response = axios.delete(`http://localhost:5000/removeTask/${taskId}`)
      this.assignedTask = this.assignedTask.filter((task) => {
        return task._id != taskId;
      })
    } catch(error) {
      console.log(error);
    }
  }

  // setting task reminder to green or red by double clicking with respect to their ids  
   setTaskReminder(event: Event, id: number):void {
    this.assignedTask.forEach((task) => {
      if(task._id == id) {
        task.TaskStatus = !task.TaskStatus;
        const update = axios.patch(`http://localhost:5000/updateStatus/${id}`, {
          TaskStatus: !task.TaskStatus
        })
      }
    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.assignedTask = this.savedTask
  }

}

import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Row, Task } from '../model/kanban';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TaskComponent } from '../task/task';

@Component({
  selector: 'app-kanban',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, TaskComponent],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css'
})
export class Kanban {

  
  
  rows: Row[] = [];
  private nextTaskId = 1;

  addRow() {
    this.rows.push({
      title: 'New Column',
      taskInput: '',
      tasks: []
    });
    this.saveRow()
    
  }
  saveRow(){
    let parsed = JSON.stringify(this.rows)
    localStorage.setItem('rows', parsed)
  }
  updateRow(){
    let parsed = JSON.stringify(this.rows)
    localStorage.removeItem('rows')
    localStorage.setItem('rows', parsed)
  }

  addTask(row: Row) {
      const newTask: Task = {
        id: this.nextTaskId++,
        title: row.taskInput,
        description: ''
      };
      row.tasks.push(newTask);
      row.taskInput = '';
      this.updateRow()

  }

  deleteTask(row: Row, taskId: number) {
    row.tasks = row.tasks.filter(task => task.id !== taskId);
      this.updateRow()

  }

  updateTask(row: Row, updatedTask: Task) {
    const index = row.tasks.findIndex(task => task.id === updatedTask.id);
      row.tasks[index] = updatedTask;
      this.updateRow()

  }
}

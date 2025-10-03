import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { Row, Task } from '../model/kanban';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TaskComponent } from '../task/task';
import gsap from 'gsap';
import { timeout } from 'rxjs/internal/operators/timeout';

@Component({
  selector: 'app-kanban',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, TaskComponent, CdkDrag, CdkDragHandle, CdkDropList],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css'
})
export class Kanban implements OnInit{
  // Sur le mount du component prends les données dans le local storage si elles existent puis angular s'occupe de rerender
  ngOnInit(): void {
    //rotate and move elements with a class of "box" ("x" is a shortcut for a translateX() transform) over the course of 1 second.
    gsap.to("#divtest", { opacity: 0 })
    gsap.to(".kanban", {duration: 1 })
    gsap.to("#divtest", { opacity: 1 })


    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      this.rows = JSON.parse(savedRows);
    }
  }

   message :string = ''
  
  
  
  rows: Row[] = []; // déclaration d'un array de type Row (voir /model)
  private nextTaskId = 1; // ID pour track les task

  addRow() { // Ajoute un Row
    this.rows.push({
      title: '',
      taskInput: '',
      status: "Not Started",
      tasks: []
    });
    this.saveRow()
    this.message = 'Row Added' 
    
  }
  saveRow(){ // Save la row dans le localstorage 
    let parsed = JSON.stringify(this.rows) // Serialization Json
    localStorage.setItem('rows', parsed)
    this.message = 'Board Saved'
  }
  updateRow(){ // Parse les données de toute les raws, remove toutes l'élement rows non à jour et set du Row
    let parsed = JSON.stringify(this.rows)
    localStorage.removeItem('rows')
    localStorage.setItem('rows', parsed)
    this.message = 'Board Updated'
  }
// Ajout de la task
  addTask(row: Row) {
      const newTask: Task = {
        id: this.nextTaskId++,
        title: row.taskInput,
        description: '',
        date: Date.now()
      };
      row.tasks.push(newTask);
      row.taskInput = '';
      this.updateRow()
      this.message = 'Task Added'

  }
  // delete puis update
  deleteTask(row: Row, taskId: number) {
    row.tasks = row.tasks.filter(task => task.id !== taskId);
      this.updateRow()
      this.message = 'Task Deleted'

  }

  updateTask(row: Row, updatedTask: Task) {
    const index = row.tasks.findIndex(task => task.id === updatedTask.id);
      this.updateRow()
      row.tasks[index] = updatedTask;
      this.updateRow()  
      this.message = 'Task Updated'
  }

  // Enleve toutes les data
  clearAll(){ 
    localStorage.removeItem('rows')
    this.rows = []
  }
}

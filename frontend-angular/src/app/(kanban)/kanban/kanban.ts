import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
export class Kanban implements OnInit{
  // Sur le mount du component prends les données dans le local storage si elles existent puis angular s'occupe de rerender
  ngOnInit(): void {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      this.rows = JSON.parse(savedRows);
    }
  }

  
  
  rows: Row[] = []; // déclaration d'un array de type Row (voir /model)
  private nextTaskId = 1; // ID pour track les task

  addRow() { // Ajoute un Row
    this.rows.push({
      title: 'New Column',
      taskInput: '',
      tasks: []
    });
    this.saveRow()
    
  }
  saveRow(){ // Save la row dans le localstorage 
    let parsed = JSON.stringify(this.rows) // Serialization Json
    localStorage.setItem('rows', parsed)
  }
  updateRow(){ // Parse les données de toute les raws, remove toutes l'élement rows non à jour et set du Row
    let parsed = JSON.stringify(this.rows)
    localStorage.removeItem('rows')
    localStorage.setItem('rows', parsed)
  }
// Ajout de la task
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
  // delete puis update
  deleteTask(row: Row, taskId: number) {
    row.tasks = row.tasks.filter(task => task.id !== taskId);
      this.updateRow()

  }

  updateTask(row: Row, updatedTask: Task) {
    const index = row.tasks.findIndex(task => task.id === updatedTask.id);
      this.updateRow()
      row.tasks[index] = updatedTask;
      this.updateRow()  
  }

  // Enleve toutes les data
  clearAll(){ 
    localStorage.removeItem('rows')
    this.rows = []
  }
}

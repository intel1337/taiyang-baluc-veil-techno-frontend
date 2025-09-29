import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../model/kanban';

@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css'
})

export class TaskComponent {
  @Input() task: Task;
  @Output() deleteTask = new EventEmitter<number>();
  @Output() updateTask = new EventEmitter<Task>();

 
  
  showMenu = false;
  editMode = false;


  editedTask: Task = { id: 0, title: '', description: '' };

  openMenu() {
    this.showMenu = true;
    this.editedTask = { id: this.task.id, title: this.task.title, description: this.task.description };
  }

  closeMenu() {
    this.showMenu = false;
    this.editMode = false;
  }

  startEdit() {
    this.editMode = true;
  }

  saveTask() {
    this.updateTask.emit(this.editedTask);
    this.task.id = this.editedTask.id;
    this.task.title = this.editedTask.title;
    this.task.description = this.editedTask.description;
    this.editMode = false;
  }

  onDescriptionChange() {
    this.updateTask.emit(this.task);

  }

  confirmDelete() {
    this.deleteTask.emit(this.task.id);
    this.closeMenu();

  }
 
}

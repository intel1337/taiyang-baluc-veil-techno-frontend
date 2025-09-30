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
  @Input() task!: Task; // ! pour éviter une erreur
  @Output() deleteTask = new EventEmitter<number>(); // Signal Customisé pour delete (voir parent)
  @Output() updateTask = new EventEmitter<Task>();// Signal Customisé pour update

 
  // States
  showMenu = false; 
  editMode = false;

  
  editedTask: Task = { id: 0, title: '', description: '' };
  // Ouvre le Menu
  openMenu() {
    this.showMenu = true;
    this.editedTask = { id: this.task.id, title: this.task.title, description: this.task.description };
  }
  // Ferme le Menu
  closeMenu() {
    this.showMenu = false;
    this.editMode = false;
  }
  // Mode edit
  startEdit() {
    this.editMode = true;
  }
  // Sauvegarde la task
  saveTask() {
    this.updateTask.emit(this.editedTask);

    this.task.id = this.editedTask.id;
    this.task.title = this.editedTask.title;
    this.task.description = this.editedTask.description;
    this.editMode = false;
  }
  // Envoi de signal on change
  onDescriptionChange() {
    this.updateTask.emit(this.task);

  }
  // Envoi de signal on call
  confirmDelete() {
    this.deleteTask.emit(this.task.id);
    this.closeMenu();

  }
 
}

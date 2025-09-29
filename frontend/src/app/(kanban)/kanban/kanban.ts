import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Row, Task } from '../model/kanban';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-kanban',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css'
})
export class Kanban {
  rows: Row[] = [];

  addRow() {
    this.rows.push({
      title: 'New Column',
      taskInput: '',
      tasks: []
    });
  }

  addTask(row: Row) {
    if (row.taskInput.trim()) {
      row.tasks.push({
        title: row.taskInput.trim()
      });
      row.taskInput = '';
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Row, Task } from '../model/kanban';

@Component({
  selector: 'app-kanban',
  imports: [CommonModule, FormsModule],
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

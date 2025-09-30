import { Injectable } from '@angular/core';
import { Row, Task } from './model/kanban';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  saveRow(row:any, task:Task){
    localStorage.setItem('row', row)

  }

  
  
}

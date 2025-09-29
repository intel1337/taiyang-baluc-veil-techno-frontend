import { Component } from '@angular/core';
import { Row } from '../row/row';


@Component({
  selector: 'app-kanban',
  imports: [Row],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css'
})
export class Kanban {
  counter = [1]
  addNewRow(){
    this.counter.push(1);
    return this.counter
  }
  getCount(){
    return this.counter
  }
  
  
}

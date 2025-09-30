import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-row',
  imports: [],
  templateUrl: './row.html',
  styleUrl: './row.css'
})
export class Row {
  @Output() newRowEvent = new EventEmitter<Row>
  
  addNewRow(){
    this.newRowEvent.emit()
  }
  saveRow(){
    
  }

}

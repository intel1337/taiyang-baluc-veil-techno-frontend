import { defineStore } from 'pinia'
import type { Row, Task } from '~/models/dto'

export const useKanbanStore = defineStore('kanban', {
  state: () => ({
    rows: [] as Row[],
  }),
  actions: {
    setRows(rows: Row[]) {
      this.rows = rows
      localStorage.setItem('rows', JSON.stringify(rows))
    },
    addRow(row: Row) {
      this.rows.push(row)

    },
    addTask(rowId: number, task: Task) {
      const row = this.rows.find(r => r.id === rowId)
      if (row) {
        row.tasks.push(task)
        localStorage.setItem('rows', JSON.stringify(this.rows))
      }
    }
    
  }
})

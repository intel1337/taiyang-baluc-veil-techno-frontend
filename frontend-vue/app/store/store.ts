import { defineStore } from 'pinia'
import type { Row } from '~/models/dto'

export const useKanbanStore = defineStore('kanban', {
  state: () => ({
    rows: [] as Row[]
  }),
  actions: {
    setRows(rows: Row[]) {
      this.rows = rows
      localStorage.setItem('rows', JSON.stringify(rows))
    },
    addRow(row: Row) {
      this.rows.push(row)

    }
  }
})

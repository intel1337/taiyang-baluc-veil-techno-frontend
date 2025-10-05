<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useKanbanStore } from '~/store/store'
import { onMounted } from 'vue'
import type { Row, Task } from '~/models/dto'

const kanban = useKanbanStore()
const { rows } = storeToRefs(kanban)

onMounted(() => {
  const saved = localStorage.getItem('rows')
  if (saved) {
      const parsed = JSON.parse(saved)
        kanban.setRows(parsed)

  }
})

function addRow() {
  kanban.addRow({
    id: Date.now(),
    title: 'Nouvelle colonne',
    taskInput: '',
    tasks: [],
    status: 'open'
  })
}

function clear() {
  localStorage.removeItem('rows')
  kanban.setRows([])
}

function addTask(row: Row) {
  const content = (row.taskInput || '').trim()
  if (!content) return
  const task: Task = {
    id: Date.now(),
    title: content,
    description: '',
    date: Date.now()
  }
  kanban.addTask(row.id, task)
  row.taskInput = ''
}
</script>

<template>
  <div>
    <button @click="addRow">New row</button>
    <button @click="clear">delete ALll</button>

    <div v-for="(row, index) in rows" :key="row.id || index">
      <textarea v-model="row.title" placeholder="Column Title"></textarea>
      <textarea v-model="row.taskInput" placeholder="Add Task"></textarea>
      <textarea v-model="row.status" placeholder="Not Started"></textarea>

        <button @click="addTask(row)">Add Task</button>

      <div v-for="(task, tIndex) in row.tasks" :key="tIndex">
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

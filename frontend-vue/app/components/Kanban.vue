<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useKanbanStore } from '~/store/store'
import { watch } from 'vue'

const kanban = useKanbanStore()
const { rows } = storeToRefs(kanban)

watch(rows, (newVal) => {
  saveRows()
}, { deep: true })

function addRow() {
  kanban.addRow({
    title: "Nouvelle colonne",
    taskInput: "",
    tasks: [],
  })
}

function saveRows() {
  kanban.setRows(rows.value) 
}
</script>

<template>
  <div>
    <button @click="addRow">New row</button>

    <div v-for="(row, index) in rows" :key="index">
      <textarea v-model="row.title" placeholder="Column Title"></textarea>
      <textarea v-model="row.taskInput" placeholder="Add Task"></textarea>
      <textarea v-model="row.status" placeholder="Not Started"></textarea>

        <button @click="">Add Task</button>

      <div v-for="(task, tIndex) in row.tasks" :key="tIndex">
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

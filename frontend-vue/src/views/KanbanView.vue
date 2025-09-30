<script setup>
import { ref } from 'vue'

const rows = ref([])
let rowIdCounter = 1
let taskIdCounter = 1

function addRow() {
  rows.value.push({
    id: rowIdCounter++,
    title: '',
    taskInput: '',
    tasks: []
  })
}

function addTask(row) {
    row.tasks.push({
      id: taskIdCounter++,
      title: row.taskInput
    })
    row.taskInput = ''
}
</script>

<template>
  <div class="kanban">
    <router-link to="/">Back to Main Page</router-link>
    <button @click="addRow">+ Add a Column</button>

    <div class="rows">
      <div class="row" v-for="row in rows" :key="row.id">
        <textarea v-model="row.title" rows="2" placeholder="Column Title"></textarea>
        <textarea v-model="row.taskInput" rows="3" placeholder="Add Task"></textarea>
        <button @click="addTask(row)">Add</button>

        <div class="tasks-container">
          <div class="task" v-for="task in row.tasks" :key="task.id">
            {{ task.title }}
          </div>
          </div>
      </div>
     </div>
  </div>
</template>

<style scoped>
.kanban {
    height: 100vh;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    margin: 10px;
}

.kanban button, a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    min-height: 40px;
    border-radius: 8px;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    padding: 0 15px;
    margin-bottom: 20px;
    transition: 0.3s ease-in-out;
    text-decoration: none;
}

.kanban > button:hover {
    background-color: green;
}

.rows {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.row {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 20px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    max-width: 35rem;
}

.row button {
    background-color: rgb(0, 0, 0);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 10px;
    cursor: pointer;
    padding: 10px 12px;
    margin: 10px;
    
}

.row button:hover {
    background-color: darkblue;
}

.row textarea {
    text-align: center;
    width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 20px;
    margin-bottom: 10px;
    resize: vertical;
}

.tasks-container {
    margin-top: 10px;
}

.task {
    background-color: white;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;

}
</style>
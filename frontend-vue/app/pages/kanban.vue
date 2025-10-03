<script setup>
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Kanban Board</h1>
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">To Do</h2>
        <!-- To Do items will go here -->
      </div>
      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">In Progress</h2>
        <!-- In Progress items will go here -->
      </div>
      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">Done</h2>
        <!-- Done items will go here -->
      </div>
    </div>
  </div>
</template>
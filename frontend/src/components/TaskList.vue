<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">All Tasks</h2>
    <div v-if="loading">Loading tasks...</div>
    <div v-else-if="tasks.length === 0">No tasks available.</div>
    <ul class="space-y-2">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="bg-white shadow rounded p-4 border border-gray-200"
      >
        <h3 class="font-semibold text-lg">{{ task.title }}</h3>
        <p class="text-gray-600">{{ task.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchTasksByFilter } from '../services/taskService'

const tasks = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const result = await fetchTasksByFilter('all')
    tasks.value = result
  } catch (err) {
    console.error('Failed to fetch tasks', err)
  } finally {
    loading.value = false
  }
})
</script>

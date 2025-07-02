<template>
  <div class="task-page">
    <div class="task-header">
      <h1 class="task-title">Shared Todo List</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>

    <div class="task-box">
      <div class="task-toolbar">
        <h2 class="task-subtitle">Your Tasks</h2>
        <select v-model="filter" class="task-filter">
          <option value="all">All Tasks</option>
          <option value="my">My Tasks</option>
          <option value="shared">Shared Tasks</option>
        </select>
      </div>

      <form @submit.prevent="addTask" class="task-form">
        <input
          v-model="newTask"
          type="text"
          placeholder="New task title"
          class="task-input"
          required
        />
        <button type="submit" class="add-button">Add</button>
      </form>

      <table class="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Shared</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in filteredTasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.owner }}</td>
            <td>{{ task.shared ? 'Yes' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()

const logout = async () => {
  await signOut(auth)
  router.push('/login')
}

const tasks = ref([
  { id: 1, title: 'Task 1', owner: 'me', shared: false },
  { id: 2, title: 'Task 2', owner: 'me', shared: true },
  { id: 3, title: 'Task 3', owner: 'someone', shared: true },
  { id: 4, title: 'Task 4', owner: 'me', shared: false }
])

const filter = ref<'all' | 'my' | 'shared'>('all')
const newTask = ref('')

const filteredTasks = computed(() => {
  if (filter.value === 'my') {
    return tasks.value.filter(task => task.owner === 'me')
  } else if (filter.value === 'shared') {
    return tasks.value.filter(task => task.shared)
  }
  return tasks.value
})

const addTask = () => {
  tasks.value.push({
    id: tasks.value.length + 1,
    title: newTask.value,
    owner: 'me',
    shared: false
  })
  newTask.value = ''
}
</script>

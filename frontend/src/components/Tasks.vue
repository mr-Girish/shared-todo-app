<template>
  <div class="task-page">
    <div class="task-header">
      <h1 class="task-title">Shared Todo List</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>

    <div class="task-box">
      <div class="task-toolbar">
        <h2 class="task-subtitle">Your Tasks</h2>
        <select v-model="filter" class="task-filter" @change="fetchTasks">
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.owner_id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { fetchTasksByFilter, createTaskApi } from '../services/taskService'

const router = useRouter()
const auth = getAuth()

const tasks = ref<any[]>([])
const newTask = ref('')
const filter = ref<'all' | 'my' | 'shared'>('all')

const logout = async () => {
  await signOut(auth)
  router.push('/login')
}

const fetchTasks = async () => {
  const user = auth.currentUser
  const uid = user?.uid

  try {
    const result = await fetchTasksByFilter(filter.value, uid)
    tasks.value = result
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const addTask = async () => {
  const user = auth.currentUser
  if (!user) return

  try {
    await createTaskApi({
      title: newTask.value,
      description: '',
      firebase_uid: user.uid
    })
    newTask.value = ''
    await fetchTasks()
  } catch (error) {
    console.error('Error adding task:', error)
  }
}

onMounted(() => {
  fetchTasks()
})
</script>

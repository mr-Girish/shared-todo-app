<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>Share Task</h3>
      <ul v-if="users.length > 0">
        <li v-for="user in users" :key="user.id">
          <label>
            <input type="checkbox" v-model="selectedUsers" :value="user.id" />
            {{ user.full_name }}
          </label>
        </li>
      </ul>
      <p v-else>No more users to share this task with.</p>
      <button @click="shareTask" :disabled="selectedUsers.length === 0">Share</button>
      <button @click="$emit('close')">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUnsharedUsers } from '../services/taskService'
import { shareTaskApi } from '../services/taskService'

const props = defineProps<{
  taskId: string
}>()

const emit = defineEmits(['close'])

const users = ref<any[]>([])
const selectedUsers = ref<string[]>([])

const fetchUnsharedUsers = async () => {
  try {
    users.value = await getUnsharedUsers(props.taskId)
  } catch (err) {
    console.error('Error fetching unshared users:', err)
  }
}

const shareTask = async () => {
  try {
    await shareTaskApi(props.taskId, selectedUsers.value)
    alert('Task shared successfully!')
    selectedUsers.value = []
    emit('close')
  } catch (err) {
    console.error('Error sharing task:', err)
  }
}

onMounted(() => {
  fetchUnsharedUsers()
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
}
</style>

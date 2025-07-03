<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3 class="modal-title">Share Task</h3>
      
      <div v-if="users.length > 0" class="user-list">
        <label v-for="user in users" :key="user.id" class="user-item">
          <input type="checkbox" v-model="selectedUsers" :value="user.id" />
          {{ user.full_name }}
        </label>
      </div>

      <p v-else class="no-users">No more users to share this task with.</p>

      <div class="modal-actions">
        <button class="share-btn" @click="shareTask" :disabled="selectedUsers.length === 0">
          Share
        </button>
        <button class="cancel-btn" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUnsharedUsers, shareTaskApi } from '../services/taskService'

const props = defineProps<{
  taskId: string
}>()

const emit = defineEmits(['close', 'shared']) 
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
    selectedUsers.value = []
    emit('shared') 
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
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.no-users {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.share-btn,
.cancel-btn {
  flex: 1;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.share-btn {
  background-color: #3f83f8;
  color: white;
}

.share-btn:disabled {
  background-color: #a7c1f5;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #e2e2e2;
}
</style>


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
          <option value="self">My Tasks</option>
          <option value="shared">Shared Tasks</option>
        </select>
        <button class="create-task-button" @click="openCreateModal">Create Task</button>
      </div>

      <table class="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Shared Users</th>
            <th>Actions</th>
          </tr>
        </thead>
      <tbody>
  <tr v-if="tasks.length === 0">
    <td colspan="5" style="text-align: center; padding: 1rem;">No tasks found.</td>
  </tr>
  <tr v-for="(task, index) in tasks" :key="task.id" v-else>
    <td>{{ index + 1 }}</td>
    <td>{{ task.title }}</td>
    <td>{{ task.owner.full_name }}</td>
    <td>
      <ul v-if="task.shared_users?.length">
        <li v-for="user in task.shared_users" :key="user.id">
          {{ user.full_name }}
        </li>
      </ul>
      <span v-else>-</span>
    </td>
    <td>
      <button class="action-button" @click="openShareModal(task)">Share</button>
      <button class="action-button" @click="startEdit(task)">Edit</button>
      <button class="action-button delete" @click="deleteTask(task.id)">Delete</button>
    </td>
  </tr>
</tbody>

      </table>
    </div>

    <div v-if="showTaskModal" class="modal-overlay">
      <div class="modal-content">
        <TaskForm
          v-model="newTask"
          @submit="handleSubmit"
          :editing="editing"
        />
        <button @click="closeTaskModal" class="modal-close">Close</button>
      </div>
    </div>

    <ShareTaskModal
      v-if="showModal && selectedTaskId"
      :taskId="selectedTaskId"
      @close="showModal = false"
      @shared="handleShared"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import {
  fetchTasksByFilter,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../services/taskService";
import ShareTaskModal from "../components/ShareTaskModal.vue";
import TaskForm from "../components/TaskForm.vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const auth = getAuth();
const toast = useToast();

const tasks = ref<any[]>([]);
const newTask = ref("");
const filter = ref<"all" | "self" | "shared">("all");

const showModal = ref(false);
const selectedTaskId = ref<string | null>(null);

const editing = ref(false);
const editingTaskId = ref<string | null>(null);

const showTaskModal = ref(false);

const logout = async () => {
  await signOut(auth);
  router.push("/login");
};

const handleShared = async () => {
  showModal.value = false;
  try {
    await fetchTasks();
    toast.success("Task shared successfully!");
  } catch (err) {
    toast.error("Failed to update shared users.");
  }
};

const openCreateModal = () => {
  editing.value = false;
  newTask.value = "";
  showTaskModal.value = true;
};

const closeTaskModal = () => {
  showTaskModal.value = false;
  editing.value = false;
  editingTaskId.value = null;
  newTask.value = "";
};

const fetchTasks = async () => {
  const user = auth.currentUser;
  const uid = user?.uid;
  try {
    const result = await fetchTasksByFilter(filter.value, uid);
    tasks.value = result;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    toast.error("Failed to fetch tasks");
  }
};

const handleSubmit = async (title: string) => {
  if (editing.value) {
    await updateTask(title);
  } else {
    await addTask(title);
  }
  closeTaskModal(); 
};

const addTask = async (title: string) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await createTaskApi({
      title,
      description: "",
      firebase_uid: user.uid,
    });
    await fetchTasks();
    toast.success("Task added successfully!");
  } catch (error) {
    console.error("Error adding task:", error);
    toast.error("Failed to add task.");
  }
};

const startEdit = (task: any) => {
  newTask.value = task.title;
  editingTaskId.value = task.id;
  editing.value = true;
  showTaskModal.value = true;
};

const updateTask = async (title: string) => {
  if (!editingTaskId.value) return;
  try {
    await updateTaskApi(editingTaskId.value, title);
    await fetchTasks();
    toast.success("Task updated successfully!");
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Failed to update task.");
  }
};

const deleteTask = async (taskId: string) => {
  try {
    await deleteTaskApi(taskId);
    await fetchTasks();
    toast.success("Task deleted successfully!");
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Failed to delete task.");
  }
};

const openShareModal = (task: any) => {
  selectedTaskId.value = task.id;
  showModal.value = true;
};

onMounted(() => {
  fetchTasks();
});
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  min-width: 400px;
}
.modal-close {
  margin-top: 1rem;
  background: #ccc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}
.create-task-button {
  margin-left: auto;
  background: #3f83f8;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
}
</style>

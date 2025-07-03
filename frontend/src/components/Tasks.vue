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

      <TaskForm v-model="newTask" @submit="handleSubmit" :editing="editing" />

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
          <tr v-for="(task, index) in tasks" :key="task.id">
            <td>{{ index + 1 }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.owner_id }}</td>
            <td>
              <ul v-if="task.shared_users?.length">
                <li v-for="user in task.shared_users" :key="user.id">
                  {{ user.full_name }}
                </li>
              </ul>
              <span v-else>-</span>
            </td>
            <td>
              <button class="action-button" @click="openShareModal(task)">
                Share
              </button>
              <button class="action-button" @click="startEdit(task)">
                Edit
              </button>
              <button class="action-button delete" @click="deleteTask(task.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ShareTaskModal
      v-if="showModal"
      :taskId="selectedTaskId"
      @close="showModal = false"
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

const router = useRouter();
const auth = getAuth();

const tasks = ref<any[]>([]);
const newTask = ref("");
const filter = ref<"all" | "my" | "shared">("all");

const showModal = ref(false);
const selectedTaskId = ref<string | null>(null);

const editing = ref(false);
const editingTaskId = ref<string | null>(null);

const logout = async () => {
  await signOut(auth);
  router.push("/login");
};

const fetchTasks = async () => {
  const user = auth.currentUser;
  const uid = user?.uid;
  try {
    const result = await fetchTasksByFilter(filter.value, uid);
    tasks.value = result;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const handleSubmit = (title: string) => {
  if (editing.value) {
    updateTask(title);
  } else {
    addTask(title);
  }
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
    newTask.value = "";
    await fetchTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

const startEdit = (task: any) => {
  newTask.value = task.title;
  editingTaskId.value = task.id;
  editing.value = true;
};

const updateTask = async (title: string) => {
  if (!editingTaskId.value) return;
  try {
    await updateTaskApi(editingTaskId.value, title);
    editing.value = false;
    editingTaskId.value = null;
    newTask.value = "";
    await fetchTasks();
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

const deleteTask = async (taskId: string) => {
  try {
    await deleteTaskApi(taskId);
    await fetchTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
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

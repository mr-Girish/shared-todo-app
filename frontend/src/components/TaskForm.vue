<!-- src/components/TaskForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <input
      v-model="taskTitle"
      type="text"
      placeholder="New task title"
      class="task-input"
      required
    />
    <button type="submit" class="add-button">
      {{ editing ? 'Update' : 'Add' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
  editing?: boolean
}>()

const emits = defineEmits(['update:modelValue', 'submit'])

const taskTitle = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    taskTitle.value = newVal
  }
)

const handleSubmit = () => {
  emits('submit', taskTitle.value)
  taskTitle.value = ''
}
</script>

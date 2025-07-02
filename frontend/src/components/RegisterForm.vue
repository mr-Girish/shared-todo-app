<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Register</h2>

      <form @submit.prevent="handleRegister">
        <div>
          <label class="login-label">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="login-input"
            required
          />
        </div>
        <div>
          <label class="login-label">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="login-input"
            required
          />
        </div>
        <div>
          <label class="login-label">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            class="login-input"
            required
          />
        </div>
        <button type="submit" class="login-button">Register</button>
      </form>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <p class="login-footer">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const handleRegister = async () => {
  errorMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match"
    return
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Registered:', result.user)
    window.location.href = '/tasks'
  } catch (err: any) {
    if (err.code === 'auth/email-already-in-use') {
      errorMessage.value = 'This email is already registered.'
    } else if (err.code === 'auth/weak-password') {
      errorMessage.value = 'Password should be at least 6 characters.'
    } else {
      errorMessage.value = err.message
    }
  }
}
</script>

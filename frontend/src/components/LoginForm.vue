<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Login</h2>

      <form @submit.prevent="handleLogin">
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
        <button type="submit" class="login-button">Login</button>
      </form>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <p class="login-footer">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useToast } from 'vue-toastification'
import { useUserStore } from '../stores/user'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()

const handleLogin = async () => {
  errorMessage.value = ''
  try {
    const result = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('Logged in:', result.user)
    userStore.setFirebaseUser(result.user)
    const displayName = userStore.firebaseUser?.displayName || 'User'
    toast.success(`Welcome back, ${displayName}!`)

    router.push('/tasks')
  } catch (err: any) {
    if (err.code === 'auth/user-not-found') {
      errorMessage.value = 'User not found. Please register first.'
      toast.error(errorMessage.value)
    } else if (err.code === 'auth/wrong-password') {
      errorMessage.value = 'Incorrect password.'
      toast.error(errorMessage.value)
    } else {
      errorMessage.value = err.message
      toast.error('Login failed.')
    }
  }
}
</script>

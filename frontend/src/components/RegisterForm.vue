<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Register</h2>

      <form @submit.prevent="handleRegister">
        <div>
          <label class="login-label">Full Name</label>
          <input
  v-model="fullName"
  type="text"
  placeholder="Full Name"
  class="login-input"
  required
/>

        </div>
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
import { ref } from "vue";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { syncUser } from "../services/userService";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserStore } from "../stores/user";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const fullName = ref("");

const router = useRouter();
const toast = useToast();
const userStore = useUserStore()


const handleRegister = async () => {
  errorMessage.value = "";

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match";
    toast.error(errorMessage.value);
    return;
  }

  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    await updateProfile(result.user, {
      displayName: fullName.value,
    });

    const dbUser = await syncUser(result.user);
    userStore.setFirebaseUser(result.user)
    userStore.setDbUser(dbUser)
    const displayName = userStore.firebaseUser?.displayName || 'User'

    toast.success(`Registration successful! Welcome ${displayName}!`);
    router.push("/tasks");
  } catch (err: any) {
    if (err.code === "auth/email-already-in-use") {
      errorMessage.value = "This email is already registered.";
    } else if (err.code === "auth/weak-password") {
      errorMessage.value = "Password should be at least 6 characters.";
    } else {
      errorMessage.value = err.message;
    }

    toast.error(errorMessage.value);
  }
};
</script>


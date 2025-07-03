import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from 'firebase/auth'

interface DbUser {
  id: string
  full_name: string
  email: string
  firebase_uid: string
  created_at?: string
}

export const useUserStore = defineStore('user', () => {
  const firebaseUser = ref<User | null>(null)
  const dbUser = ref<DbUser | null>(null)

  const setFirebaseUser = (user: User | null) => {
    firebaseUser.value = user
  }

  const setDbUser = (user: DbUser | null) => {
    dbUser.value = user
  }

  return {
    firebaseUser,
    dbUser,
    setFirebaseUser,
    setDbUser
  }
})

import type { User } from 'firebase/auth'
import axios from 'axios'
export const syncUser = async (user: User) => {
  try {
    console.log("check for the user details",user)
    await axios.post('http://localhost:4001/sync-user', {
      firebase_uid: user.uid,
      email: user.email
    })
  } catch (error) {
    console.error('Error syncing user:', error)
    throw error
  }
}

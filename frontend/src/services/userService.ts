import type { User } from 'firebase/auth'
import axios from 'axios'
export const syncUser = async (user: User) => {
  try {
    console.log("check for the user details",user)
   const res =   await axios.post('http://localhost:4001/sync-user', {
      firebase_uid: user.uid,
      email: user.email,
      displayName: user.displayName
    })
     return res.data.user;
  } catch (error) {
    console.error('Error syncing user:', error)
    throw error
  }
}





export const getAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:4001/get-all-users')
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}



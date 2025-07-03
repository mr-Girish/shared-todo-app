import axios from 'axios'

const API_BASE = 'http://localhost:4001'

export const fetchTasksByFilter = async (filter: string, userId?: string) => {
  const params: any = { filter }
  if (filter !== 'all' && userId) params.user_id = userId
  const response = await axios.get(`${API_BASE}/tasks-list`, { params })
  return response.data
}

export const createTaskApi = async (task: { title: string; description: string; firebase_uid: string }) => {
  const response = await axios.post(`${API_BASE}/create-task`, task)
  return response.data
}

import axios from 'axios'


export const createTask = async (data: {
  title: string
  description: string
  owner_id: string
}) => {
  return axios.post('/tasks', data)
}

export const getTasks = async (filter = 'all', user_id?: string) => {
  const params: any = { filter }
  if (user_id) params.user_id = user_id
  return axios.get('/tasks-list', { params })
}

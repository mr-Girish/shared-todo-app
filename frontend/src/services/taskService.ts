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


export const shareTaskApi = async (task_id: string, user_ids: string[]) => {
  const response = await axios.post(`${API_BASE}/share-task`,{ task_id, user_ids });
    return response.data  
};


export const getUnsharedUsers = async (taskId: string) => {
  const res = await axios.get(`${API_BASE}/unshared-users/${taskId}`);
  return await res.data;
};




export const deleteTaskApi = async (taskId: string) => {
  const res = await axios.delete(`${API_BASE}/delete-task/${taskId}`);
  return await res.data;
};




export const updateTaskApi = async (taskId: string, title: string) => {
  const res = await axios.put(`${API_BASE}/edit-task/${taskId}`, {
    title,
    description: '' 
  });
  return res.data;
};

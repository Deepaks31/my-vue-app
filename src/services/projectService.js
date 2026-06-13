import api from '../api/axios'

export const getProjects = async () => {
  return await api.get('/Projects')
}

export const createProject = async (data) => {
  return await api.post('/Projects', data)
}

export const updateProject = async (id, data) => {
  return await api.put(`/Projects/${id}`, data)
}

export const deleteProject = async (id) => {
  return await api.delete(`/Projects/${id}`)
}
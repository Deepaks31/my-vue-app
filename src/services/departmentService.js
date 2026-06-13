import api from '../api/axios'

export const getDepartments = async () => {
  return await api.get('/Departments')
}

export const createDepartment = async (data) => {
  return await api.post('/Departments', data)
}

export const updateDepartment = async (id, data) => {
  return await api.put(`/Departments/${id}`, data)
}

export const deleteDepartment = async (id) => {
  return await api.delete(`/Departments/${id}`)
}
import api from '../api/axios'

export const getEmployees = async () => {
  return await api.get('/Employees')
}

export const createEmployee = async (data) => {
  return await api.post('/Employees', data)
}

export const deleteEmployee = async (id) => {
  return await api.delete(`/Employees/${id}`)
}

export const updateEmployee = async (id, data) => {
  return await api.put(`/Employees/${id}`, data)
}
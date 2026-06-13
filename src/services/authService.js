import api from '../api/axios'

export const login = async (data) => {
  return await api.post('/Auth/login', data)
}
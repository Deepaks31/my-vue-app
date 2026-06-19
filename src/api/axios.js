import axios from 'axios'
import router from '../router'

const apiUrl = import.meta.env.VITE_API_URL;
console.log("VITE_API_URL is:", apiUrl);

const api = axios.create({
  baseURL: apiUrl || 'https://localhost:7248/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Clear token and state
      localStorage.removeItem('token')
      
      // Redirect to login
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default api
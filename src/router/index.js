import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import QualysView from '../views/QualysView.vue'
import JobsView from '../views/JobsView.vue'
import OrdersView from '../views/OrdersView.vue'
import EmployeesView from '../views/Employees.vue'
import ProjectsView from '../views/Projects.vue'
import DepartmentsView from '../views/Departments.vue'
import LoginView from '../views/Login.vue'
import SignupView from '../views/Signup.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: QualysView,
    meta: { requiresAuth: true }
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: JobsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersView,
    meta: { requiresAuth: true }
  },
  {
    path: '/employees',
    name: 'Employees',
    component: EmployeesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/departments',
    name: 'Departments',
    component: DepartmentsView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/')
  } else if ((to.path === '/' || to.path === '/signup') && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router

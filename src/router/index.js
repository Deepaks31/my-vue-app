import { createRouter, createWebHistory } from 'vue-router'
import QualysView from '../views/QualysView.vue'
import JobsView from '../views/JobsView.vue'
import OrdersView from '../views/OrdersView.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: QualysView
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: JobsView
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

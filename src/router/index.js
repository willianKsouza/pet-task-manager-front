import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import TasksView from '@/views/TasksView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     { path: '/login', name: 'Login', component: LoginView },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: 'dashboard', name: 'dashboard', component: DashboardView },
        { path: 'tasks', name: 'tasks', component: TasksView }
      ]
    }
  ]
})

export default router

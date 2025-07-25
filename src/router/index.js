import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import TasksView from '@/views/TasksView.vue'
import LoginView from '@/views/LoginView.vue'
import SearchView from '@/views/SearchView.vue'
import axios from '@/lib/axios'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'Login', component: LoginView },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
          redirect: { name: 'dashboard-overview' },
          children: [
            {
              path: '',
              name: 'dashboard-overview',
              component: () => import('@/views/dashboard/OverviewView.vue'),
            },
            {
              path: 'members',
              name: 'dashboard-members',
              component: () => import('@/views/dashboard/ListMembersView.vue'),
            },
          ],
        },
        { path: 'tasks', name: 'tasks', component: TasksView },
        { path: 'search', name: 'search', component: SearchView },
      ],
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (!auth.user) {
    await auth.checkAuthOnInit()
  }
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'Login' })
  }

  if (to.name === 'Login' && auth.isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router

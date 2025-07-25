import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/lib/axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)

  async function getUser() {
    try {
      const { data } = await axios.get('/api/user')

      user.value = data
      isAuthenticated.value = true
    } catch (error) {
      user.value = null
      isAuthenticated.value = false
    }
  }

  async function login(credentials) {
    try {
      loading.value = true
      
      await axios.post('/api/login', credentials, {
        headers: { Accept: 'application/json' },
        withCredentials: true,
      })
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await axios.post('/logout')
    user.value = null
    isAuthenticated.value = false
  }

  async function checkAuthOnInit() {
    
    try {
      await getUser()
    } catch {
      user.value = null
      isAuthenticated.value = false
    }
  }

  return { user, isAuthenticated, login, logout, getUser, checkAuthOnInit, loading }
})

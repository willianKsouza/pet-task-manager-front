import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/lib/axios'

export const useDashboardStore = defineStore('dashboard', () => {
  const totalTasks = ref('')
  const inProgressTasks = ref('')
  const completedTasks = ref('')
  const teamMembers = ref('')
  const teamPerformance = ref([])

  async function fetchDashboardData() {
    try {
      const { data } = await axios.get('/api/dashboard/overview')
      totalTasks.value = data.stats.total_tasks
      inProgressTasks.value = data.stats.in_progress_tasks
      completedTasks.value = data.stats.done_tasks
      teamMembers.value = data.stats.team_members
      teamPerformance.value = data.team_performance
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  return { totalTasks, inProgressTasks, completedTasks, teamMembers,teamPerformance, fetchDashboardData }
})

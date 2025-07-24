import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from '@/lib/axios'
import { computed } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const currentPage = ref(1)
  const lastPage = ref(1)
  const perPage = ref(9)
  const total = ref(0)

  const mapTasksByStatus = reactive({
    allTasks: [],
    to_do: [],
    in_progress: [],
    in_review: [],
    done: [],
  })

  const allTasks = computed(() => mapTasksByStatus.allTasks)
  const toDoTasksComputed = computed(() => mapTasksByStatus.to_do)
  const inProgressTasksComputed = computed(() => mapTasksByStatus.in_progress)
  const inReviewTasksComputed = computed(() => mapTasksByStatus.in_review)
  const doneTasksComputed = computed(() => mapTasksByStatus.done)

  const distributeTasksByStatus = (task) => {
    switch (task.status) {
      case 'to_do':
        mapTasksByStatus.to_do.unshift(task)
        break
      case 'in_progress':
        mapTasksByStatus.in_progress.unshift(task)
        break
      case 'in_review':
        mapTasksByStatus.in_review.unshift(task)
        break
      case 'done':
        mapTasksByStatus.done.unshift(task)
        break
    }
  }

  // async function fetchTasks() {
  //   try {
  //     const { data } = await axios.get('/api/tasks')
  //     mapTasksByStatus.allTasks = data
  //     data.forEach((task) => distributeTasksByStatus(task))
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error)
  //   }
  // }

  async function fetchTasks(filters = {}) {
    try {
      const { data } = await axios.get('/api/tasks', {
        params: {
          status: filters.status || 'all',
          search: filters.search || '',
          searchByName: filters.searchByName || false,
          searchByDescription: filters.searchByDescription || false,
          page: filters.page || 1,
          perPage: filters.perPage || 9,
        },
      })
      console.log('Fetched tasks:', data);
      
      data.data.forEach((task) => distributeTasksByStatus(task))
      mapTasksByStatus.allTasks = data.data

      currentPage.value = data.current_page
      lastPage.value = data.last_page
      perPage.value = data.per_page
      total.value = data.total
      console.log('Tasks fetched successfully:', data);
      
    } catch (error) {
      console.error('Erro ao buscar tasks:', error)
    }
  }

  async function addTask(task) {
    try {
      const { data } = await axios.post('/api/task/create', {
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        status: task.status,
        priority: task.priority,
        user_id: task.user_id,
      })
      mapTasksByStatus.allTasks.push(data)
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }
  async function updateTask(task, oldTaskStatus) {
    try {
      await axios.put(`/api/task/update/${task.id}`, {
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        status: task.status,
        priority: task.priority,
        user_id: task.user_id,
      })
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      const index = mapTasksByStatus[oldTaskStatus].findIndex((t) => t.id === task.id)
      if (index !== -1) {
        mapTasksByStatus[oldTaskStatus].splice(index, 1)
        mapTasksByStatus[task.status].unshift(task)
      }
    }
  }

  async function deleteTask(task) {
    try {
      await axios.delete(`/api/task/delete/${task.id}`)
      const index = mapTasksByStatus.allTasks.findIndex((t) => t.id === task.id)
      if (index !== -1) {
        mapTasksByStatus.allTasks.splice(index, 1)
        mapTasksByStatus[task.status].splice(index, 1)
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return {
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    allTasks,
    toDoTasksComputed,
    inProgressTasksComputed,
    inReviewTasksComputed,
    doneTasksComputed,
  }
})

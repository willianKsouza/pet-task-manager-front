import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from '@/lib/axios'
import { computed } from 'vue'

export const useTaskStore = defineStore('task', () => {
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

  const currentPage = ref(1)
  const lastPage = ref(1)
  const total = ref(0)
  const perPage = ref(9)
  const from = ref(0)
  const to = ref(0)

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

  async function fetchTasks(filters = {}, bool) {
    if (!bool) {
      try {
        const { data } = await axios.get('/api/tasks')
        mapTasksByStatus.allTasks = data
        data.forEach((task) => distributeTasksByStatus(task))
        return
      } catch (error) {
        console.error('Error fetching tasks:', error)
        return
      }
    }

    if (bool) {
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
        mapTasksByStatus.allTasks = data.data
        data.data.forEach((task) => distributeTasksByStatus(task))
        console.log('Fetched tasks:', data)
        currentPage.value = data.current_page
        lastPage.value = data.last_page
        total.value = data.total
        perPage.value = data.per_page
        from.value = data.from || 0
        to.value = data.to || 0

        return
      } catch (error) {
        console.error('Erro ao buscar tasks:', error)
        return
      }
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
    await axios.delete(`/api/task/delete/${task.id}`);

    const indexInAllTasks = mapTasksByStatus.allTasks.findIndex((t) => t.id === task.id);
    if (indexInAllTasks !== -1) {
      mapTasksByStatus.allTasks.splice(indexInAllTasks, 1);
    }
    const statusArray = mapTasksByStatus[task.status];
    const indexInStatusArray = statusArray.findIndex((t) => t.id === task.id);
    if (indexInStatusArray !== -1) {
      statusArray.splice(indexInStatusArray, 1);
    }
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
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
    currentPage,
    lastPage,
    total,
    perPage,
    from,
    to,
  }
})

<template>
  <div class="flex flex-col gap-6 p-4">

    <div>
      <button
        class="bg-[#0084a1] flex items-center gap-x-2 px-4 py-2 rounded-md text-white font-semibold hover:bg-[#006f87] transition-colors"
      >
        <IconPlus class="size-5" />
        <span @click="toggleAddNewTaskModal">Add Task</span>
      </button>
      <AddNewTask
        @save="handleSaveTask"
        :isOpen="addNewTaskModalIsOpen"
        @close="toggleAddNewTaskModal"
      />
    </div>
  </div>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 pb-4">
    <div>
      <h2 class="text-lg font-semibold text-[#303030] mb-2">To Do</h2>
      <div class="flex flex-col gap-y-4 max-h-[400px] overflow-y-auto">
        <TaskCard
          v-for="task in taskStore.toDoTasksComputed"
          :key="task.id"
          :task="task"
          @edit="openEditModal"
          @delete="handleDeleteTask"
        />
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-[#303030] mb-2">In Progress</h2>
      <div class="flex flex-col gap-y-4 max-h-[400px] overflow-y-auto">
        <TaskCard
          v-for="task in taskStore.inProgressTasksComputed"
          :key="task.id"
          :task="task"
          @delete="handleDeleteTask"
        />
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-[#303030] mb-2">In Review</h2>
      <div class="flex flex-col gap-y-4 max-h-[400px] overflow-y-auto">
        <TaskCard
          v-for="task in taskStore.inReviewTasksComputed"
          :key="task.id"
          :task="task"
          @delete="handleDeleteTask"
        />
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-[#303030] mb-2">Done</h2>
      <div class="flex flex-col gap-y-4 max-h-[400px] overflow-y-auto">
        <TaskCard 
          v-for="task in taskStore.doneTasksComputed" :key="task.id" :task="task" @delete="handleDeleteTask" />
      </div>
    </div>
    <EditTaskModal
      :isOpen="editModalIsOpen"
      :task="selectedTask"
      :isAdmin="user.role === 'admin'"
      @update="handleUpdate"
      @close="editModalIsOpen = false"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import IconPlus from '@/components/icons/IconPlus.vue'
import TaskCard from '@/components/TaskCard.vue'
import EditTaskModal from '@/components/modals/EditTaskModal.vue'
import AddNewTask from './modals/AddNewTask.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const user = ref(useAuthStore().user)

const taskStore = useTaskStore()
let oldTaskStatus = ''

const selectedTask = ref(null)
const editModalIsOpen = ref(false)
const addNewTaskModalIsOpen = ref(false)

const toggleAddNewTaskModal = () => {
  addNewTaskModalIsOpen.value = !addNewTaskModalIsOpen.value
}
const handleDeleteTask = (task) => {
  taskStore.deleteTask(task)
}

const openEditModal = (task) => {
  selectedTask.value = task
  oldTaskStatus = task.status
  
  
  editModalIsOpen.value = true
}

const handleSaveTask = async (task) => {
  try {
    await useTaskStore().addTask(task)
  } catch (error) {
    console.error('Error saving task:', error)
  }
  addNewTaskModalIsOpen.value = false
}

const handleUpdate = async (updatedTask) => {
  taskStore.updateTask(updatedTask, oldTaskStatus)
  editModalIsOpen.value = false
}

onMounted(() => {
  if (taskStore.allTasks.length === 0) {
    taskStore.fetchTasks()
  }
})
</script>

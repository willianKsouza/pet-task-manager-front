<template>
  <div class="flex flex-col gap-6">
    <section class="flex items-center gap-4 py-2 bg-white px-4">
      <div>
        <h1 class="text-2xl font-bold text-[#303030]">Tasks</h1>
      </div>
      <div class="flex gap-6">
       
      </div>
        <ul class="flex lg:hidden items-center gap-x-4">
            <li class="flex  items-center gap-x-2 px-2  rounded-md hover:bg-[#e0f7fa]">
              <IconTable class="text-[#0084a1] size-5" />
              <RouterLink :to="{ name: 'tasks' }" class="text-[#303030] font-semibold block py-2">Cards</RouterLink>
            </li>
            <li class="flex items-center gap-x-2 px-2 rounded-md hover:bg-[#e0f7fa]">
              <IconTable class="text-[#0084a1] size-5" />
              <RouterLink :to="{ name: 'search' }" class="text-[#303030] font-semibold block py-2">Search</RouterLink>
            </li>
          </ul>
    </section>
  </div>
   <div v-if="user.role === 'admin'" class="px-4 pt-4">
          <button
            class="bg-[#0084a1] flex items-center gap-x-2 px-4 py-2 rounded-md text-white font-semibold hover:bg-[#006f87] transition-colors"
          >
            <IconPlus class="size-5" />
            <span @click="toggleAddNewTaskModal" >Add Task</span>
          </button>
          <AddNewTask
            @save="handleSaveTask"
            :isOpen="addNewTaskModalIsOpen"
            @close="toggleAddNewTaskModal"
          />
        </div>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 pb-4 mt-4">
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
           @edit="openEditModal"
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
           @edit="openEditModal"
          @delete="handleDeleteTask"
        />
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-[#303030] mb-2">Done</h2>
      <div class="flex flex-col gap-y-4 max-h-[400px] overflow-y-auto">
        <TaskCard
          v-for="task in taskStore.doneTasksComputed"
          :key="task.id"
          :task="task"
           @edit="openEditModal"
          @delete="handleDeleteTask"
        />
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
import { useAuthStore } from '@/stores/useAuthStore'
import IconPlus from '@/components/icons/IconPlus.vue'
import TaskCard from '@/components/TaskCard.vue'
import EditTaskModal from '@/components/modals/EditTaskModal.vue'
import AddNewTask from './modals/AddNewTask.vue'
import IconTable from './icons/IconTable.vue'


const user = ref(useAuthStore().user)

const taskStore = useTaskStore()
console.log(taskStore.toDoTasksComputed);

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
    console.log('Task added successfully:', task)
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
    taskStore.fetchTasks({}, false)
  }
})
</script>

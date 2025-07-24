<template>
  <section class="p-4">
    <div class="space-x-2 space-y-8">
      <button
        v-for="option in statusOptions"
        :key="option.value"
        @click="setStatusFilter(option.value)"
        :class="[
          'px-4 py-2 rounded-md font-semibold text-[#303030] bg-white shadow-lg hover:bg-[#e0f7fa] transition-colors',
          statusFilter === option.value ? 'bg-[#e0f7fa]' : '',
        ]"
      >
        {{ option.label }}
      </button>
    </div>
    <div class="flex items-center">
      <div
        class="flex justify-between items-center border border-[#0084a1]/30 rounded-md px-3 py-2 w-50 focus-within:ring-2 focus-within:ring-[#0084a1] transition"
      >
        <input
          type="text"
          placeholder="Search tasks..."
          class="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
        />
        <IconSearch class="text-[#0084a1] size-5" />
      </div>
      <div class="flex items-center space-x-2 ml-4">
        <label class="inline-flex items-center space-x-1">
          <input type="checkbox" id="searchByName" />
          <span>Search by Name</span>
        </label>
        <label class="inline-flex items-center space-x-1">
          <input type="checkbox" id="searchByDescription" />
          <span>Search by Description</span>
        </label>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-4">
      <TaskCard
        v-for="task in taskStore.allTasks"
        :key="task.id"
        :task="task"
        @edit="openEditModal"
        @delete="handleDeleteTask"
        @update="handleUpdate"
      />
      <EditTaskModal
        :isOpen="editModalIsOpen"
        :task="selectedTask"
        :isAdmin="user.role === 'admin'"
        @update="handleUpdate"
        @close="editModalIsOpen = false"
      />
    </div>
    <PaginatorBar />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useAuthStore } from '@/stores/useAuthStore'
import IconSearch from '@/components/icons/IconSearch.vue'
import TaskCard from './TaskCard.vue'
import EditTaskModal from './modals/EditTaskModal.vue'
import PaginatorBar from './PaginatorBar.vue'

const user = ref(useAuthStore().user)

const taskStore = useTaskStore()
let oldTaskStatus = ''

const selectedTask = ref(null)
const editModalIsOpen = ref(false)

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'To Do', value: 'to_do' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Done', value: 'done' },
]

const statusFilter = ref('all')
const searchText = ref('')
const searchByName = ref(false)
const searchByDescription = ref(false)

const applyFilters = () => {
  if (searchText.value.trim() !== '' && !searchByName.value && !searchByDescription.value) {
    alert('Please select at least one search field (Name or Description).')
    return
  }

  taskStore.fetchTasks({
    status: statusFilter.value,
    search: searchText.value.trim() || null,
    searchByName: searchByName.value,
    searchByDescription: searchByDescription.value,
  })
}
const setStatusFilter = (status) => {
  statusFilter.value = status
  applyFilters()
}


const handleDeleteTask = (task) => {
  taskStore.deleteTask(task)
}

const openEditModal = (task) => {
  selectedTask.value = task
  oldTaskStatus = task.status
  editModalIsOpen.value = true
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

<style scoped>
.inline-flex.items-center {
  cursor: pointer;
  user-select: none;
  color: #303030;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.inline-flex input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #0084a1;
  border-radius: 4px;
  background-color: white;
  position: relative;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.inline-flex input[type='checkbox']:hover {
  border-color: #006f87;
}

.inline-flex input[type='checkbox']:checked {
  background-color: #0084a1;
  border-color: #0084a1;
}

.inline-flex input[type='checkbox']:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.inline-flex span {
  margin-left: 0.5rem;
}
</style>

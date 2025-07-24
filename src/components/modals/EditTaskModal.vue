<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-auto"
    >
    {{ task }}
      <button
        class="absolute top-4 right-4 text-[#303030] hover:text-[#006f87]"
        @click="emit('close')"
        aria-label="Close modal"
      >
        ✕
      </button>
      <h2 class="text-xl font-semibold text-[#303030] mb-4">Edit Task</h2>

      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-[#303030] mb-1">Title</label>
            <input
              id="title"
              type="text"
              v-model="form.title"
              required
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:ring-[#0084a1] focus:outline-none transition"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-[#303030] mb-1">
              Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:ring-[#0084a1] focus:outline-none transition resize-none"
              rows="3"
            />
          </div>

          <div>
            <label for="due_date" class="block text-sm font-medium text-[#303030] mb-1">
              Due Date
            </label>
            <input
              id="due_date"
              type="date"
              v-model="form.due_date"
              :disabled="!isAdmin"
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:ring-[#0084a1] focus:outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-[#303030] mb-1">Status</label>
            <select
              id="status"
              v-model="form.status"
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:ring-[#0084a1] focus:outline-none transition bg-white"
            >
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="in_review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label for="priority" class="block text-sm font-medium text-[#303030] mb-1">
              Priority
            </label>
            <select
              id="priority"
              v-model="form.priority"
              :disabled="!isAdmin"
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:ring-[#0084a1] focus:outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label for="user_ids" class="block text-sm font-medium text-[#303030] mb-1">
              Assign to Users
            </label>
            <select
              id="user_id"
              v-model="form.user_id"
              :disabled="!isAdmin"
              size="4"
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:ring-[#0084a1] focus:outline-none transition bg-white"
            >
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 rounded-md font-semibold text-[#303030] bg-white shadow hover:bg-[#e0f7fa] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded-md font-semibold text-white bg-[#0084a1] hover:bg-[#006f87] transition-colors"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, defineProps, defineEmits, onMounted, watch, ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  task: Object,
  isAdmin: Boolean,
})

const emit = defineEmits(['close', 'update'])

const form = reactive({
  id: '',
  title: '',
  description: '',
  due_date: '',
  status: '',
  priority: '',
  user_id: '',
})

const users = ref([])

const submitForm = () => {
  emit('update', { ...form })
}
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      form.id = newTask.id
      form.title = newTask.title
      form.description = newTask.description
      form.due_date = newTask.due_date ? new Date(newTask.due_date).toISOString().split('T')[0] : ''
      form.status = newTask.status
      form.priority = newTask.priority
      form.user_id = newTask.user_id
    }
  },
  { immediate: true },
)
onMounted(async () => {
  try {
    const { data } = await axios.get('/api/users')
    users.value = data
  } catch (error) {
    console.error('Failed to load users:', error)
  }
})
</script>

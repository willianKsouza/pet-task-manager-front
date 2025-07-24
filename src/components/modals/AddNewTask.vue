<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-auto"
    >
      <button
        class="absolute top-4 right-4 text-[#303030] hover:text-[#006f87]"
        @click="emit('close')"
        aria-label="Close modal"
      >
        ✕
      </button>
      <h2 class="text-xl font-semibold text-[#303030] mb-4">Add New Task</h2>
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#303030] mb-1" for="title">Title</label>
            <input
              id="title"
              type="text"
              v-model="form.title"
              required
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0084a1] transition"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#303030] mb-1" for="description"
              >Description</label
            >
            <textarea
              id="description"
              v-model="form.description"
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0084a1] transition resize-none"
              placeholder="Enter task description"
              rows="3"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#303030] mb-1" for="due_date"
              >Due Date</label
            >
            <input
              id="due_date"
              type="date"
              v-model="form.due_date"
              required
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0084a1] transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#303030] mb-1" for="status">Status</label>
            <select
              id="status"
              v-model="form.status"
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0084a1] transition bg-white"
            >
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="in_review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#303030] mb-1" for="priority"
              >Priority</label
            >
            <select
              id="priority"
              v-model="form.priority"
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0084a1] transition bg-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#303030] mb-1" for="user_ids"
              >Assign to Users</label
            >
            <select
              id="user_ids"
              v-model="form.user_id"
              size="4"
              class="w-full px-4 py-2 border border-[#0084a1]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0084a1] transition bg-white"
            >
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
            <p class="text-xs text-gray-500 mt-1">Hold Ctrl (Cmd) to select multiple users</p>
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
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, defineProps, defineEmits, onMounted } from 'vue'

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  title: '',
  description: '',
  due_date: '',
  status: 'to_do',
  priority: 'low',
  user_id: '',
})

const users = reactive([])



const submitForm = () => {
  if (
    !form.title.trim() ||
    !form.description.trim() ||
    !form.due_date ||
    form.user_id === ''
  ) {
    alert('Please fill in required fields')
    return
  }

  emit('save', { ...form })

  form.title = ''
  form.description = ''
  form.due_date = ''
  form.status = 'to_do'
  form.priority = 'low'
  form.user_id = ''
}




onMounted(async () => {
  try {
    const { data } = await axios.get('/api/users')
    users.splice(0, users.length, ...data)
  } catch (error) {
    console.error('Failed to load users:', error)
  }
})
</script>

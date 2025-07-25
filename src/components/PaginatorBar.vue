<template>
  <div v-if="taskStore.total > 0" class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
    <div class="text-sm text-gray-600">
      Mostrando {{ taskStore.from }} até {{ taskStore.to }} de {{ taskStore.total }} resultados
    </div>
    <div class="flex items-center gap-2">
      <button
        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="taskStore.currentPage === 1"
        @click="changePage(1)"
        title="Primeira página"
      >
        ««
      </button>
      <button
        class="px-1 sm:px-3 py-1 sm:py-2  text-xs sm:text-sm  font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="taskStore.currentPage === 1"
        @click="changePage(taskStore.currentPage - 1)"
        title="Página anterior"
      >
        ‹ Anterior
      </button>
      <div class="flex items-center gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="changePage(page)"
          :class="[
            'px-3 py-2 text-sm font-medium rounded-md transition-colors',
            page === taskStore.currentPage
              ? 'bg-[#0084a1] text-white border border-[#0084a1]'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ page }}
        </button>
      </div>
      <button
        class="px-1 sm:px-3 py-1 sm:py-2  text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="taskStore.currentPage === taskStore.lastPage"
        @click="changePage(taskStore.currentPage + 1)"
        title="Próxima página"
      >
        Próxima ›
      </button>
      <button
        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="taskStore.currentPage === taskStore.lastPage"
        @click="changePage(taskStore.lastPage)"
        title="Última página"
      >
        »»
      </button>
    </div>
    <div class="flex items-center gap-2">
      <label for="perPage" class="text-sm text-gray-600">
        Por página:
      </label>
      <select
        id="perPage"
        :value="taskStore.perPage"
        @change="changePerPage($event.target.value)"
        class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0084a1] focus:border-transparent"
      >
        <option value="6">6</option>
        <option value="9">9</option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})
const taskStore = useTaskStore()


function changePage(page) {
  if (page === taskStore.currentPage || page < 1 || page > taskStore.lastPage) {
    return
  }

  taskStore.fetchTasks({
    ...props.filters,
    page,
    perPage: taskStore.perPage
  })
}

function changePerPage(newPerPage) {
  taskStore.fetchTasks({
    ...props.filters,
    page: 1,
    perPage: parseInt(newPerPage)
  })
}

const visiblePages = computed(() => {
  const pages = []
  const totalPages = taskStore.lastPage
  const current = taskStore.currentPage
  const maxVisible = 5

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, current - Math.floor(maxVisible / 2))
    let end = start + maxVisible - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxVisible + 1)
    }
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  return pages
})
</script>
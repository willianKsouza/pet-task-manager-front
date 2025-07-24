<template>
  <div class="mt-6 flex gap-2">
    <button
      class="px-3 py-1 bg-[#0084a1] text-white rounded disabled:opacity-50"
      :disabled="taskStore.currentPage === 1"
      @click="changePage(taskStore.currentPage - 1)"
    >
      Prev
    </button>
    <button
      class="px-3 py-1 bg-[#0084a1] text-white rounded disabled:opacity-50"
      :disabled="taskStore.currentPage === taskStore.lastPage"
      @click="changePage(taskStore.currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>
<script setup>
import { useTaskStore } from '@/stores/useTaskStore'

const taskStore = useTaskStore()

function changePage(page) {
  taskStore.fetchTasks(
    {
      status: taskStore.statusFilter.value,
      search: taskStore.searchText.value.trim(),
      searchByName: taskStore.searchByName.value,
      searchByDescription: taskStore.searchByDescription.value,
    },
    page,
  )
}
</script>

<template>
  <li>
    <div class="flex items-center gap-4">
      <div>
        <img
          src="https://images.unsplash.com/vector-1742118848550-cafc9d362a98?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="User Avatar"
          class="size-8 rounded-full"
        />
      </div>
      <div class="w-full flex justify-between items-center gap-4">
        <div class="flex flex-col">
          <span class="text-lg font-semibold whitespace-nowrap">{{ name }}</span>
          <span class="text-sm text-gray-500">{{ role === 'admin' ? 'Admin' : 'Member' }}</span>
        </div>
        <div class="flex flex-col self-end">
          <span class="text-lg text-end font-semibold">{{ tasksCountCompleted }}</span>
          <span class="text-sm text-gray-500 whitespace-nowrap">task completed</span>
        </div>
      </div>
    </div>
  </li>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  name: String,
  role: String,
  tasksCountCompleted: Number,
})
</script>

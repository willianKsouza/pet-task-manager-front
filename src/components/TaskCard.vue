<template>
  <div
    class="flex flex-col justify-between shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
    :class="statusClasses[task.status]"
  >
  {{ task }}
    <div class="grow space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-[#303030]">{{ task.title }}</h3>
        <div class="flex items-center justify-between gap-x-4">
          <IconPencil @click="$emit('edit', task)" class="text-yellow-500" />
          <IconBin @click="$emit('delete', task)" class="text-red-400" />
        </div>
      </div>
      <p class="text-sm text-[#606060] mb-4">{{ task.description  }}{{ task.id }}</p>
    </div>
    <div class="flex justify-between items-end">
      <div class="flex items-center gap-x-2">
        <span class="block p-3 rounded-full bg-[#0084a1]"></span>
        <ul>
          <li class="text-xs text-[#0084a1]">Alexandre Santos</li>
          <li class="text-xs text-zinc-400 font-semibold">Team Leader</li>
        </ul>
      </div>
      <div class="flex flex-col gap-x-2 items-end">
        <div class="pb-2">
          <img
            src="https://images.unsplash.com/vector-1742118848550-cafc9d362a98?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User Avatar"
            class="size-8 rounded-full"
          />
        </div>
        <span class="text-xs block text-[#0084a1] text-end">Venc: 31/10/2025</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconBin from './icons/IconBin.vue'
import IconPencil from './icons/IconPencil.vue'

defineProps({
  task: {
    type: Object,
    required: true,
  },
})
const statusClasses = {
  to_do: 'bg-blue-500/20',
  in_progress: 'bg-yellow-500/20',
  in_review: 'bg-purple-500/20',
  done: 'bg-green-500/20',
}
</script>

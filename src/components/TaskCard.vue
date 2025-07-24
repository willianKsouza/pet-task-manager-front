<template>
  <div
    class="flex flex-col justify-between shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
    :class="statusClasses[task.status]"
  >
    <div class="grow space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-[#303030]">{{ task.title }}</h3>
        <div class="flex items-center justify-between gap-x-4">
          <IconPencil @click="$emit('edit', task)" class="text-yellow-500" />
          <IconBin @click="$emit('delete', task)" class="text-red-400" />
        </div>
      </div>
      <p class="text-sm text-[#606060] mb-4">{{ task.description }}</p>
    </div>
    <div class="flex justify-between items-end">
      <div class="flex items-center gap-x-2">
        <span class="block p-3 rounded-full bg-[#0084a1]"></span>
        <ul>
          <li class="text-xs text-[#0084a1]">Alexandre Santos</li>
          <li class="text-xs text-zinc-400 font-semibold">Team Leader</li>
        </ul>
      </div>
      <span class="text-xs block text-[#0084a1] text-end">Venc: 31/10/2025</span>
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
  done: 'bg-green-500/20'
};
</script>

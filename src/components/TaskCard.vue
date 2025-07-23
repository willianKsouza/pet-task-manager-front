<template>
  <div
    class="flex flex-col justify-between bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
  >
    <div class="grow space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-[#303030]">Task Title</h3>
        <div class="flex items-center justify-between gap-x-4">
          <IconPencil class="text-yellow-500" />
          <IconBin class="text-red-400" />
        </div>
      </div>
      <p class="text-sm text-[#606060] mb-4">This is a brief description of the task. This is a brief description of the task. This is a brief description of the task.</p>
    </div>
    <div class="flex justify-between items-end">
      <div class="flex items-center gap-x-2">
        <span class="block p-3 rounded-full bg-[#0084a1]"></span>
        <ul>
          <li class="text-xs text-[#0084a1]">Alexandre Santos</li>
          <li class="text-xs text-zinc-00 font-semibold">Team Leader</li>
        </ul>
      </div>
      <span class="text-xs block text-[#0084a1] text-end">Venc: 31/10/2025</span>
    </div>
  </div>
</template>
<script setup>
import IconBin from './icons/IconBin.vue'
import IconPencil from './icons/IconPencil.vue'
</script>

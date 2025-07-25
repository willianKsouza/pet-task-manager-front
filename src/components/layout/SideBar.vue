<template>
  <div class="border-r border-[#0084a1]/20">
    <div class="h-[70px] flex items-center border-b border-[#0084a1]/20">
      <div class="flex items-center gap-x-2 p-4">
        <div class="flex items-center justify-center bg-[#0084a1] p-1 rounded-md">
          <IconPaw class="block text-white" />
        </div>

        <h1 class="text-2xl font-bold text-[#0084a1]">Pet Task</h1>
      </div>
    </div>
    <div class="py-4 px-4">
      <h2 class="text-zinc-400 text-lg font-bold">Menu</h2>
    </div>
    <nav>
      <ul class="space-y-2 px-4 *:hover:pl-4 *:transition-all">
        <li class="rounded-md hover:bg-[#e0f7fa]">
          <router-link
            to="/dashboard"
            class="flex items-center gap-x-2 text-[#303030] font-semibold py-2"
          >
            <IconDashBoard class="text-[#0084a1] size-5" />
            Dashboard
          </router-link>
        </li>
        <li class="rounded-md hover:bg-[#e0f7fa]">
          <router-link
            to="/tasks"
            class="flex items-center gap-x-2 text-[#303030] font-semibold py-2"
          >
            <IconListToDo class="text-[#0084a1] size-5" />
            Tasks
          </router-link>
        </li>
      </ul>
      <div class="p-4">
        <button class="w-full bg-[#0084a1] text-white py-2 rounded-md">Logout</button>
      </div>
    </nav>
  </div>
</template>
<script setup>
import IconDashBoard from '@/components/icons/IconDashBoard.vue'
import IconListToDo from '@/components/icons/IconListToDo.vue'
import IconPaw from '../icons/IconPaw.vue'
</script>

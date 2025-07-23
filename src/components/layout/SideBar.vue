<template>
  <div class="border-r border-[#0084a1]/20">
    <div class="h-[70px] flex items-center border-b border-[#0084a1]/20">
      <div class="flex items-center gap-x-2 p-4">
        <span
          class="flex items-center justify-center bg-[#0084a1] size-[30px] rounded-md text-white font-bold"
          >P</span
        >
        <h1 class="text-2xl font-bold text-[#0084a1]">Pet Task</h1>
      </div>
    </div>
    <div class="py-4 px-4">
      <h2 class="text-zinc-400 text-lg font-bold">Menu</h2>
    </div>
    <nav>
      <ul class="space-y-2 px-4 *:hover:pl-4 *:transition-all">
        <li class="flex items-center gap-x-2 pl-2 rounded-md hover:bg-[#e0f7fa]">
          <IconDashBoard class="text-[#0084a1] size-5" />
          <router-link to="/dashboard" class="text-[#303030] font-semibold block py-2">Dashboard</router-link>
        </li>
        <li class="flex items-center gap-x-2 pl-2 rounded-md hover:bg-[#e0f7fa]">
          <IconListToDo class="text-[#0084a1] size-5" />
          <router-link to="/tasks" class="text-[#303030] font-semibold block py-2">Tasks</router-link>
        </li>
        <li class="flex items-center gap-x-2 pl-2 rounded-md hover:bg-[#e0f7fa]">
          <IconNotification class="text-[#0084a1] size-5" />
          <router-link to="/notifications" class="text-[#303030] font-semibold block py-2">Notifications</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup>
import IconDashBoard from '@/components/icons/IconDashBoard.vue'
import IconListToDo from '@/components/icons/IconListToDo.vue'
import IconNotification from '../icons/IconNotification.vue'
</script>

<template>
  <div>
    <div class="hidden h-[70px] lg:flex items-center border-b border-[#0084a1]/20 shadow-lg">
      <header class="w-full flex items-center px-4">
        <h2 class="text-2xl font-bold text-[#303030]">Tasks</h2>
        <nav>
          <ul class="flex items-center gap-x-4 p-4">
            <li class="flex items-center gap-x-2 px-2 rounded-md hover:bg-[#e0f7fa]">
              <IconTable class="text-[#0084a1] size-5" />
              <RouterLink :to="{ name: 'tasks' }" class="text-[#303030] font-semibold block py-2">Cards</RouterLink>
            </li>
            <li class="flex items-center gap-x-2 px-2 rounded-md hover:bg-[#e0f7fa]">
              <IconTable class="text-[#0084a1] size-5" />
              <RouterLink :to="{ name: 'search' }" class="text-[#303030] font-semibold block py-2">Search</RouterLink>
            </li>
          </ul>
        </nav>
     
     
      </header>
    </div>
    <main class="bg-[#f2f2f2] h-screen overflow-y-auto">
      <slot />
    </main>
  
  </div>
</template>
<script setup>

import IconTable from '@/components/icons/IconTable.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import AddNewTask from '../modals/AddNewTask.vue';


</script>

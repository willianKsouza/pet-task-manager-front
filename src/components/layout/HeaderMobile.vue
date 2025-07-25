<template>
  <div class="relative h-[70px] flex items-center border-b border-[#0084a1]/20 shadow-lg">
    <header class="w-full flex items-center justify-between px-2">
      <div class="flex items-center gap-x-2 p-4">
         <div class=" flex items-center justify-center bg-[#0084a1] p-1 rounded-md">
          <IconPaw class="block  text-white" />
        </div>
        <h1 class="text-2xl font-bold text-[#0084a1]">Pet Task</h1>
      </div>
      <button>
        <IconMenuMobile @click="toggleMenu" class="text-[#0084a1] size-5" />
      </button>
    </header>
    <div v-show="isOpen" class="fixed inset-0 z-50">
  <div
    class="fixed inset-0 bg-black/30"
    @click="toggleMenu"
  ></div>

  <transition name="slide-left">
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
    >
      <div class="flex items-center justify-between p-4">
        <h2 class="text-xl font-bold text-[#0084a1]">Menu</h2>
        <IconClose @click="toggleMenu" class="text-[#0084a1] size-8 cursor-pointer" />
      </div>
      <div>
        <ul class="space-y-2 px-4 *:hover:pl-4 *:transition-all">
          <li class="rounded-md hover:bg-[#e0f7fa]">
            <router-link
              :to="{ name: 'dashboard' }"
              class="flex items-center gap-x-2 text-[#303030] font-semibold py-2"
            >
              <IconDashBoard class="text-[#0084a1] size-5" />
              Dashboard
            </router-link>
          </li>
          <li class="rounded-md hover:bg-[#e0f7fa]">
            <router-link
              :to="{ name: 'tasks' }"
              class="flex items-center gap-x-2 text-[#303030] font-semibold py-2"
            >
              <IconListToDo class="text-[#0084a1] size-5" />
              Tasks
            </router-link>
          </li>
        </ul>
      </div>
      <div class="p-4">
        <button class="w-full bg-[#0084a1] text-white py-2 rounded-md">
          Logout
        </button>
      </div>
    </div>
  </transition>
</div>

  </div>
</template>
<script setup>
import IconMenuMobile from '@/components/icons/IconMenuMobile.vue'
import IconDashBoard from '@/components/icons/IconDashBoard.vue'
import IconListToDo from '@/components/icons/IconListToDo.vue'
import IconClose from '../icons/IconClose.vue'
import IconPaw from '@/components/icons/IconPaw.vue'

import { ref } from 'vue'
const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>
<style scoped>
.slide-left-enter-from {
  transform: translateX(-100%);
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>

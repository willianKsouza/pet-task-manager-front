<template>
  <div class="relative h-[70px] flex items-center border-b border-[#0084a1]/20 shadow-lg">
    <header class="w-full flex items-center justify-between px-2">
      <div class="flex items-center gap-x-2 p-4">
        <span
          class="flex items-center justify-center bg-[#0084a1] size-[30px] rounded-md text-white font-bold"
          >P</span
        >
        <h1 class="text-2xl font-bold text-[#0084a1]">Pet Task</h1>
      </div>
      <button>
        <IconMenuMobile @click="toggleMenu" class="text-[#0084a1] size-5" />
      </button>
    </header>
    <transition name="slide-left">
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 h-full w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out"
  >
    <nav class="flex flex-col">
      <div class="flex items-center justify-end p-4 border-b border-[#0084a1]/20">
        <IconClose @click="toggleMenu" class="text-[#0084a1] size-8 cursor-pointer" />
      </div>
      <ul class="space-y-2 px-4 *:hover:pl-4 *:transition-all">
        <li class="flex items-center gap-x-2 pl-2 rounded-md hover:bg-[#e0f7fa]">
          <IconDashBoard class="text-[#0084a1] size-5" />
          <a href="#" class="text-[#303030] font-semibold block py-2">Dashboard</a>
        </li>
        <li class="flex items-center gap-x-2 pl-2 rounded-md hover:bg-[#e0f7fa]">
          <IconListToDo class="text-[#0084a1] size-5" />
          <a href="#" class="text-[#303030] font-semibold block py-2">Tasks</a>
        </li>
        <li class="flex items-center gap-x-2 pl-2 rounded-md hover:bg-[#e0f7fa]">
          <IconNotification class="text-[#0084a1] size-5" />
          <a href="#" class="text-[#303030] font-semibold block py-2">Notifications</a>
        </li>
      </ul>
    </nav>
  </div>
</transition>

  </div>
</template>
<script setup>
import IconMenuMobile from '@/components/icons/IconMenuMobile.vue'
import IconDashBoard from '@/components/icons/IconDashBoard.vue'
import IconListToDo from '@/components/icons/IconListToDo.vue'
import IconNotification from '@/components/icons/IconNotification.vue'
import IconClose from '../icons/IconClose.vue'



import { ref } from 'vue';
const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
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
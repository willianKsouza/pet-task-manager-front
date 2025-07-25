<template>
  <div class="flex-1 flex flex-col">
    <section class="w-full flex flex-col md:flex-row items-center gap-2 py-2 bg-white px-4">
      <div>
        <h1 class="text-2xl font-bold text-[#303030]">Dashboard</h1>
      </div>
      <div class="flex gap-2">
        <RouterLink
          :to="{ name: 'dashboard-overview' }"
          class="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#e0f7fa] text-[#303030] font-semibold"
        >
          <IconOverview class="size-5 text-[#0084a1]" />
          Overview</RouterLink
        >
        <RouterLink
          :to="{ name: 'dashboard-members' }"
          class="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#e0f7fa] text-[#303030] font-semibold whitespace-nowrap"
        >
          <IconEmployee class="size-5 text-[#0084a1]" />
          View All Members
        </RouterLink>
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import IconOverview from '@/components/icons/IconOverview.vue'
import IconEmployee from '@/components/icons/IconEmployee.vue'
import { RouterLink } from 'vue-router'
// import { useAuthStore } from '../stores/useAuthStore'
// const auth = useAuthStore()


onMounted(() => {


  // window.Echo.private(`tasks.channel.${auth.user.id}`).listen('TaskCreatedEvent', (e) => {
  //   console.log('Recebido:', e)
  // })
})
</script>

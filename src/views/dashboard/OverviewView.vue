<template>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
    <CardStatus title="Total Tasks" :count="dashboardStore.totalTasks">
      <IconTotalTask class="w-6 h-6 text-blue-500" />
    </CardStatus>

    <CardStatus title="In Progress" :count="dashboardStore.inProgressTasks">
      <IconTimer class="w-6 h-6 text-yellow-500" />
    </CardStatus>

    <CardStatus title="Completed" :count="dashboardStore.completedTasks">
      <IconCompleted class="w-6 h-6 text-purple-500" />
    </CardStatus>

    <CardStatus title="Team Members" :count="dashboardStore.teamMembers">
      <IconMemeber class="w-6 h-6 text-gray-500" />
    </CardStatus>
  </section>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    <div class="bg-white p-4 rounded-lg shadow space-y-4">
      <h2 class="text-xl font-bold text-[#303030]">Team Performance</h2>
      <ul class="space-y-4">
        <CardMemberPerformance
          v-for="member in dashboardStore.teamPerformance"
          :key="member.id"
          :name="member.name"
          :role="member.role"
          :tasksCountCompleted="member.tasks_done_count"
        />
      </ul>
    </div>
    <div></div>
  </section>
</template>
<script setup>
import { onMounted } from 'vue'
import CardStatus from '@/components/CardStatus.vue'
import IconCompleted from '@/components/icons/IconCompleted.vue'
import IconMemeber from '@/components/icons/IconMemeber.vue'
import IconTimer from '@/components/icons/IconTimer.vue'
import IconTotalTask from '@/components/icons/IconTotalTask.vue'
import CardMemberPerformance from '@/components/CardMemberPerformance.vue'
import { useDashboardStore } from '@/stores/useDashboardStore'
const dashboardStore = useDashboardStore()
console.log(dashboardStore);

onMounted(async () => {
  await dashboardStore.fetchDashboardData()
})
</script>

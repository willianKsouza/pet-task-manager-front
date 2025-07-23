<template>
  <div class="flex flex-col gap-6 p-4">
    <div class="space-x-2 space-y-2">
      <button
        class="px-4 py-2 rounded-md font-semibold text-[#303030] bg-white shadow-lg hover:bg-[#e0f7fa] transition-colors"
      >
        All
      </button>
      <button
        class="px-4 py-2 rounded-md font-semibold text-[#303030] bg-white shadow-lg hover:bg-[#e0f7fa] transition-colors"
      >
        To Do
      </button>
      <button
        class="px-4 py-2 rounded-md font-semibold text-[#303030] bg-white shadow-lg hover:bg-[#e0f7fa] transition-colors"
      >
        In Progress
      </button>
      <button
        class="px-4 py-2 rounded-md font-semibold text-[#303030] bg-white shadow-lg hover:bg-[#e0f7fa] transition-colors"
      >
        In Review
      </button>
      <button
        class="px-4 py-2 rounded-md font-semibold text-[#303030] bg-white shadow-lg hover:bg-[#e0f7fa] transition-colors"
      >
        Done
      </button>
    </div>
    <div class="lg:hidden">
      <button
        class="bg-[#0084a1] flex items-center gap-x-2 px-4 py-2 rounded-md text-white font-semibold hover:bg-[#006f87] transition-colors"
      >
        <IconPlus class="size-5" />
        <span class="">Add Task</span>
      </button>
    </div>
    <div class="flex items-center">
      <div
        class="flex justify-between items-center border border-[#0084a1]/30 rounded-md px-3 py-2 w-50 focus-within:ring-2 focus-within:ring-[#0084a1] transition"
      >
        <input
          type="text"
          placeholder="Search tasks..."
          class="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
        />
        <IconSearch class="text-[#0084a1] size-5" />
      </div>

      <IconFilter class="text-[#0084a1] size-5 ml-4 cursor-pointer hover:text-[#006f87]" />
    </div>
  </div>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 pb-4">
    <div>
      <h2 class="text-lg font-semibold text-[#303030] mb-2">To Do</h2>
      <div class="flex flex-col gap-y-4 max-h-[400px] overflow-y-auto">
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-[#303030] mb-2">In Progress</h2>
      <div class="flex flex-col gap-y-4 max-h-[400px] overflow-y-auto">
        <TaskCard />
        <TaskCard />
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-[#303030] mb-2">In Review</h2>
      <div class="flex flex-col gap-y-4 max-h-[400px] overflow-y-auto">
        <TaskCard />
        <TaskCard />
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-[#303030] mb-2">Done</h2>
      <div class="flex flex-col gap-y-4 max-h-[400px] overflow-y-auto">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  </section>
</template>

<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import TaskCard from '@/components/TaskCard.vue'
</script>

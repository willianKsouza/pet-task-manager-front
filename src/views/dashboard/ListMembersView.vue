<template>
  <section class="p-4">
    <div class="w-full flex items-center justify-between mb-4">
      <div
        class="flex justify-between items-center border border-[#0084a1]/30 rounded-md px-3 py-2 w-full md:w-1/2 focus-within:ring-2 focus-within:ring-[#0084a1] transition"
      >
        <input
          @keypress.enter="searchMembers"
          v-model="searchText"
          type="text"
          placeholder="Search members..."
          class="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
        />
        <IconSearch
          @click="searchMembers"
          class="block text-[#0084a1] hover:text-white hover:bg-[#0084a1]/50 w-10 h-8 px-1 cursor-pointer rounded-md"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
        <h2 class="text-lg font-semibold text-[#303030]">Alex</h2>
        <p class="text-gray-600">alex@example.com</p>
        <p class="text-gray-600">Admin</p>
        <div class="mt-2">
          <button
            class="bg-[#0084a1] text-white px-4 py-2 rounded-md hover:bg-[#006f87] transition-colors"
            @click="viewMemberDetails(member.id)"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { useMembersStore } from '@/stores/useMembersStore'
import IconSearch from '@/components/icons/IconSearch.vue'

const memberStore = useMembersStore()

const searchText = ref('')
const viewMemberDetails = (memberId) => {
  
}
const searchMembers = () => {
  // memberStore.fetchMembers();
}
</script>

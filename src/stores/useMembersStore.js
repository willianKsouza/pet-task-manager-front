import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/lib/axios'

export const useMembersStore = defineStore('members', () => {
  const members = ref([])

  async function fetchMembers() {
    try {
      const { data } = await axios.get('/api/users')
      members.value = data
    } catch (error) {
      console.error('Error fetching members:', error)
    }
  }


  return { members, fetchMembers }
})

   

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

const auth = useAuthStore()

onMounted( () => {
  auth.checkAuthOnInit()
})
</script>

<template>
  <RouterView />
</template>

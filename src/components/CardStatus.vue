<template>
  <div class="flex items-center rounded-md shadow hover:shadow-lg p-4 bg-white">
    <div class="flex-2">
      <h2 class="font-medium text-[#0084a1]">{{ title }}</h2>
      <h2 class="font-semibold text-2xl">{{ count }}</h2>
    </div>
    <div class="flex-1 flex justify-center">
      <div class="bg-blue-500/20 p-2 rounded-md">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  count: [Number, String],
})
</script>

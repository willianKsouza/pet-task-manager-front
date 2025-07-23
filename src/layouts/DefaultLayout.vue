<template>
  <div class="lg:flex h-screen">
    <HeaderMobile class="w-full block lg:hidden" />
    <SideBar class="min-screen w-60 hidden lg:block" />
    <MainContent class="grow flex-1">
      <RouterView />
    </MainContent>
  </div>
</template>
<script setup>
import HeaderMobile from '@/components/layout/HeaderMobile.vue';
import MainContent from '@/components/layout/MainContent.vue';
import SideBar from '@/components/layout/SideBar.vue';
</script>

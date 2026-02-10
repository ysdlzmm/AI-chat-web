<template>
  <NConfigProvider :theme="darkTheme">
    <NMessageProvider>
      <div class="h-screen w-screen bg-darker text-white overflow-hidden">
        <AppLayout />
      </div>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'
import AppLayout from './views/AppLayout.vue'
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <div class="h-screen w-screen bg-bg text-text overflow-hidden font-sans antialiased">
        <AppLayout />
      </div>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import AppLayout from './views/AppLayout.vue'

const themeOverrides = {
  common: {
    primaryColor: '#7c3aed',
    primaryColorHover: '#8b5cf6',
    primaryColorPressed: '#6d28d9',
    primaryColorSuppl: '#7c3aed',
    textColor1: '#fcfcfc',
    textColor2: '#a1a1aa',
    textColor3: '#52525b',
    textColor4: '#3f3f46'
  },
  Input: {
    color: 'transparent',
    colorFocus: 'transparent',
    border: '1px solid transparent',
    borderHover: '1px solid transparent',
    borderFocus: '1px solid transparent',
    boxShadowFocus: 'none',
    caretColor: '#7c3aed',
    placeholderColor: '#52525b'
  }
}
</script>

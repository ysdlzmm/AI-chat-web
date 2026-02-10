<template>
  <div 
    class="bg-surface flex flex-col border-r border-border relative overflow-hidden transition-all duration-300 ease-in-out"
    :class="collapsed ? 'w-[60px]' : 'w-[280px]'"
  >
    <div class="p-3">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-soft flex items-center justify-center shrink-0">
          <NIcon :component="SparklesOutline" :size="16" class="text-white" />
        </div>
        <span 
          class="text-base font-semibold text-text whitespace-nowrap transition-all duration-300 ease-in-out"
          :class="collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'"
        >AI Chat</span>
      </div>
      <button
        class="w-full py-2.5 px-4 bg-primary bg-primary/90 text-white rounded-xl text-sm font-medium flex items-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        :class="collapsed ? 'justify-center' : 'justify-center gap-2'"
        @click="handleNewChat"
      >
        <NIcon :component="AddOutline" :size="16" class="shrink-0 transition-all duration-300" />
        <span 
          class="whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
          :class="collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'"
        >新建对话</span>
      </button>
    </div>
    
    <div class="flex-1 overflow-y-auto custom-scrollbar px-2 pb-2">
      <div
        v-for="conv in conversations"
        :key="conv.id"
        class="group relative rounded-lg cursor-pointer transition-all duration-150"
        :class="[
          activeId === conv.id ? 'bg-primary/15' : 'hover:bg-surface-hover/50',
          collapsed ? 'py-2.5 my-1 flex justify-center' : 'px-3 py-2.5 my-1'
        ]"
        @click="handleSelectConversation(conv.id)"
      >
        <div class="flex items-center" :class="collapsed ? 'justify-center' : 'gap-2'">
          <NIcon 
            :component="ChatbubblesOutline" 
            :size="16" 
            class="shrink-0 transition-all duration-300"
            :class="activeId === conv.id ? 'text-primary' : 'text-text-dim'" 
          />
          <span 
            class="text-sm truncate whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out flex-1"
            :class="[
              activeId === conv.id ? 'text-primary' : 'text-text',
              collapsed ? 'w-0 opacity-0' : 'opacity-100'
            ]"
          >{{ conv.title }}</span>
          <NIcon
            v-if="!collapsed"
            :component="CloseOutline"
            :size="14"
            class="text-text-dim hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all shrink-0"
            @click.stop="handleDeleteConversation(conv.id)"
          />
        </div>
      </div>
    </div>

    <div class="p-3 border-t border-border">
      <button
        class="w-full h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-surface-hover"
        @click.stop="toggleCollapse"
      >
        <NIcon 
          :component="OptionsOutline" 
          :size="20"
          class="transition-all duration-300 hover:text-white"
          :class="[collapsed ? '-scale-x-100' : 'scale-x-100']"
          style="color: #71717a;"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NIcon } from 'naive-ui'
import { AddOutline, CloseOutline, ChatbubblesOutline, SparklesOutline, OptionsOutline } from '@vicons/ionicons5'
import type { Conversation } from '../types'

const collapsed = ref(false)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const conversations = ref<Conversation[]>([
  {
    id: '1',
    title: '欢迎使用 AI Chat',
    messages: [],
    updatedAt: Date.now()
  }
])

const activeId = ref('1')

const handleNewChat = () => {
  const newConv: Conversation = {
    id: Date.now().toString(),
    title: `对话 ${conversations.value.length + 1}`,
    messages: [],
    updatedAt: Date.now()
  }
  conversations.value.unshift(newConv)
  activeId.value = newConv.id
}

const handleSelectConversation = (id: string) => {
  activeId.value = id
}

const handleDeleteConversation = (id: string) => {
  conversations.value = conversations.value.filter(c => c.id !== id)
  if (activeId.value === id && conversations.value.length > 0) {
    activeId.value = conversations.value[0].id
  }
}
</script>

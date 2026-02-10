<template>
  <div class="w-70 bg-dark border-r border-gray-700 flex flex-col">
    <div class="p-4 border-b border-gray-700">
      <button
        class="w-full py-3 px-4 bg-primary hover:bg-primary/90 rounded-lg flex items-center justify-center gap-2 transition-colors"
        @click="handleNewChat"
      >
        <NIcon :component="AddOutline" />
        <span>新建对话</span>
      </button>
    </div>
    
    <div class="flex-1 overflow-y-auto p-2">
      <div
        v-for="conv in conversations"
        :key="conv.id"
        class="p-3 mb-2 rounded-lg cursor-pointer transition-colors"
        :class="activeId === conv.id ? 'bg-gray-700' : 'hover:bg-gray-800'"
        @click="handleSelectConversation(conv.id)"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm truncate flex-1">{{ conv.title }}</span>
          <NIcon
            :component="CloseOutline"
            class="text-gray-400 hover:text-red-400 transition-colors"
            @click.stop="handleDeleteConversation(conv.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NIcon } from 'naive-ui'
import { AddOutline, CloseOutline } from '@vicons/ionicons5'
import type { Conversation } from '../types'

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

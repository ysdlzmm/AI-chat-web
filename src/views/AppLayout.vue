<template>
  <div class="flex h-full">
    <Sidebar 
      :conversations="conversations"
      :activeId="activeId"
      @update:activeId="activeId = $event"
      @newConversation="handleNewConversation"
      @deleteConversation="handleDeleteConversation"
      @updateConversationTitle="handleUpdateTitle"
    />
    <ChatArea 
      :conversation="currentConversation"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import ChatArea from '../components/ChatArea.vue'
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

const currentConversation = computed(() => 
  conversations.value.find(c => c.id === activeId.value)
)

const handleNewConversation = () => {
  const newConv: Conversation = {
    id: Date.now().toString(),
    title: `对话 ${conversations.value.length + 1}`,
    messages: [],
    updatedAt: Date.now()
  }
  conversations.value.unshift(newConv)
  activeId.value = newConv.id
}

const handleDeleteConversation = (id: string) => {
  conversations.value = conversations.value.filter(c => c.id !== id)
  if (activeId.value === id && conversations.value.length > 0) {
    activeId.value = conversations.value[0].id
  }
}

const handleUpdateTitle = ({ id, title }: { id: string, title: string }) => {
  const conv = conversations.value.find(c => c.id === id)
  if (conv) {
    conv.title = title
  }
}
</script>

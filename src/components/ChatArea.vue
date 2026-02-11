<template>
  <div class="flex-1 flex flex-col bg-bg">
    <div class="flex-1 overflow-y-auto custom-scrollbar">
      <div class="max-w-3xl mx-auto px-6 py-10">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="mb-10 flex gap-3.5"
          :class="msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            :class="msg.role === 'user' ? 'bg-gradient-to-br from-primary to-primary-soft' : 'bg-surface'"
          >
            <NIcon
              :component="msg.role === 'user' ? PersonOutline : SparklesOutline"
              :size="15"
              :class="msg.role === 'user' ? 'text-white' : 'text-primary-soft'"
            />
          </div>
          <div
            class="px-4 py-3 rounded-2xl max-w-[75%]"
            :class="msg.role === 'user' ? 'bg-gradient-to-br from-primary to-primary-soft text-white' : 'bg-surface text-text'"
          >
            <div 
              class="text-sm leading-7 whitespace-pre-wrap"
              v-html="formatMessage(msg.content)"
            />
            <div v-if="msg.role === 'assistant' && isLoading && msg.id === loadingMessageId" class="flex items-center gap-1 mt-2">
              <span class="w-1.5 h-1.5 bg-text-dim rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-1.5 h-1.5 bg-text-dim rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-1.5 h-1.5 bg-text-dim rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
        
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center min-h-[55vh]">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-soft/20 flex items-center justify-center mb-5">
            <NIcon :component="SparklesOutline" :size="32" class="text-primary-soft" />
          </div>
          <h2 class="text-xl font-medium text-text mb-2">有什么可以帮你的吗？</h2>
        </div>
      </div>
    </div>
    
    <div class="border-t border-border">
      <div class="max-w-3xl mx-auto px-4 py-4">
        <div class="relative flex items-end gap-2 bg-surface rounded-2xl px-4 py-2">
          <NInput
            v-model:value="inputText"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 8 }"
            placeholder="发送消息给 AI..."
            class="flex-1"
            :disabled="isLoading"
            @keydown="handleKeyDown"
          />
          <NButton
            quaternary
            :type="inputText.trim() ? 'primary' : 'default'"
            :disabled="!inputText.trim() || isLoading"
            :loading="isLoading"
            class="shrink-0 mb-0.5"
            @click="handleSend"
          >
            <template #icon>
              <NIcon :component="SendOutline" :size="18" />
            </template>
          </NButton>
        </div>
        <p class="text-xs text-center text-text-dim mt-2.5">Enter 发送，Shift + Enter 换行</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NButton, NIcon } from 'naive-ui'
import { SendOutline, PersonOutline, SparklesOutline } from '@vicons/ionicons5'
import type { Message } from '../types'
import { sendMockChatMessage } from '../api/mock'

const messages = ref<Message[]>([])
const inputText = ref('')
const isLoading = ref(false)
const loadingMessageId = ref('')

const formatMessage = (content: string) => {
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-surface2 rounded-lg p-3 my-2 overflow-x-auto text-xs"><code>$1</code></pre>')
}

const handleSend = async () => {
  if (!inputText.value.trim() || isLoading.value) return
  
  const userMsg: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: inputText.value,
    timestamp: Date.now()
  }
  
  messages.value.push(userMsg)
  const userInput = inputText.value
  inputText.value = ''
  
  const aiMsg: Message = {
    id: (Date.now() + 1).toString(),
    role: 'assistant',
    content: '',
    timestamp: Date.now()
  }
  messages.value.push(aiMsg)
  
  isLoading.value = true
  loadingMessageId.value = aiMsg.id
  
  const apiMessages = messages.value
    .filter(m => m.id !== aiMsg.id)
    .map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content
    }))
  
  try {
    await sendMockChatMessage(
      (chunk) => {
        aiMsg.content += chunk
      },
      () => {
        isLoading.value = false
        loadingMessageId.value = ''
      }
    )
  } catch (error) {
    aiMsg.content = `发生错误: ${error instanceof Error ? error.message : '未知错误'}`
    isLoading.value = false
    loadingMessageId.value = ''
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

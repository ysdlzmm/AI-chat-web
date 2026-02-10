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
            <div class="text-sm leading-7 whitespace-pre-wrap">{{ msg.content }}</div>
          </div>
        </div>
        
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center min-h-[55vh]">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-soft/20 flex items-center justify-center mb-5">
            <NIcon :component="SparklesOutline" :size="32" class="text-primary-soft" />
          </div>
          <h2 class="text-xl font-medium text-text mb-2">有什么可以帮你的吗？</h2>
          <!-- <p class="text-sm text-text-dim">输入你的问题，AI 将为你解答</p> -->
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
            @keydown="handleKeyDown"
          />
          <NButton
            quaternary
            :type="inputText.trim() ? 'primary' : 'default'"
            :disabled="!inputText.trim()"
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

const messages = ref<Message[]>([])
const inputText = ref('')

const handleSend = () => {
  if (!inputText.value.trim()) return
  
  const userMsg: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: inputText.value,
    timestamp: Date.now()
  }
  
  messages.value.push(userMsg)
  inputText.value = ''
  
  setTimeout(() => {
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '这是一个示例回复。实际使用时，请接入真实的 AI API。',
      timestamp: Date.now()
    }
    messages.value.push(aiMsg)
  }, 1000)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col bg-darker">
    <div class="flex-1 overflow-y-auto p-4">
      <div class="max-w-3xl mx-auto">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="mb-6"
          :class="msg.role === 'user' ? 'text-right' : 'text-left'"
        >
          <div
            class="inline-block max-w-[80%] p-4 rounded-2xl"
            :class="msg.role === 'user' ? 'bg-primary text-white' : 'bg-dark text-gray-100'"
          >
            {{ msg.content }}
          </div>
        </div>
        
        <div v-if="messages.length === 0" class="text-center text-gray-500 mt-20">
          <NIcon :component="ChatbubblesOutline" class="text-6xl mb-4" />
          <p class="text-lg">开始对话吧</p>
          <p class="text-sm mt-2">输入问题，AI 将为你解答</p>
        </div>
      </div>
    </div>
    
    <div class="p-4 border-t border-gray-700">
      <div class="max-w-3xl mx-auto">
        <div class="flex gap-2">
          <NInput
            v-model:value="inputText"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4 }"
            placeholder="输入消息..."
            @keydown="handleKeyDown"
          />
          <NButton
            type="primary"
            :disabled="!inputText.trim()"
            @click="handleSend"
          >
            <template #icon>
              <NIcon :component="SendOutline" />
            </template>
            发送
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NButton, NIcon } from 'naive-ui'
import { SendOutline, ChatbubblesOutline } from '@vicons/ionicons5'
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
  
  // 模拟 AI 回复
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

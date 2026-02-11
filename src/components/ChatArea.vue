<template>
  <div class="flex flex-1 flex-col bg-bg">
    <div class="custom-scrollbar flex-1 overflow-y-auto">
      <div class="mx-auto max-w-3xl px-6 py-10">
        <div
          v-for="msg in displayMessages"
          :key="msg.id"
          class="mb-10 flex gap-3.5"
          :class="msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
        >
          <div
            class="h-8 w-8 flex shrink-0 items-center justify-center rounded-lg"
            :class="msg.role === 'user' ? 'bg-gradient-to-br from-primary to-primary-soft' : 'bg-surface'"
          >
            <NIcon
              :component="msg.role === 'user' ? PersonOutline : SparklesOutline"
              :size="15"
              :class="msg.role === 'user' ? 'text-white' : 'text-primary-soft'"
            />
          </div>
          <div
            class="max-w-[75%] rounded-2xl px-4 py-3"
            :class="msg.role === 'user' ? 'bg-gradient-to-br from-primary to-primary-soft text-white' : 'bg-surface text-text'"
          >
            <div 
              class="whitespace-pre-wrap text-sm leading-7"
              v-html="formatMessage(msg.content)"
            ></div>
            <div v-if="msg.role === 'assistant' && isLoading && msg.id === loadingMessageId" class="mt-2 flex items-center gap-1">
              <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-text-dim" style="animation-delay: 0ms"></span>
              <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-text-dim" style="animation-delay: 150ms"></span>
              <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-text-dim" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
        
        <div v-if="displayMessages.length === 0" class="min-h-[55vh] flex flex-col items-center justify-center">
          <div class="mb-5 h-16 w-16 flex items-center justify-center rounded-2xl from-primary/20 to-primary-soft/20 bg-gradient-to-br">
            <NIcon :component="SparklesOutline" :size="32" class="text-primary-soft" />
          </div>
          <h2 class="mb-2 text-xl text-text font-medium">有什么可以帮你的吗？</h2>
        </div>
      </div>
    </div>
    
    <div class="border-t border-border">
      <div class="mx-auto max-w-3xl px-4 py-4">
        <div class="relative flex items-end gap-2 rounded-2xl bg-surface px-4 py-2">
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
            class="mb-0.5 shrink-0"
            @click="handleSend"
          >
            <template #icon>
              <NIcon :component="SendOutline" :size="18" />
            </template>
          </NButton>
        </div>
        <p class="mt-2.5 text-center text-xs text-text-dim">Enter 发送，Shift + Enter 换行</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NInput, NButton, NIcon } from 'naive-ui'
import { SendOutline, PersonOutline, SparklesOutline } from '@vicons/ionicons5'
import type { Message, Conversation } from '../types'
import { sendMockChatMessage } from '../api/mock'

const props = defineProps<{
  conversation?: Conversation
}>()

const inputText = ref('')
const isLoading = ref(false)
const loadingMessageId = ref('')

const displayMessages = computed(() => props.conversation?.messages || [])

const formatMessage = (content: string) => {
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-surface2 rounded-lg p-3 my-2 overflow-x-auto text-xs"><code>$1</code></pre>')
}

const handleSend = async () => {
  if (!inputText.value.trim() || isLoading.value || !props.conversation) return
  
  const userMsg: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: inputText.value,
    timestamp: Date.now()
  }
  
  props.conversation.messages.push(userMsg)
  inputText.value = ''
  
  const aiMsg: Message = {
    id: (Date.now() + 1).toString(),
    role: 'assistant',
    content: '',
    timestamp: Date.now()
  }
  props.conversation.messages.push(aiMsg)

  isLoading.value = true
  loadingMessageId.value = aiMsg.id

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

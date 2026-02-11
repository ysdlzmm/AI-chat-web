<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { NInput } from 'naive-ui';
import { NIcon } from 'naive-ui'
import { AddOutline, CloseOutline, ChatbubblesOutline, SparklesOutline, ChevronForwardOutline, ChevronBackOutline, CreateOutline } from '@vicons/ionicons5'
import type { Conversation } from '../types'

defineProps<{
  conversations: Conversation[]
  activeId: string
}>()

const emit = defineEmits<{
  'update:activeId': [id: string]
  'newConversation': []
  'deleteConversation': [id: string]
  'updateConversationTitle': [{ id: string, title: string }]
}>()

const collapsed = ref(false)
const editingId = ref<string | null>(null)
const editingTitle = ref('')
const editInputRef = ref<InstanceType<typeof NInput> | null>(null)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const handleNewChat = () => {
  emit('newConversation')
}

const handleSelectConversation = (id: string) => {
  emit('update:activeId', id)
}

const handleDeleteConversation = (id: string) => {
  emit('deleteConversation', id)
}

const handleStartEdit = async (id: string, title: string) => {
  editingId.value = id
  editingTitle.value = title
  await nextTick()
  editInputRef.value?.focus()
}

const handleSaveEdit = () => {
  if (editingId.value && editingTitle.value.trim()) {
    emit('updateConversationTitle', { id: editingId.value, title: editingTitle.value.trim() })
  }
  editingId.value = null
  editingTitle.value = ''
}

const handleEditKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    ;(e.target as HTMLElement).blur()
  } else if (e.key === 'Escape') {
    editingId.value = null
    editingTitle.value = ''
  }
}
</script>

<template>
  <div class="relative bg-surface">
    <div 
      class="flex flex-col overflow-hidden border-r border-border transition-all duration-300 ease-in-out"
      :class="collapsed ? 'w-[55px]' : 'w-[280px]'"
    >
      <div class="p-3">
        <div class="mb-4 flex items-center gap-3">
          <div class="h-8 w-8 flex shrink-0 items-center justify-center rounded-lg from-primary to-primary-soft bg-gradient-to-br">
            <NIcon :component="SparklesOutline" :size="16" class="text-white" />
          </div>
          <span 
            class="overflow-hidden whitespace-nowrap text-base text-text font-semibold transition-all duration-300 ease-in-out"
            :class="collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'"
          >AI Chat</span>
        </div>
        <button
          class="w-full flex items-center border-0 rounded-lg bg-primary text-sm text-white font-medium transition-all duration-200 active:scale-[0.98] hover:scale-[1.02] hover:bg-primary/90"
          :class="collapsed ? 'justify-center py-1.5 px-4' : 'justify-center gap-2 py-2.5 px-4'"
          @click="handleNewChat"
        >
          <NIcon :component="AddOutline" :size="16" class="shrink-0" />
          <span 
            class="overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out"
            :class="collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'"
          >新建对话</span>
        </button>
      </div>
      
      <div class="custom-scrollbar flex-1 overflow-y-auto px-3 pb-2">
        <div
          v-for="conv in conversations"
          :key="conv.id"
          class="group relative cursor-pointer rounded-lg transition-all duration-150"
          :class="[
            activeId === conv.id ? 'bg-primary/15' : 'hover:bg-surface-hover/50',
            collapsed ? 'py-1.5 my-1 flex justify-center' : 'px-3 py-2.5 my-1'
          ]"
          @click="handleSelectConversation(conv.id)"
        >
          <div class="flex items-center" :class="collapsed ? 'justify-center' : 'gap-2'">
            <NIcon 
              :component="ChatbubblesOutline" 
              :size="16" 
              class="shrink-0"
              :class="activeId === conv.id ? 'text-primary' : 'text-text-dim'" 
            />
            <template v-if="editingId === conv.id && !collapsed">
              <NInput
                ref="editInputRef"
                v-model:value="editingTitle"
                size="tiny"
                class="flex-1"
                @blur="handleSaveEdit"
                @keydown="handleEditKeydown"
              />
            </template>
            <span 
              v-else
              class="flex-1 overflow-hidden truncate whitespace-nowrap text-sm transition-all duration-300 ease-in-out"
              :class="[
                activeId === conv.id ? 'text-primary' : 'text-text',
                collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
              ]"
              >{{ conv.title }}</span>
            <template v-if="!collapsed && editingId !== conv.id">
              <NIcon
                :component="CreateOutline"
                :size="14"
                class="shrink-0 text-text-dim opacity-0 transition-all hover:text-primary group-hover:opacity-100"
                @click.stop="handleStartEdit(conv.id, conv.title)"
              />
              <NIcon
                :component="CloseOutline"
                :size="14"
                class="shrink-0 text-text-dim opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
                @click.stop="handleDeleteConversation(conv.id)"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <button
      class="absolute top-1/2 z-10 flex items-center justify-center border-0 border-border rounded-full bg-surface-hover shadow-lg transition-all duration-200 -translate-y-1/2"
      :class="collapsed ? 'right-[-14px]' : '-right-3'"
      style="width: 24px; height: 24px;"
      @click="toggleCollapse"
    >
      <NIcon 
        :component="collapsed ? ChevronForwardOutline : ChevronBackOutline" 
        :size="14"
        class="text-text-dim"
      />
    </button>
  </div>
</template>


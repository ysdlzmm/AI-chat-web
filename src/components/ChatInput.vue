<template>
    <div class="max-w-4xl mx-auto">
        <div class="bg-dark-surface rounded-2xl border border-dark-border focus-within:border-purple-500 transition-colors">
            <div class="flex items-end p-3">
                <button class="p-2 hover:bg-dark-border rounded-lg transition-colors mr-2">
                    <i class="i-carbon-attachment text-dark-secondary text-xl" />
                </button>

                <textarea
                    ref="textareaRef"
                    v-model="content"
                    class="flex-1 bg-transparent resize-none outline-none text-dark-text placeholder-dark-secondary min-h-[56px] max-h-[200px]"
                    placeholder="输入消息... (Shift + Enter 换行)"
                    rows="1"
                    @keydown="handleKeydown"
                    @input="autoResize"
                />

                <button
                    class="p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-dark-border disabled:cursor-not-allowed rounded-lg transition-colors ml-2"
                    :disabled="!content.trim()"
                    @click="handleSend"
                >
                    <i class="i-carbon-send text-white text-xl" />
                </button>
            </div>

            <div class="px-3 pb-2 flex items-center justify-between text-xs text-dark-secondary">
                <div class="flex items-center gap-3">
                    <span>{{ content.length }} / 4000</span>
                </div>
                <div class="flex items-center gap-2">
                    <button class="hover:text-dark-text transition-colors flex items-center gap-1">
                        <i class="i-carbon-arrow-up" />
                        <span>深度思考</span>
                    </button>
                    <button class="hover:text-dark-text transition-colors flex items-center gap-1">
                        <i class="i-carbon-earth" />
                        <span>联网搜索</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="text-center text-xs text-dark-secondary mt-3">AI 生成的内容可能不准确，请核实重要信息</div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

const emit = defineEmits<{
    send: [content: string];
}>();

const content = ref('');
const textareaRef = ref<HTMLTextAreaElement>();

const handleSend = () => {
    if (!content.value.trim()) return;
    emit('send', content.value);
    content.value = '';
    nextTick(() => {
        if (textareaRef.value) {
            textareaRef.value.style.height = 'auto';
        }
    });
};

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
};

const autoResize = () => {
    const textarea = textareaRef.value;
    if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
};
</script>

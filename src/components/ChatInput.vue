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
<template>
    <div class="mx-auto max-w-4xl">
        <div class="bg-dark-surface border-dark-border border rounded-2xl transition-colors focus-within:border-purple-500">
            <div class="flex items-end p-3">
                <button class="hover:bg-dark-border mr-2 rounded-lg p-2 transition-colors">
                    <i class="text-dark-secondary i-carbon-attachment text-xl" ></i>
                </button>

                <textarea
                    ref="textareaRef"
                    v-model="content"
                    class="text-dark-text placeholder-dark-secondary max-h-[200px] min-h-[56px] flex-1 resize-none bg-transparent outline-none"
                    placeholder="输入消息... (Shift + Enter 换行)"
                    rows="1"
                    @keydown="handleKeydown"
                    @input="autoResize"
                ></textarea>

                <button
                    class="disabled:bg-dark-border ml-2 rounded-lg bg-purple-600 p-2 transition-colors disabled:cursor-not-allowed hover:bg-purple-700"
                    :disabled="!content.trim()"
                    @click="handleSend"
                >
                    <i class="i-carbon-send text-xl text-white" ></i>
                </button>
            </div>

            <div class="text-dark-secondary flex items-center justify-between px-3 pb-2 text-xs">
                <div class="flex items-center gap-3">
                    <span>{{ content.length }} / 4000</span>
                </div>
                <div class="flex items-center gap-2">
                    <button class="hover:text-dark-text flex items-center gap-1 transition-colors">
                        <i class="i-carbon-arrow-up" ></i>
                        <span>深度思考</span>
                    </button>
                    <button class="hover:text-dark-text flex items-center gap-1 transition-colors">
                        <i class="i-carbon-earth" ></i>
                        <span>联网搜索</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="text-dark-secondary mt-3 text-center text-xs">AI 生成的内容可能不准确，请核实重要信息</div>
    </div>
</template>



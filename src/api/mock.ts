// 模拟 API 响应（用于测试，不消耗 API 额度）
export async function sendMockChatMessage(
  onChunk: (content: string) => void,
  onComplete: () => void
) {
  const mockResponse = `这是一个模拟回复，用于测试 UI 功能。

**功能特性：**
- 支持多行文本
- 支持 **Markdown** 格式
- 可以显示代码块

\`\`\`javascript
console.log('Hello, DeepSeek!')
\`\`\`

请在 .env 文件中配置真实的 DEEPSEEK_API_KEY 来使用真实 API。`

  const chunks = mockResponse.split('').map((char) => ({
    char,
    delay: Math.random() * 30 + 10
  }))

  for (const { char, delay } of chunks) {
    await new Promise(resolve => setTimeout(resolve, delay))
    onChunk(char)
  }

  onComplete()
}

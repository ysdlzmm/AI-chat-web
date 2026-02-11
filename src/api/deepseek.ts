const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || ''

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatCompletionRequest {
  messages: Message[]
  model: string
  stream: boolean
  temperature?: number
  max_tokens?: number
}

export async function sendChatMessage(
  messages: Message[],
  onChunk: (content: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
) {
  if (!DEEPSEEK_API_KEY) {
    onError(new Error('请先在 .env 文件中设置 VITE_DEEPSEEK_API_KEY'))
    return
  }

  const request: ChatCompletionRequest = {
    messages,
    model: 'deepseek-chat',
    stream: true,
    temperature: 0.7,
    max_tokens: 4096
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      const errorMessage = error.error?.message || `API 错误: ${response.status}`
      
      // 提供更友好的错误提示
      if (errorMessage.includes('Insufficient Balance')) {
        throw new Error('账户余额不足，请前往 DeepSeek 平台充值。参考 DEEPSEEK_BALANCE.md')
      }
      
      throw new Error(errorMessage)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('无法读取响应流')
    }

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue
        
        const data = trimmed.slice(6)
        if (data === '[DONE]') {
          onComplete()
          return
        }

        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content
          if (content) {
            onChunk(content)
          }
        } catch (e) {
          console.error('解析响应错误:', e)
        }
      }
    }

    onComplete()
  } catch (error) {
    onError(error as Error)
  }
}

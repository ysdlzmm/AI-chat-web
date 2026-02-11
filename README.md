# AI Chat Web

基于 Vue3 + TypeScript + NaiveUI + UnoCSS + Vite 的 AI 聊天应用

## 功能特性

- 🎨 简洁现代的 UI 设计
- 💬 流式 AI 对话
- 📱 响应式布局
- 🌙 深色主题
- 📝 支持多会话管理
- 🔽 可折叠侧边栏

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全
- **Naive UI** - Vue 3 组件库
- **UnoCSS** - 原子化 CSS 引擎
- **Vite** - 下一代前端构建工具

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置 DeepSeek API Key

1. 复制 `.env.example` 文件并重命名为 `.env`

```bash
cp .env.example .env
```

2. 在 `.env` 文件中设置你的 DeepSeek API Key

```
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

获取 API Key：访问 [DeepSeek 开放平台](https://platform.deepseek.com/) 注册并获取

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
AI-chat-web/
├── src/
│   ├── api/           # API 调用
│   ├── components/    # Vue 组件
│   ├── types/         # TypeScript 类型定义
│   ├── views/         # 页面视图
│   ├── App.vue        # 根组件
│   └── main.ts        # 入口文件
├── public/            # 静态资源
├── .env.example       # 环境变量示例
├── index.html         # HTML 模板
├── package.json       # 项目配置
├── tsconfig.json      # TypeScript 配置
├── vite.config.ts     # Vite 配置
└── uno.config.ts      # UnoCSS 配置
```

## 使用说明

1. 点击"新建对话"创建新的会话
2. 在输入框中输入消息，按 Enter 发送
3. 支持 Markdown 格式回复
4. 左侧侧边栏可折叠

## 注意事项

- 请勿将 `.env` 文件提交到版本控制
- API Key 有使用限制，请合理使用
- 建议在生产环境使用环境变量管理 API Key

## 许可证

MIT

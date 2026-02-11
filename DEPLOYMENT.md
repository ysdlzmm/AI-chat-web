# Vercel / Netlify 部署指南

## 方案一：Vercel 部署（推荐）

### 1. 准备工作

- [ ] GitHub 账号
- [ ] Vercel 账号（https://vercel.com）
- [ ] DeepSeek API Key

### 2. 构建项目

在项目根目录运行：

```bash
npm run build
```

### 3. 部署步骤

#### 方式 A：通过 Vercel CLI（推荐）

1. 安装 Vercel CLI
```bash
npm install -g vercel
```

2. 登录 Vercel
```bash
vercel login
```

3. 部署项目
```bash
vercel
```

4. 配置环境变量
```bash
vercel env add VITE_DEEPSEEK_API_KEY
```
输入你的 DeepSeek API Key

5. 生产环境部署
```bash
vercel --prod
```

#### 方式 B：通过 Vercel 网页

1. 访问 https://vercel.com
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 配置项目：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. 添加环境变量：
   - Key: `VITE_DEEPSEEK_API_KEY`
   - Value: 你的 API Key

6. 点击 "Deploy"

### 4. 自定义域名配置

1. 在 Vercel 项目设置中选择 "Domains"
2. 添加你的域名
3. 配置 DNS：
   - 类型：CNAME
   - 名称：@ 或 www
   - 值：cname.vercel-dns.com

### 5. 更新代码自动部署

每次推送代码到 GitHub 主分支，Vercel 会自动重新部署。

---

## 方案二：Netlify 部署

### 1. 准备工作

- [ ] GitHub 账号
- [ ] Netlify 账号（https://netlify.com）

### 2. 部署步骤

#### 方式 A：通过 Netlify CLI

1. 安装 Netlify CLI
```bash
npm install -g netlify-cli
```

2. 登录
```bash
netlify login
```

3. 初始化
```bash
netlify init
```

4. 部署
```bash
netlify deploy --prod
```

#### 方式 B：通过 Netlify 网页

1. 访问 https://netlify.com
2. 点击 "Add new site" → "Import an existing project"
3. 连接 GitHub 仓库
4. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

5. 添加环境变量：
   - Site settings → Environment variables
   - 添加：`VITE_DEEPSEEK_API_KEY`

6. 点击 "Deploy site"

### 3. 自定义域名

1. Domain settings → Add custom domain
2. 配置 DNS：
   - 类型：CNAME
   - 名称：@ 或 www
   - 值：your-site.netlify.app

---

## 部署后检查清单

- [ ] 网站可以正常访问
- [ ] API 调用正常工作
- [ ] HTTPS 证书正常
- [ ] 自定义域名生效
- [ ] 移动端显示正常

---

## 重要提示

### API Key 安全

⚠️ **环境变量必须配置！**

不要将 API Key 硬编码到代码中，必须在部署平台配置环境变量。

### 客户端 API Key 风险

当前方案在前端使用 API Key，存在安全风险。建议：

1. **短期方案**：
   - 设置 API Key 使用限额
   - 定期轮换 API Key
   - 监控 API 使用情况

2. **长期方案**（推荐）：
   - 搭建后端服务器代理 API 请求
   - 实现用户认证系统
   - 在服务端管理 API Key

### 测试部署

部署前确保：
```bash
# 本地测试构建
npm run build
npm run preview

# 访问 http://localhost:4173 测试
```

---

## 域名购买推荐

- 国外：Namecheap、GoDaddy
- 国内：阿里云、腾讯云、Cloudflare

---

## 常见问题

**Q: 部署后 API 调用失败？**
A: 检查环境变量是否正确配置，重启部署。

**Q: 自定义域名不生效？**
A: DNS 配置需要 10 分钟 - 24 小时生效。

**Q: Vercel 免费版限制？**
A: 每月 100GB 流量，无限部署，足够个人使用。

**Q: 如何切换回真实 API？**
A: 修改 ChatArea.vue 的导入语句即可。

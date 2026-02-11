# 部署检查清单

## 部署前准备

- [ ] 代码已提交到 GitHub
- [ ] 测试本地构建：`npm run build`
- [ ] 准备好 DeepSeek API Key
- [ ] 注册 Vercel 账号

## Vercel 部署步骤

- [ ] 访问 https://vercel.com
- [ ] 连接 GitHub 仓库
- [ ] 配置构建设置
  - [ ] Framework: Vite
  - [ ] Build Command: npm run build
  - [ ] Output Directory: dist
- [ ] 添加环境变量：VITE_DEEPSEEK_API_KEY
- [ ] 部署完成
- [ ] 测试访问

## 自定义域名配置

- [ ] 在域名注册商购买域名
- [ ] 在 Vercel 添加自定义域名
- [ ] 配置 DNS 记录（CNAME）
- [ ] 等待 DNS 生效（10分钟-24小时）
- [ ] HTTPS 证书自动配置

## 部署后验证

- [ ] 网站可以正常访问
- [ ] 发送消息测试 API
- [ ] 移动端测试
- [ ] 检查控制台无错误
- [ ] 测试所有功能正常

## 安全检查

- [ ] API Key 配置为环境变量
- [ ] .env 文件不在代码库中
- [ ] 设置 API 使用限额

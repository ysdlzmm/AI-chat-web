# 修复 Vercel 环境变量错误

## 问题原因

`vercel.json` 中使用了不存在的 Secret 引用。我们已移除该配置，改为在 Vercel 界面直接配置。

## 解决方案：在 Vercel 界面配置环境变量

### 步骤 1：进入项目设置

1. 登录 Vercel：https://vercel.com
2. 找到你的项目
3. 点击 "Settings" 标签

### 步骤 2：添加环境变量

1. 在左侧菜单选择 **"Environment Variables"**
2. 点击 **"Add New"** 按钮
3. 填写信息：
   - **Key**: `VITE_DEEPSEEK_API_KEY`
   - **Value**: 输入你的 DeepSeek API Key
   - **Environment**: 选择 `Production`、`Preview`、`Development`（建议全选）
4. 点击 **"Save"** 保存

### 步骤 3：重新部署

环境变量添加后需要重新部署：

1. 进入 **"Deployments"** 标签
2. 找到最新的部署记录
3. 点击右上角的 **"..."** 菜单
4. 选择 **"Redeploy"**
5. 勾选 **"Clear cache and re-deploy without using cache"**
6. 点击 **"Redeploy"**

## 快速检查

部署后测试：

```bash
# 在浏览器控制台检查环境变量
console.log(import.meta.env.VITE_DEEPSEEK_API_KEY)
```

如果输出你的 API Key（或部分显示），说明配置成功。

## 常见问题

**Q: 为什么不能在 vercel.json 中配置？**
A: 为了安全，敏感信息应该通过界面配置，不会提交到代码库。

**Q: 三个环境都要选吗？**
A: 建议全选，这样在所有分支都能正常工作。

**Q: 修改环境变量后多久生效？**
A: 需要重新部署才能生效。

## 安全提示

⚠️ **重要**：
- 不要将 API Key 提交到 Git 仓库
- 确保 `.env` 和 `.env.local` 在 `.gitignore` 中
- 定期轮换 API Key
- 在 DeepSeek 平台设置使用限额

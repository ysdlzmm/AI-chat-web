# DeepSeek API 余额不足解决方案

## 问题原因

错误 "Insufficient Balance" 表示您的 DeepSeek 账户余额不足，无法调用 API。

## 解决方法

### 1. 充值账户

1. 访问 [DeepSeek 开放平台](https://platform.deepseek.com/)
2. 登录您的账户
3. 进入「费用管理」或「充值」页面
4. 选择充值金额并完成支付

### 2. 查看余额

在 DeepSeek 控制台可以查看：
- 当前余额
- 使用明细
- 费用统计

### 3. 免费额度

DeepSeek 通常为新用户提供免费试用额度，请检查：
- 是否已经用完免费额度
- 免费额度的使用期限

## 费用说明

DeepSeek API 按 token 计费：
- 输入 token：¥0.001 / 1K tokens
- 输出 token：¥0.002 / 1K tokens
- 大约 1 元可以处理数十万汉字

## 临时解决方案

如果暂时不想充值，可以：

1. **使用模拟数据**（用于测试）
   ```typescript
   // 在 src/api/deepseek.ts 中临时修改
   export async function sendChatMessage(...) {
     // 模拟响应
     setTimeout(() => {
       onChunk('这是一个模拟回复，用于测试 UI 功能。')
       onComplete()
     }, 500)
   }
   ```

2. **申请免费额度**
   - 关注 DeepSeek 官方活动
   - 查看是否有学术或开发者优惠

## 注意事项

- API 调用会消耗余额，请注意使用量
- 建议设置预算告警
- 生产环境需要监控 API 使用情况

## 联系支持

如果遇到问题，可以联系 DeepSeek 官方支持：
- 官方文档：https://platform.deepseek.com/docs
- 客服支持：通过平台工单系统

# 百度贴吧正序排序助手

自动点击百度贴吧帖子页面中的"正序"按钮，让回复默认按最早时间排序。

## 功能

- 自动检测并点击贴吧帖子页面的"正序"排序按钮
- 支持页面切换时自动重新点击正序
- 兼容百度贴吧的 AJAX 页面跳转

## 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击脚本文件 `tieba_zhengxu.user.js`，Tampermonkey 会自动识别并提示安装
3. 安装完成后，访问贴吧帖子页面即可自动生效

## 使用方法

安装后无需任何操作，访问以下页面时会自动点击正序：

- `https://tieba.baidu.com/p/*` （任意贴吧帖子页面）

## 工作原理

- 脚本会在页面加载后自动查找包含"正序"文字的按钮元素
- 通过 MutationObserver 监听页面 DOM 变化，确保动态加载的内容也能被处理
- 劫持 history.pushState/replaceState 方法，捕获 AJAX 页面跳转

## 版本历史

- **v1.0** - 初始版本，实现基本的正序自动点击功能

## 适用场景

适合需要查看贴吧帖子最早回复内容的用户，避免默认的倒序排列。

## 技术栈

- JavaScript (Userscript)
- Tampermonkey API

## License

MIT
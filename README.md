# Ryu 的小站

用 [Astro](https://astro.build) 搭的静态博客，部署在 GitHub Pages。

- 仓库：`https://github.com/Yangryu/Ryu`
- 线上：`https://yangryu.github.io/Ryu/`

因为仓库名不是 `Yangryu.github.io`，所以站点挂在 `/Ryu` 子路径下——`astro.config.mjs` 里的 `base` 已经配好了，站内链接都走 `src/consts.ts` 的 `url()` 函数，**别手写 `/posts/xxx` 这种绝对路径**，会 404。

---

## 第一次跑起来

```powershell
cd my-blog
npm install      # 第一次要等一两分钟
npm run dev      # 打开 http://localhost:4321/Ryu/
```

改东西保存后浏览器会自动刷新。

## 发布

```powershell
npm run build    # 只构建，产物在 dist/，可选
git add .
git commit -m "更新内容"
git push
```

推上去之后 GitHub Actions 自动构建并发布，一两分钟线上就更新了。

第一次推送前要先配 git 身份（只需一次）：

```powershell
git config --global user.name "Yangryu"
git config --global user.email "你的邮箱"
```

---

## 写一篇文章

在 `src/content/blog/` 里新建一个 `.md`，文件名就是 URL：

```
src/content/blog/2026-11-05-my-day.md  →  /Ryu/posts/2026-11-05-my-day/
```

文件开头要有 frontmatter：

```markdown
---
title: 标题
date: 2026-11-05
column: 生活随笔
tags: [日常, 记录]
excerpt: 可选，首页摘要；不写就自动截正文前 90 字
---

正文从这里开始。
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `date` | 是 | `YYYY-MM-DD`，决定排序 |
| `column` | 否 | 专栏名，默认「生活随笔」 |
| `tags` | 否 | `[标签1, 标签2]` |
| `excerpt` | 否 | 首页摘要 |
| `draft` | 否 | `true` 则跳过不发布 |

五个专栏：生活随笔 / 学习记录 / 作品集 / 爱好 / 小站日志。想加新专栏，改 `src/lib/posts.ts` 里的 `COLUMNS` 数组（文章 frontmatter 的 `column` 写成新名字，专栏页会自动生成）。

## 目录结构

```
my-blog/
├── astro.config.mjs          # site / base 配置
├── src/
│   ├── consts.ts             # 站名、副标题、作者 ← 想改站名改这里
│   ├── content.config.ts     # 文章字段定义
│   ├── content/blog/         # 文章
│   ├── layouts/Base.astro    # 页面外壳（导航、页脚）
│   ├── lib/posts.ts          # 取文章、专栏定义
│   ├── pages/                # 路由
│   │   ├── index.astro       # 大厅
│   │   ├── posts/[...slug].astro
│   │   ├── columns/          # 专栏列表 + 单专栏
│   │   ├── tags/             # 标签列表 + 单标签
│   │   ├── archive.astro     # 归档
│   │   ├── about.astro       # 关于
│   │   └── rss.xml.js        # RSS
│   └── styles/global.css     # 全部样式（配色在顶部 :root）
└── .github/workflows/deploy.yml
```

## 改样式

全部在 `src/styles/global.css` 顶部的 `:root`：

```css
--bg: #0c0d10;        /* 背景 */
--text: #ddd8e6;      /* 正文 */
--accent: #c7b5f2;    /* 强调色 */
--serif: ...;         /* 标题用的衬线字体 */
```

## 常见问题

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 页面样式全丢、链接 404 | 手写了 `/xxx` 绝对路径，漏了 `/Ryu` | 用 `url('/xxx')` |
| `npm install` 报 SSL 错误 | 本机有代理软件在拦证书 | `npm config set strict-ssl false` |
| Actions 红叉 | 看日志，多半是 frontmatter 字段类型不对 | 按上表核对 |
| 推送卡住 / 超时 | 国内连 github.com:443 不稳 | 已配好 SSH，走 22 端口 |

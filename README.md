# Dongsheng Bi · 毕东生 — Personal Site / 个人博客网站

A bilingual (EN / 中文), fully static personal website for **Dongsheng Bi (毕东生), Ph.D.** — Senior LLM Algorithm Engineer at Ant Group · Alipay.

## 特点 / Features

- **双语切换** — 右上角 `EN / 中` 一键切换，记忆上次选择（localStorage）。所有内容（含论文、经历、项目）均为中英双语，单一数据源 `data.js`。
- **真实论文链接** — Publications 区每篇论文均附可验证链接（DOI / PubMed / ACM DL）。
- **高端编辑风格** — “墨黑 + 烫金”主题，Fraunces 衬线展示字体 + Plus Jakarta Sans 正文 + Noto Serif/Sans SC 中文字体；流动光晕背景、胶片颗粒、滚动渐显动效。
- **自包含 / 可直接部署** — 纯 HTML/CSS/JS，无构建步骤、无依赖；简历 `.doc` 已内置，整个文件夹可直接托管。
- 响应式、支持 `prefers-reduced-motion`、无障碍语义。

## 本地预览 / Run locally

```bash
cd website
python3 -m http.server 8080
# 打开 http://localhost:8080
```

直接双击 `index.html` 也可打开（在线字体需联网加载）。

## 部署 / Deploy

把整个 `website/` 文件夹拖到任意静态托管即可：

- **GitHub Pages**：推到仓库 → Settings → Pages → 选择分支 `/website`。
- **Vercel / Netlify / Cloudflare Pages**：导入仓库，根目录设为 `website/`，无需构建命令。

## 文件结构 / Structure

| 文件 | 说明 |
| --- | --- |
| `index.html` | 页面骨架与各区块容器 |
| `data.js` | **唯一内容源**：中英文文案、论文、经历、项目、奖项 |
| `script.js` | i18n 渲染、语言切换、滚动显隐与导航高亮 |
| `styles.css` | 全部样式（主题变量、动效、响应式） |
| `毕东生博士-大模型算法-简历V2.doc` | 可下载简历 |

## 更新内容 / Editing content

所有文字、论文、链接都集中在 `data.js`，按区块（`I18N` / `METRICS` / `EXPERIENCE` / `PUBS_*` 等）修改对应中英字段即可，无需改动 HTML 或 CSS。

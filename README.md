<h1 align="center">Dongsheng Bi · 毕东生, Ph.D.</h1>

<p align="center">
  <b>Senior LLM Algorithm Engineer</b> · Post-Training (RM / RL) & Medical AI<br/>
  大模型高级算法工程师 · 后训练 (RM / RL) 与医疗 AI
</p>

<p align="center">
  <a href="https://bds18616852673.github.io/"><b>🌐 Live Site / 在线主页</b></a> ·
  <a href="https://arxiv.org/abs/2601.06193">arXiv</a> ·
  <a href="https://github.com/bds18616852673/MLB_benchmark">MLB Benchmark</a> ·
  <a href="https://huggingface.co/MedAIBase/AntAngelMed">🤗 AntAngelMed</a> ·
  <a href="mailto:bb530587150@163.com">Email</a>
</p>

---

This repository hosts my bilingual (EN / 中文) personal site — a static, dependency-free page deployed via **GitHub Pages**.
本仓库是我的中英双语个人主页，纯静态、无依赖，通过 **GitHub Pages** 部署。

## Highlights / 亮点

- 🏥 **#1 on MedAIBench & HealthBench** with the open-sourced **AntAngelMed** (Ling-flash, 100B-A6B MoE), trained on a 1000-GPU H200 cluster — surpassing trillion-parameter systems.
- 🧪 **KDD 2026** (32nd ACM SIGKDD) — *MLB: A Scenario-Driven Benchmark for Evaluating LLMs in Clinical Applications* (co-first author).
- 🎯 RM / RL post-training for multimodal (text + image) generation; rubric-based judge models; VLM RL fine-tuning.
- 🎓 Ph.D., Fudan University · CSC visiting scholar, University of Alberta · 8 SCI papers (5 first-author), 7 conference papers, 10 patents.

## Try the model / 体验模型

| | Link |
| --- | --- |
| 🌐 Live API · 在线体验 | https://antangelmed.tbox.cn/ |
| 🤗 Hugging Face | https://huggingface.co/MedAIBase/AntAngelMed |
| 🤖 ModelScope | https://modelscope.cn/models/MedAIBase/AntAngelMed |
| 🐙 GitHub | https://github.com/MedAIBase/AntAngelMed |

## Run locally / 本地预览

```bash
python3 -m http.server 8080   # 打开 http://localhost:8080
```

## Structure / 结构

| File | What it is |
| --- | --- |
| `index.html` | Page scaffold / 页面骨架 |
| `data.js` | **All content (EN/ZH)** — edit here / 全部文案，改这里即可 |
| `script.js` | Rendering, i18n, interactions |
| `styles.css` | Styling / 样式 |
| `毕东生博士-大模型算法-简历V2.doc` | Downloadable résumé / 可下载简历 |

> To edit any text, open **`data.js`**, change the EN/ZH string, save, refresh — no build step.
> 修改任何文字，只需打开 **`data.js`** 改对应中英文，保存刷新即可，无需构建。

---

<p align="center"><sub>© 2026 Dongsheng Bi (毕东生) · Shanghai</sub></p>

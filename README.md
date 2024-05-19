<div align="center">
  <img src="ollama-nextjs-ui.gif">
</div>

<h1 align="center">
  Ollama LLMs功能齐全且美观的Web界面
</h1>

<div align="center">
  
![GitHub Repo stars](https://img.shields.io/github/stars/jakobhoeg/nextjs-ollama-llm-ui)
  
</div>


启动并运行大型语言模型 **迅速**, **本地** 甚至 **离线**.
这个项目旨在成为你开始使用LLM的最简单方法。 不需要繁琐和烦人的设置！

# Features ✨

- **美观直观的用户界面：** 受ChatGPT启发，增强用户体验的相似性。
- **完全本地化：** 为方便起见，将聊天存储在本地存储中。无需运行数据库。
- **完全响应：** 使用手机聊天，与在桌面上一样轻松。
- **设置简单：** 无需繁琐烦人的设置。只需克隆存储库，您就可以开始了！
- **代码语法高亮：** 包含代码的消息将被高亮显示，以便于访问。
- **轻松复制代码块：** 一键轻松复制突出显示的代码。
- **下载/拉取和删除模型：** 直接从界面轻松下载和删除模型。
- **在型号之间切换：** 只需单击一下即可在型号之间快速切换。
- **聊天记录：** 聊天记录已保存并易于访问。
- **明暗模式：** 在明暗模式之间切换。

# 预览

https://github.com/jakobhoeg/nextjs-ollama-llm-ui/assets/114422072/08eaed4f-9deb-4e1b-b87a-ba17d81b9a02

# 先决条件 ⚙️

要使用 Web 界面，必须满足以下要求：

1. 下载 [Ollama](https://ollama.com/download) 并让它运行。或者在 Docker 容器中运行它. 选中 [docs](https://github.com/ollama/ollama) 有关说明.
2. Node.js (18+) and npm 是必需的. [Download](https://nodejs.org/en/download)

# 安装以在本地运行 📖

**1. 重命名 `.example.env` to `.env`:**

```
mv .example.env .env
```

**2. 如果您的 Ollama 实例未在默认 IP 地址和端口上运行，请更改 .env 文件中的变量以适合您的用例:**

```
NEXT_PUBLIC_OLLAMA_URL="http://localhost:11434"
```

**3. 安装依赖项:**

```
npm install
```

**4. 启动开发服务器:**

```
npm run build
npm run dev
```

**5. 转到 [localhost:3000](http://localhost:3000) 并开始与您最喜欢的模特聊天!**



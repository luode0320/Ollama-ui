<h1 align="center">
  Ollama LLMs功能齐全且美观的Web界面
</h1>

<div align="center">
  
![demo.png](public%2Fdemo.png)
  
</div>


启动并运行大型语言模型 **迅速**, **本地** 甚至 **离线**.
这个项目旨在成为你开始使用LLM的最简单方法。 不需要繁琐和烦人的设置！

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

**4. 启动:**

```
npm run build
npm run dev
```

**5. 转到 [localhost:3000](http://localhost:3000) 并开始与您最喜欢的模特聊天!**

# docker相关部署

# Ollama是什么?

Ollama 不是一个大语言模型, 它只是一个允许大模型的脚手架。

Ollama 是一个强大的框架，设计用于在 Docker 容器中部署 LLM。

Ollama 的主要功能是在 Docker 容器内部署和管理 LLM 的促进者，它使该过程变得非常简单。

它帮助用户快速在本地运行大模型，通过简单的安装指令，可以让用户执行一条命令就在本地运行开源大型语言模型。



## Ollama有两种模式

- CPU模式
- GPU显卡模式

> 这里使用的是CPU模式, GPU模式请自行百度



## 安装

```sh
docker pull luode0320/ollama:latest
```



## 启动

- 启动后只是启动了一个脚手架, 并没有启用任何的模型
- 需要我们进入ollama后安装我们需要的大模型

```sh
docker run -d \
--restart=always  \
-p 11434:11434 \
--name ollama \
-v /usr/local/src/ollama:/root/.ollama \
--name ollama \
luode0320/ollama:latest
```

```sh
docker exec -it ollama ollama --version
# ollama version is 0.1.38
```



# 安装模型

3B模型需要8G内存，7B 至少需要 8GB 内存，运行 13B 至少需要 16GB 内存。

[模型仓库](https://ollama.com/library)

- 下面的命令就是允许大模型了, 如果没有下载会先下载

```
docker exec -it ollama ollama run gemma:2b
```

```sh
[root@luode ~]# docker exec -it ollama ollama run gemma:2b
success
>>> 你好
你好！有什么我可以帮助你的吗？
```

- 其他命令

```sh
docker exec -it ollama ollama list # 查看安装的模型
docker exec -it ollama ollama rm <name> # 删除模型
```



# 安装ollama-ui

```sh
docker pull luode0320/ollama-ui:latest
```



## 启动

```sh
docker run -d \
-p 6001:3000 \
--restart=always  \
--name ollama-ui \
-v /etc/hosts:/etc/hosts \
-e NEXT_PUBLIC_OLLAMA_URL="http://0.0.0.0:11434" \
luode0320/ollama-ui:latest
```


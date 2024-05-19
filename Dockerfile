# 注意: 此 Dockerfile 配合GitHub action自动化配置, GitHub action自动化配置文件在 .github/workflows/main.yml
# 如果手动执行此dockerfile, 注意将不必要的文件夹删除, 例如.idea, .github, 依赖等

# 使用一个基础的Node.js镜像
FROM node:18-alpine

# 复制当前目录所有文件到 /aap下面
COPY . /app

# 设置主目录为 / app
WORKDIR /app

# 安装依赖
RUN npm install
# 打包
RUN npm run build

ENV NEXT_PUBLIC_OLLAMA_URL="http://0.0.0.0:11434"

CMD ["sh", "-c", "npm run dev"]
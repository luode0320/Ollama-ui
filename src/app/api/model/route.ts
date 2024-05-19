export async function POST(req: Request) {
    const { name } = await req.json();

    const ollamaUrl = process.env.NEXT_PUBLIC_OLLAMA_URL;

    const response = await fetch(ollamaUrl + "/api/pull", {
        method: "POST",
        body: JSON.stringify({ name }),
    });

    // 从响应正文创建新的 ReadableStream
    const stream = new ReadableStream({
        start(controller) {
            if (!response.body) {
                controller.close();
                return;
            }
            const reader = response.body.getReader();

            function pump() {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        controller.close();
                        return;
                    }
                    // 将数据块排队到控制器
                    controller.enqueue(value);
                    pump();
                }).catch(error => {
                    console.error("读取响应正文时出错:", error);
                    controller.error(error);
                });
            }

            pump();
        }
    });

    // 设置响应标头并返回流
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/json");
    return new Response(stream, { headers });
}

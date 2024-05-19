"use client";

import React, { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "请选择要拉动的型号",
  }),
});

// 这个是拉取模型的组件
export default function PullModelForm() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();
  const env = process.env.NODE_ENV;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Trim whitespace
    data.name = data.name.trim();

    setIsDownloading(true);
    // 将模型名称发送到服务器
    if (env === "production") {
      // 向 localhost 发出发布请求
      const pullModel = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_OLLAMA_URL + "/api/pull", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const json = await response.json();
        if (json.error) {
          toast.error("Error: " + json.error);
          setIsDownloading(false);
          return;
        } else if (json.status === "success") {
          toast.success("模型拉拔成功");
          setIsDownloading(false);
          return;
        }
      }
      pullModel();
    } else {
      fetch("/api/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          // Check if response is successful
          if (!response.ok) {
            throw new Error("网络响应不正常");
          }
          if (!response.body) {
            throw new Error("出了点问题");
          }
          // 从响应正文创建新的 ReadableStream
          const reader = response.body.getReader();
  
          // 以块为单位读取数据
          reader.read().then(function processText({ done, value }) {
            if (done) {
              setIsDownloading(false);
              return;
            }
  
            // Convert the chunk of data to a string
            const text = new TextDecoder().decode(value);
  
            // Split the text into individual JSON objects
            const jsonObjects = text.trim().split("\n");
  
            jsonObjects.forEach((jsonObject) => {
              try {
                const responseJson = JSON.parse(jsonObject);
                if (responseJson.error) {
                  // Display an error toast if the response contains an error
                  toast.error("Error: " + responseJson.error);
                  setIsDownloading(false);
                  return;
                } else if (responseJson.status === "success") {
                  // Display a success toast if the response status is success
                  toast.success("Model pulled successfully");
                  setIsDownloading(false);
                  return;
                }
              } catch (error) {
                toast.error("Error parsing JSON");
                setIsDownloading(false);
                return;
              }
            });
  
            // Continue reading the next chunk
            reader.read().then(processText);
          });
        })
        .catch((error) => {
          setIsDownloading(false);
          console.error("Error pulling model:", error);
          toast.error("Error pulling model");
        });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    form.setValue("name", e.currentTarget.value);
    setName(e.currentTarget.value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model name</FormLabel>
              <Input
                {...field}
                type="text"
                placeholder="qwen:4b"
                value={name}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-xs pt-1">
                模型仓库{" "}
                <a
                  href="https://ollama.com/library"
                  target="_blank"
                  className="text-blue-500 underline"
                >
                </a>{" "}
                有关可用型号的列表.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2 w-full">
          <Button type="submit" className="w-full " disabled={isDownloading}>
            {isDownloading ? (
              <div className="flex items-center gap-2">
                <Loader2Icon className="animate-spin w-4 h-4" />
                <span>拉取模型...</span>
              </div>
            ) : (
              "拉取模型"
            )}
          </Button>
          <p className="text-xs text-center">
            {isDownloading
              ? "这可能需要一段时间. 您可以安全地关闭此模式并继续使用该应用程序"
              : "按下按钮会将指定型号下载到您的设备."}
          </p>
        </div>
      </form>
    </Form>
  );
}

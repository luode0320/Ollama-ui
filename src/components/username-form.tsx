'use client'

import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from "react"
 
const formSchema = z.object({
    username: z.string().min(2, {
        message: "名称必须至少为 2 个字符.",
      }),
})

interface UsernameFormProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UsernameForm({ setOpen }: UsernameFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })


      function onSubmit(values: z.infer<typeof formSchema>) {
        localStorage.setItem("ollama_user", values.username)
        window.dispatchEvent(new Event("storage"));
        setOpen(false)
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-2">
      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名字</FormLabel>
              <FormControl>
                <Input placeholder="输入您的姓名" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">开始</Button>
      </form>
    </Form>
  )
}

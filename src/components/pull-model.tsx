import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DownloadIcon } from "@radix-ui/react-icons";
import PullModelForm from "./pull-model-form";

// 这个是拉取模型的组件
export default function PullModel() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full gap-2 p-1 items-center cursor-pointer">
          <DownloadIcon className="w-4 h-4" />
          <p>拉取模型</p>
        </div>
      </DialogTrigger>
      <DialogContent className="space-y-2">
      <DialogTitle>拉取模型</DialogTitle>
          <PullModelForm />
      </DialogContent>
    </Dialog>
  );
}

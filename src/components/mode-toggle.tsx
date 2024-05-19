"use client";

import * as React from "react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useEffect} from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-start">
          {theme === "light" && (
            <div className="flex justify-between w-full scale-100 dark:scale-0">
            <p>灯光模式</p>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
          )}
          {theme === "dark" && (
            <div className=" flex justify-between w-full scale-0 dark:scale-100">
            <p>深色模式</p>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
          )}
          <span className="sr-only">切换主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          灯光模式
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          深色模式
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

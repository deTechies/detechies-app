"use client";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";

interface IThemeToggleProps {
  text: any;
}

export function ThemeToggle({ text }: IThemeToggleProps) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="flex gap-2 rounded-[6px] bg-background-layer-2 items-center justify-evenly">
      <div onClick={() => toggleTheme()} className={`${theme == 'light' ? 'bg-background-layer-1 text-accent-primary rounded-[4px] ': 'text-text-primary'} m-1 p-1 `}>
        <Sun size="24" />
      </div>
      <div onClick={() => toggleTheme()} className={`${theme == 'dark' && 'bg-background-layer-1 rounded-[4px]' } m-1 p-1`}>
        <Moon size="24" className="text-text-primary" />
      </div>
    </div>
  );
}

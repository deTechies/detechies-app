"use client";
import { CornerDownLeft, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";

export default function Searchbar({
  placeholder,
  size,
  className,
}: {
  placeholder: string;
  size?: "default" | "md" | undefined;
  className?: string;
}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const query = useDebounce(text, 100);
  const pathname = usePathname();

  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams.has("search")) {
      setText(searchParams.get("search") || "");
    }
  }, [searchParams]);

  async function performSearch() {

    // params 객체를 인덱스 시그니처를 가진 형태로 정의합니다.
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      if (key !== "search" && key !== "limit") {
        params[key] = value;
      }
    });

    if (query) {
      params["search"] = query;
    }

    const queryString = new URLSearchParams(params).toString();
    router.push(`${pathname}?${queryString}`);
  }

  return (
    <div className="flex flex-row rounded-full flex-grow items-center gap-4 px-8 bg-background-layer-1 justify-between min-w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 grow">
        <SearchIcon className="text-text-placeholder"></SearchIcon>

        <Input
          value={text}
          size={size || "default"}
          type=""
          placeholder={placeholder}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Call your search function here
              performSearch(); // Replace `performSearch` with your actual search function
            }
          }}
          className={`px-4 py-3.5 focus:none border-none bg-background-layer-1 text-text-input ${className}`}
        />
      </div>
      {text && (
        <div>
          <CornerDownLeft className="text-accent-primary animate-pulse " />
        </div>
      )}
    </div>
  );
}

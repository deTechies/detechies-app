"use client";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";

export default function Search({
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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

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
  }, [pathname, query, router]);

  return (
    <div className="relative flex-grow rounded-sm">
      <Input
        value={text}
        size={size || "default"}
        type="Search"
        placeholder={placeholder}
        onChange={(e) => {
          setText(e.target.value);
        }}
        className={`px-4 py-3.5 ${className}`}
      />

      {!text && (
        <SearchIcon className="absolute -translate-y-1/2 top-1/2 right-4 text-text-placeholder"></SearchIcon>
      )}
    </div>
  );
}

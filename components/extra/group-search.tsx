"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";

export default function GroupSearch({
  placeholder,
  size,
}: {
  placeholder: string;
  size?: "default" | "md" | undefined;
}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const query = useDebounce(text, 500);
  const pathname = usePathname();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // params 객체를 인덱스 시그니처를 가진 형태로 정의합니다.
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      if (key !== "search") {
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
        className="px-4 py-3.5 bg-background-layer-1"
      />
      {
      text?null:
      <div className="absolute inset-y-0 end-2.5 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      }
       
    </div>
  );
}

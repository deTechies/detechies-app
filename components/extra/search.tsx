"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";

export default function Search({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const query = useDebounce(text, 500);
  const pathname = usePathname();

  useEffect(() => {
    if (!query) {
      router.push(pathname);
      return;
    }
    router.push(`${pathname}?search=${query}`);
  }, [pathname, query, router]);
  return (
    <div className="relative rounded-sm flex-grow">
      <Input
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

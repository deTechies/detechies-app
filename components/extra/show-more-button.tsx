"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";

export default function ShowMoreButton({ lang }: { lang: any }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const showMore = () => {
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string) + 10
      : 20;

    router.push(pathName + "?" + createQueryString("limit", limit.toString()));
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  
  return (
    <Button className="w-full" variant={"secondary"} onClick={showMore}>
      {lang.achievement.display_nft.show_more}
    </Button>
  );
}

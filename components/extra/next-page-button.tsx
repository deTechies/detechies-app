"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";

export default function NextPageButton({ lang }: { lang: any }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const nextPage = () => {
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page") as string) + 1
      : 2;

    router.push(pathName + "?" + createQueryString("page", page.toString()));
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
    <Button className="w-full" variant={"secondary"} onClick={nextPage}>
      Next Page
    </Button>
  );
}

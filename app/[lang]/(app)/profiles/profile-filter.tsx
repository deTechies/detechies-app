"use client";

import Search from "@/components/extra/search";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PROFESSION_TYPE } from "@/lib/interfaces";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import InviteExperts from "./invite_experts";

export default function ProfileFilter({ lang }: { lang: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const onSelectType = (event: PROFESSION_TYPE | "all") => {
    setLoading(true);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("limit");

    if (event === "all") {
      searchParams.set("role", "");
    } else {
      searchParams.set("role", event);
    }

    router.push(`${pathname}?${searchParams.toString()}`);
    setLoading(false);
  };

  // const selectLimit = (limit: string) => {
  //   setLoading(true);

  //   router.push(pathname + "?" + createQueryString("limit", limit));

  //   setLoading(false);
  // };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Card className="flex justify-between gap-5 px-8 pb-8 pt-7">
      <h1 className="text-subhead_s">{lang.profile_filter.profiles}</h1>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5 grow">
          <Select onValueChange={onSelectType}>
            <SelectTrigger className="w-[138px] px-3 py-3">
              <SelectValue
                placeholder={lang.profile_filter.filter}
                className={`${loading && "animate-pulse"}`}
              />
            </SelectTrigger>

            <SelectContent>
              <SelectItem key="all" value="all">
                {lang.interface.profession_type["all"]}
              </SelectItem>
              {Object.values(PROFESSION_TYPE).map((type) => (
                <SelectItem key={type} value={type}>
                  {lang.interface.profession_type[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="max-w-[335px] w-full">
            <Search
              placeholder={lang.profile_filter.search}
              size="md"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-end">
          <InviteExperts lang={lang}>
            <div className="underline text-border-input">
              {lang.profile_filter.info_text}
            </div>
          </InviteExperts>
        </div>
      </div>
    </Card>
  );
}

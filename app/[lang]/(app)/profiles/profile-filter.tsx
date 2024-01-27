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
import { useCallback } from "react";

export default function ProfileFilter({ lang }: { lang: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelectType = (event: PROFESSION_TYPE | "all") => {
    if (event == "all") {
      router.push(pathname + "?" + createQueryString("role", ""));
    } else {
      router.push(pathname + "?" + createQueryString("role", event));
    }
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
    <Card className="flex justify-between gap-5 px-8 pb-8 pt-7">
      <h1 className="text-subhead_s">{lang.profile_filter.profiles}</h1>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-5 flex-wrap">
          <Select onValueChange={onSelectType}>
            <SelectTrigger className="w-[180px] px-3 py-3.5">
              <SelectValue placeholder={lang.profile_filter.filter} />
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

          <Search placeholder={lang.profile_filter.search} size="md" />
        </div>
        <div className="flex items-end">
          <div className="text-[#BEC3CA] text-[14px] not-italic font-semibold leading-4 underline">
            {lang.profile_filter.info_text}
          </div>
        </div>
      </div>
    </Card>
  );
}

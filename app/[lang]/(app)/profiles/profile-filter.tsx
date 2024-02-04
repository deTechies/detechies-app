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

export default function ProfileFilter({ lang }: { lang: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const onSelectType = (event: PROFESSION_TYPE | "all") => {
    setLoading(true)
    if (event == "all") {
      router.push(pathname + "?" + createQueryString("role", ""));
    } else {
      router.push(pathname + "?" + createQueryString("role", event));
    }
    setLoading(false)
  };
  
  const selectLimit = (limit: string) => {
    setLoading(true)

    router.push(pathname + "?" + createQueryString("limit", limit));

    setLoading(false)
  }

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
          <Select onValueChange={onSelectType} >
            <SelectTrigger className="w-[180px] px-3 py-3.5" >
              <SelectValue placeholder={lang.profile_filter.filter}  className={`${loading && 'animate-pulse'}`}/>
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
          
          <Select onValueChange={selectLimit} >
            <SelectTrigger className="w-[100px] px-3 py-3.5" >
              <SelectValue placeholder="25" className={`${loading && 'animate-pulse'}`}/>
            </SelectTrigger>

            <SelectContent >

                <SelectItem  value={"25"}>
                  25
                </SelectItem>
                <SelectItem value={"50"}>
                  50
                </SelectItem>
                <SelectItem value={"100"}>
                  100
                </SelectItem>
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

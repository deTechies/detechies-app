"use client";

import { PROFESSION_TYPE } from "@/lib/interfaces";

import Searchbar from "@/components/extra/search-bar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function ProfileFilter({ lang }: { lang: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    <div className="flex flex-col justify-between gap-4 mx-auto w-full">
      <div className="flex flex-col md:flex-row w-full items-start gap-4 ">
        <div className="grow flex flex-col gap-2 ">
          <Searchbar placeholder={lang.profile_filter.search} size="md" />
          {showAdvanced ? (
            <div className="flex justify-start px-8">
              <Select onValueChange={onSelectType}>
                <SelectTrigger className="w-[138px] px-3 py-3 bg-background-layer-1 border-none">
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
            </div>
          ) : (
            <div className="flex px-8 justify-end">
              {searchParams.get("role") && (
                <div>
                  <Badge variant={"accent"}>
                    {
                      lang.interface.profession_type[
                        searchParams.get("role") as PROFESSION_TYPE
                      ]
                    }
                  </Badge>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-2">
        <Button onClick={() => setShowAdvanced(!showAdvanced)}>
          More Filters
        </Button>
          
        </div>
      </div>
    </div>
  );
}

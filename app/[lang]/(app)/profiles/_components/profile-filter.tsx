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

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ProfileFilter({ lang }: { lang: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  //check if there are searchParams and if there are, set the text to the searchParams
  useEffect(() => {
    if (searchParams.has("search")) {
      setShowAdvanced(true);
    }
  }, [searchParams]);

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
    <div className="flex flex-col justify-between gap-4 py-2 mx-auto w-full rounded-md bg-gray-300 items-center">
      <div className="flex flex-col  w-full">
        <div className="flex flex-col md:flex-row w-full items-center gap-4 px-8">
          <div className="grow">
            <Searchbar placeholder={lang.profile_filter.search} size="md" />
          </div>

          <Button
            variant="ghost"
            className="text-accent-primary"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            More Filters
          </Button>
        </div>
        {showAdvanced && (
          <div className="flex justify-start px-8 py-2">
            <Select onValueChange={onSelectType}>
              <SelectTrigger className="w-[138px] px-3 py-3 bg-gray-300 border-none">
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
        )}
      </div>
    </div>
  );
}

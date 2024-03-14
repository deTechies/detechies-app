"use client";

import Search from "@/components/extra/search";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PRIVACY_TYPE, ProjectType } from "@/lib/interfaces";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProjectFilter({ lang }: { lang: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [advancedSearch, setAdvancedSearch] = useState(false);

  const onSelectType = (event: ProjectType | "all") => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!event || event == "all") {
      current.delete("type");
    } else {
      current.set("type", event);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };

  const onSelectPrivacy = (_type: PRIVACY_TYPE | "all") => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!_type || _type == "all") {
      current.delete("scope");
    } else {
      current.set("scope", _type);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };

  const onChangeMyProject = (_is_my_project: boolean) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (_is_my_project) {
      current.set("me", "true");
    } else {
      current.delete("me");
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };
  
  const onChangeSource = (_has_source: boolean) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (_has_source) {
      current.set("sources", "true");
    } else {
      current.delete("sources");
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };

  return (
    <div className="bg-background-layer-1 flex flex-wrap justify-between gap-5 px-8 pb-8 pt-7">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-wrap items-center gap-5 grow">
            <div className="max-w-[60vw] min-w-[350px] ">
              <Search
                placeholder={lang.project.list.search}
                size="md"
                className="w-full"
              />
            </div>
            <Button
              size="md"
              variant="ghost"
              onClick={() => setAdvancedSearch(!advancedSearch)}
            >
              {advancedSearch ? "Hide Advanced Search" : "Advanced Search"}
            </Button>
          </div>
        </div>
        {advancedSearch && (
          <div className="flex gap-4 flex-wrap">
            <Select onValueChange={onSelectType}>
              <SelectTrigger className="w-[180px] px-3 py-3">
                <SelectValue placeholder={lang.project.list.all_project} />
              </SelectTrigger>

              <SelectContent>
                <SelectItem key="all" value="all">
                  {lang.interface.project_type["all"]}
                </SelectItem>

                {Object.values(ProjectType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {lang.interface.project_type[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={onSelectPrivacy}>
              <SelectTrigger className="w-[180px] px-3 py-3">
                <SelectValue
                  placeholder={lang.project.list.scope_of_disclosure}
                />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  {lang.interface.privacy_type.all}
                </SelectItem>

                {Object.values(PRIVACY_TYPE).map((type) => (
                  <SelectItem key={type} value={type}>
                    {lang.interface.privacy_type[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-3">
              <Checkbox onCheckedChange={onChangeMyProject} />

              <Label className="text-title_m">
                {lang.project.list.my_project}
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox onCheckedChange={onChangeSource} />

              <Label className="text-title_m">
                Source Code
              </Label>
            </div>
          </div>
        )}
      </div>
      <Link href="/project/create">
          <Button size="sm">Add project</Button>
        </Link>
    </div>
  );
}

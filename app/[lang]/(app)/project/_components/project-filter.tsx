"use client";

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

import Searchbar from "@/components/extra/search-bar";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProjectFilter({ lang }: { lang: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showAdvanced, setShowAdvanced] = useState(false);

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
    <div className="flex flex-col justify-between gap-4 p-4 mx-auto w-full rounded-md bg-light  items-center">
      <div className="flex flex-col  w-full">
        <div className="flex flex-col md:flex-row w-full items-center gap-4 px-8 py-4">
          <div className="grow">
            <Searchbar placeholder={lang.project.list.search} size="md" />
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
          <div className="flex flex-wrap gap-4 justify-start px-8 py-2">
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

              <Label className="text-title_m">Source Code</Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Search from "@/components/extra/search";
import { Card } from "@/components/ui/card";
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

export default function ProjectFilter({ lang }: { lang: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelectType = (event: ProjectType | "all") => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!event || event == "all") {
      current.delete("project");
    } else {
      current.set("project", event);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };

  const onSelectPrivacy = (_type: PRIVACY_TYPE) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!_type || _type == PRIVACY_TYPE.PUBLIC) {
      current.delete("privacy");
    } else {
      current.set("privacy", _type);
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

  return (
    <Card className="flex justify-between gap-5 px-8 pb-8 pt-7">
      <h1 className="text-subhead_s">{lang.project.list.projects}</h1>
      
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-wrap items-center gap-5 grow">
          <Select onValueChange={onSelectType}>
            <SelectTrigger className="w-[180px] px-3 py-3.5">
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
            <SelectTrigger className="w-[180px] px-3 py-3.5">
              <SelectValue
                placeholder={lang.project.list.scope_of_disclosure}
              />
            </SelectTrigger>

            <SelectContent>
              {Object.values(PRIVACY_TYPE).map((type) => (
                <SelectItem key={type} value={type}>
                  {lang.project.list.privacy_type[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="max-w-[335px] w-full">
            <Search
              placeholder={lang.project.list.search}
              size="md"
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <Checkbox onCheckedChange={onChangeMyProject} />

            <Label className="text-title_m">
              {lang.project.list.my_project}
            </Label>
          </div>
        </div>

        <Link href="/project/create" role="link" className="ml-auto">
          <Button size="lg">{lang.project.list.create_project.create}</Button>
        </Link>
      </div>
    </Card>
  );
}

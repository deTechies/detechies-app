"use client";

import { Badge } from "@/components/ui/badge";
import Image from "@/components/ui/image";
import { beginEndDates } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

function TotalProjectItem({
  projects,
  lang,
  selected,
}: {
  projects: any[];
  lang: any;
  selected: boolean;
}) {

  
  function selectAll() {
    //settings searchParams for this
/*     router.push(
      pathName
    ); */
  }

  return (
    <div
      className={`p-5 border rounded-md cursor-pointer transition-all ${
        selected ? "border-accent-primary" : "border-border-div}"
      }`}
      onClick={() => selectAll()}
    >
      <h4 className="mb-3 text-title_l">
        {lang.profile.statistics.total_report}
      </h4>

      <div className="mb-2 text-label_m text-text-secondary">
        {lang.profile.statistics.total_career}:
      </div>

      <div className="flex items-center gap-2">
        <span>{lang.profile.statistics.total_evaluation} (어쩌구):</span>

        <div className="flex flex-wrap gap-2">
          <Badge variant="purple" shape="sm">
            {lang.profile.statistics.admin_evaluation} {3}
          </Badge>

          <Badge variant="accent" shape="sm">
            {lang.profile.statistics.member_evaluation} {5}
          </Badge>

          <Badge variant="info" shape="sm">
            {lang.profile.statistics.client_evaluation} {2}
          </Badge>
        </div>
      </div>
    </div>
  );
}

function CommonProjectItem({
  project,
  lang,
  selected,
}: {
  project: any;
  lang: any;
  selected: boolean;
}) {
  const [showMore, setShowMore] = useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  
  const onShowMore = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    _event.stopPropagation();
    setShowMore(!showMore);
  };

  function onSelectProject() {
    const params = createQueryString("project", project.project.id)
    
    console.log("params", params)

    router.push(pathName + "?" + params);
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
    <div
      className={`p-5 border rounded-md cursor-pointer transition-all ${
        selected ? "border-accent-primary" : "border-border-div}"
      }`}
      onClick={onSelectProject}
    >
      <div className="flex flex-wrap gap-5">
        <div className="relative shrink-0 w-[120px] h-[120px]">
          <Image
            src={`https://ipfs.io/ipfs/` + project.project?.image}
            alt="Project Image"
            width="120"
            height="120"
            className="rounded-sm"
          />
        </div>

        <div className="grow">
          <div className="mb-4 text-title_l">{project.project?.name}</div>

          <div className="mb-2 text-label_m text-text-secondary">
            {lang.profile.statistics.work_period}:{" "}
            {beginEndDates(
              project.project?.begin_date,
              project.project?.end_date
            )}
          </div>

          <div className="mb-2 text-label_m text-text-secondary">
            {lang.profile.statistics.project_part}:{" "}
            {project.role && project.role}
          </div>

          <div className="flex gap-2">
            {project.tags.length > 0 &&
              project.tags.map((tag: string) => {
                return (
                  <Badge shape="outline" variant="placeholder" key={tag}>
                    <div className="truncate">{tag}</div>
                  </Badge>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between ml-auto">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="accent" shape="sm">
              {lang.profile.statistics.evaluations} {project.evaluationCount}
            </Badge>
          </div>

          <div
            className="flex gap-1 select-none text-icon-secondary text-label_m"
            onClick={onShowMore}
          >
            {lang.profile.statistics.s_evaluation}
            <ChevronDown
              className={`w-5 h-5 transition ${showMore && "rotate-180"}`}
            />
          </div>
        </div>
      </div>

      {showMore && (
        <div className={`pt-4 transition-all`}>
          <div className="p-5 break-words border rounded-md border-border-div">
            {project.description && project.description}

          </div>
        </div>
      )}
    </div>
  );
}

//const MemoizedCommonProjectItem = React.memo(CommonProjectItem);
//const MemoizedTotalProjectItem = React.memo(TotalProjectItem);

export { CommonProjectItem, TotalProjectItem };

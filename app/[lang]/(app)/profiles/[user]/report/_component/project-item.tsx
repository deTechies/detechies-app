"use client";

import { Badge } from "@/components/ui/badge";
import Image from "@/components/ui/image";
import { ProjectMember } from "@/lib/interfaces";
import { beginEndDates } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import React, { useState } from "react";

function TotalProjectItem({
  projects,
  lang,
  selected,
  onClick,
}: {
  projects: any[];
  lang: any;
  selected: boolean;
  onClick: Function;
}) {
  return (
    <div
      className={`p-5 border rounded-md cursor-pointer transition-all ${
        selected ? "border-accent-primary" : "border-border-div}"
      }`}
      onClick={() => onClick()}
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
  onClick,
}: {
  project: any;
  lang: any;
  selected: boolean;
  onClick: Function;
}) {
  const [showMore, setShowMore] = useState(false);
  const onShowMore = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    _event.stopPropagation();
    setShowMore(!showMore);
  };

  return (
    <div
      className={`p-5 border rounded-md cursor-pointer transition-all ${
        selected ? "border-accent-primary" : "border-border-div}"
      }`}
      onClick={() => onClick()}
    >
      <div className="flex flex-wrap gap-5">
        <div className="relative shrink-0 w-[120px] h-[120px]">
          <Image
            src={`https://ipfs.io/ipfs/` + project.project.image}
            alt="Project Image"
            width="120"
            height="120"
            className="rounded-sm"
          />
        </div>

        <div className="grow">
          <div className="mb-4 text-title_l">{project.project.name}</div>

          <div className="mb-2 text-label_m text-text-secondary">
            {lang.profile.statistics.work_period}:{" "}
            {beginEndDates(
              project.project.begin_date,
              project.project.end_date
            )}
          </div>

          <div className="mb-2 text-label_m text-text-secondary">
            {lang.profile.statistics.project_part}:{" "}
            {project.contribution[0].role}
          </div>

          <div className="flex gap-2">
            {project.contribution[0].tags.length > 0 &&
              project.contribution[0].tags.map((tag: string) => {
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

          <div
            className="flex gap-1 select-none text-icon-secondary text-label_m"
            onClick={onShowMore}
          >
            {"Robin"}{lang.profile.statistics.s_evaluation}
            <ChevronUp
              className={`w-5 h-5 transition ${showMore && "rotate-180"}`}
            ></ChevronUp>
          </div>
        </div>
      </div>

      {showMore && (
        <div className={`pt-4 transition-all`}>
          <div className="p-5 break-words border rounded-md border-border-div">
            {project.contribution[0]?.description}
          </div>
        </div>
      )}
    </div>
  );
}

const MemoizedCommonProjectItem = React.memo(CommonProjectItem);
const MemoizedTotalProjectItem = React.memo(TotalProjectItem);

export { MemoizedCommonProjectItem, MemoizedTotalProjectItem };

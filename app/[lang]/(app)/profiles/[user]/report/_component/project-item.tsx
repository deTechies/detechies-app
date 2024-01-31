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
  projects: ProjectMember[];
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
      <h4 className="mb-3 text-title_l">통합 평판 보고서</h4>

      <div className="mb-2 text-label_m text-text-secondary">총경력 어쩌구</div>

      <div className="flex items-center gap-2">
        <span>총 받은 평가 (어쩌구):</span>

        <div className="flex flex-wrap gap-2">
          <Badge variant="purple" shape="sm">
            관리자 평가 {3}
          </Badge>

          <Badge variant="accent" shape="sm">
            동료 평가 {5}
          </Badge>

          <Badge variant="info" shape="sm">
            클라이언트 평가 {2}
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
  project: ProjectMember;
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
        <div className="relative shrink-0">
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
            작업 기간:{" "}
            {beginEndDates(
              project.project.begin_date,
              project.project.end_date
            )}
          </div>

          <div className="mb-2 text-label_m text-text-secondary">
            기여한 파트: {project.works[0]?.role}
          </div>

          <div className="flex gap-2">
            {project.works[0].tags.length > 0 &&
              project.works[0].tags.map((tag: string) => {
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
              관리자 평가 {3}
            </Badge>

            <Badge variant="accent" shape="sm">
              동료 평가 {5}
            </Badge>

            <Badge variant="info" shape="sm">
              클라이언트 평가 {2}
            </Badge>
          </div>

          <div
            className="flex gap-1 select-none text-icon-secondary text-label_m"
            onClick={onShowMore}
          >
            {"Robin"}님이 작성한 평가
            <ChevronUp
              className={`w-5 h-5 transition ${showMore && "rotate-180"}`}
            ></ChevronUp>
          </div>
        </div>
      </div>

      {showMore && (
        <div className={`pt-4 transition-all`}>
          <div className="p-5 break-words border rounded-md border-border-div">
            {project.works[0]?.description}
          </div>
        </div>
      )}
    </div>
  );
}

const MemoizedCommonProjectItem = React.memo(CommonProjectItem);
const MemoizedTotalProjectItem = React.memo(TotalProjectItem);

export { MemoizedCommonProjectItem, MemoizedTotalProjectItem };

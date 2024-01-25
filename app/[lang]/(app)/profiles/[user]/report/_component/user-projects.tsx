"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MemoizedTotalProjectItem as TotalProjectItem,
  MemoizedCommonProjectItem as CommonProjectItem,
} from "./project-item";

export default function UserProjects({
  profile,
  lang,
  selectProject,
  setSelectProject,
}: {
  profile: any;
  lang: any;
  selectProject: any;
  setSelectProject: Function;
}) {
  return (
    <Card className="flex gap-0 px-8 pb-8 pt-7">
      <h3 className="mb-4 text-subhead_s">
        참여한 프로젝트 ({profile.projects.length})
      </h3>

      <div className="mb-6 text-text-secondary text-body_m">
        프로젝트를 클릭하면 프로젝트 별 받은 성과 평가를 열람할 수 있어요.
      </div>

      <div className="mb-3">
        <TotalProjectItem
          profile={profile}
          lang={lang}
          selected={!selectProject}
          onClick={() => setSelectProject(null)}
        ></TotalProjectItem>
      </div>

      <div className="overflow-y-auto max-h-[400px] flex flex-col gap-3">
        {profile.projects &&
          profile.projects.map((project: any) => {
            if (project.works.length < 1) return;

            return (
              <CommonProjectItem
                project={project}
                lang={lang}
                selected={selectProject == project.project.id}
                onClick={() => {
                  setSelectProject(project.project.id);
                  console.log(project.project.id);
                }}
                key={project.project.id}
              ></CommonProjectItem>
            );
          })}
      </div>
    </Card>
  );
}

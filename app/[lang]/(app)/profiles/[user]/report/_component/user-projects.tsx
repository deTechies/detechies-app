"use client";

import { Card } from "@/components/ui/card";
import {
  MemoizedCommonProjectItem as CommonProjectItem,
  MemoizedTotalProjectItem as TotalProjectItem,
} from "./project-item";
import { ProjectMember } from "@/lib/interfaces";

export default function UserProjects({
  projects,
  lang,
  selectedProject,
  setSelectedProject,
}: {
  projects: ProjectMember[];
  lang: any;
  selectedProject: any;
  setSelectedProject: Function;
}) {

  return (
    <Card className="flex gap-0 px-8 pb-8 pt-7">
      <h3 className="mb-4 text-subhead_s">
        참여한 프로젝트 ({projects.length})
      </h3>

      <div className="mb-6 text-text-secondary text-body_m">
        프로젝트를 클릭하면 프로젝트 별 받은 성과 평가를 열람할 수 있어요.
      </div>

      <div className="mb-3">
        <TotalProjectItem
          projects={projects}
          lang={lang}
          selected={!selectedProject}
          onClick={() => setSelectedProject(null)}
        ></TotalProjectItem>
      </div>

      <div className="overflow-y-auto max-h-[400px] flex flex-col gap-3">
        {projects &&
          projects.map((project: any) => {
            return (
              <CommonProjectItem
                project={project}
                lang={lang}
                selected={selectedProject?.project.id == project.project.id}
                onClick={() => {
                  setSelectedProject(project.project.id);
                }}
                key={project.project.id}
              ></CommonProjectItem>
            );
          })}
      </div>
    </Card>
  );
}

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
  projects: any[];
  lang: any;
  selectedProject: any;
  setSelectedProject: Function;
}) {
  return (
    <Card className="flex gap-0 px-8 pb-8 pt-7">
      <h3 className="mb-4 text-subhead_s">
        {lang.profile.statistics.joined_projects} ({projects.length})
      </h3>

      <div className="mb-6 text-text-secondary text-body_m">
        {lang.profile.statistics.joined_projects_desc}
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
                // name => id
                selected={selectedProject?.project.name == project.project.name}
                onClick={() => {
                  setSelectedProject(project);
                }}
                key={project.project.name}
              ></CommonProjectItem>
            );
          })}
      </div>
    </Card>
  );
}

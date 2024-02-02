"use client";

import { Card } from "@/components/ui/card";
<<<<<<< Updated upstream
import {
  MemoizedCommonProjectItem as CommonProjectItem,
  MemoizedTotalProjectItem as TotalProjectItem,
} from "./project-item";
<<<<<<< Updated upstream
import { ProjectMember } from "@/lib/interfaces";
=======
=======
import { CommonProjectItem, TotalProjectItem } from "./project-item";
>>>>>>> Stashed changes
>>>>>>> Stashed changes

export default function UserProjects({
  projects,
  lang,
<<<<<<< Updated upstream
  selectedProject,
  setSelectedProject,
=======
<<<<<<< Updated upstream
  selectProject,
  setSelectProject,
=======
  selectedProject,
>>>>>>> Stashed changes
>>>>>>> Stashed changes
}: {
  projects: any[];
  lang: any;
<<<<<<< Updated upstream
  selectedProject: any;
  setSelectedProject: Function;
=======
<<<<<<< Updated upstream
  selectProject: any;
  setSelectProject: Function;
=======
  selectedProject: any;
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          selected={!selectedProject}
          onClick={() => setSelectedProject(null)}
=======
<<<<<<< Updated upstream
          selected={!selectProject}
          onClick={() => setSelectProject(null)}
>>>>>>> Stashed changes
        ></TotalProjectItem>
=======
          selected={!selectedProject}
        />
>>>>>>> Stashed changes
      </div>

      <div className="overflow-y-auto max-h-[400px] flex flex-col gap-3">
        {projects &&
          projects.map((project: any) => {
            return (
              <CommonProjectItem
                project={project}
                lang={lang}
<<<<<<< Updated upstream
                // name => id
                selected={selectedProject?.project.name == project.project.name}
=======
<<<<<<< Updated upstream
                selected={selectProject == project.project.id}
>>>>>>> Stashed changes
                onClick={() => {
                  setSelectedProject(project);
                }}
                key={project.project.name}
              ></CommonProjectItem>
=======
                // name => id
                selected={selectedProject == project.project?.id}
                key={project.project?.name}
              />
>>>>>>> Stashed changes
            );
          })}
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { CommonProjectItem, TotalProjectItem } from "./project-item";

export default async function UserProjects({
  lang,
  projects,
  selectedProject,
}: {
  lang: any;
  projects: any;
  selectedProject: any;
}) {
  return (
    <Card className="flex gap-0 px-8 pb-8 pt-7">
      <h3 className="mb-4 text-subhead_s">
        {lang.profile.statistics.joined_projects} ({projects && projects.length}
        )
      </h3>

      <div className="mb-6 text-text-secondary text-body_m">
        {lang.profile.statistics.joined_projects_desc}
      </div>

      <div className="mb-3">
        <TotalProjectItem
          projects={projects}
          lang={lang}
          selected={!selectedProject}
        />
      </div>

      <div className="overflow-y-auto max-h-[400px] flex flex-col gap-3">
        {projects &&
          projects.map((project: any) => {
            return (
              <CommonProjectItem
                project={project}
                lang={lang}
                selected={selectedProject == project.project?.id}
                key={project.project?.name}
              />
            );
          })}
      </div>
    </Card>
  );
}

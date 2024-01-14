import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/interfaces";
import { beginEndDates } from "@/lib/utils";
import { FolderArchiveIcon } from "lucide-react";
import Image from "next/image";

export interface ProjectSwitcherProps {
  project?: Project;
  lang?: any;
}
export default function ProjectSwitcher({
  project,
  lang,
}: ProjectSwitcherProps) {
  if (project) {
    return <ProjectDisplay project={project} lang={lang} />;
  }

  return (
    <div className="p-4 border rounded-sm">
      No project selected build component for selector
    </div>
  );
}

const ProjectDisplay = ({
  project,
  lang,
}: {
  project: Project;
  lang?: any;
}) => {
  return (
    <div className="flex items-start gap-6 p-5 border rounded-md bg-background-layer-1 border-border-div">
      <figure className="flex items-center justify-center w-[100px] h-[100px] overflow-hidden rounded-sm bg-background-layer-2">
        {project?.image ? (
          <Image
            src={`https://ipfs.io/ipfs/` + project.image}
            alt={project.name}
            width={100}
            height={100}
          />
        ) : (
          <FolderArchiveIcon size={54} className="text-text-secondary" />
        )}
      </figure>

      <div className="flex flex-col gap-4 grow">
        <h5 className="text-title_m">{project.name}</h5>

        <section className="flex flex-col gap-2">
          <span className="text-label_m text-text-secondary">
            {lang.interface?.project_type ? lang.interface.project_type[project.type] : project.type}
          </span>

          <span className="text-label_m text-text-secondary">
            {beginEndDates(project.begin_date, project.end_date)}
          </span>
        </section>
      </div>

      <div>
        {project.scope === "private" ? (
          <Badge shape="sm" variant="purple">
            {lang.project.list.privacy_type.private}
          </Badge>
        ) : project.scope === "group" ? (
          <Badge shape="sm" variant="info">
            {lang.project.list.privacy_type.group}
          </Badge>
        ) : null}
      </div>
    </div>
  );
};

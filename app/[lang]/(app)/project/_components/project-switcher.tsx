import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/interfaces";
import { beginEndDates } from "@/lib/utils";
import { FolderArchiveIcon } from "lucide-react";
// import Image from "next/image";
import Image from "@/components/ui/image";

export interface ProjectSwitcherProps {
  project?: Project;
  lang?: any;
  title?: string;
}
export default function ProjectSwitcher({
  project,
  lang,
  title,
}: ProjectSwitcherProps) {
  if (project) {
    return <ProjectDisplay project={project} lang={lang} title={title} />;
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
  title,
}: {
  project: Project;
  lang?: any;
  title?: string;
}) => {
  return (
    <div className="p-5 border rounded-md bg-background-layer-1 border-border-div">
      {title && <div className="mb-5 text-subhead_s">{title}</div>}
      
      <div className="flex items-start gap-6">
        <figure className="flex items-center justify-center w-[80px] h-[80px] shrink-0 overflow-hidden rounded-sm bg-background-layer-2">
          {project?.image ? (
            <Image
              src={`https://ipfs.io/ipfs/` + project.image}
              alt={project.name}
              width={80}
              height={80}
            />
          ) : (
            <FolderArchiveIcon size={54} className="text-text-secondary" />
          )}
        </figure>

        <div className="flex flex-col gap-4 grow">
          <h5 className="text-title_m">{project.name}</h5>

          <section className="flex flex-col gap-2">
            <span className="text-label_m text-text-secondary">
              {lang.interface?.project_type
                ? lang.interface.project_type[project.type]
                : project.type}
            </span>

            <span className="text-label_m text-text-secondary">
              {beginEndDates(project.begin_date, project.end_date)}
            </span>
          </section>
        </div>

        <div>
          {project.scope === "private" ? (
            <Badge shape="sm" variant="purple">
              {lang.interface.privacy_type.private}
            </Badge>
          ) : project.scope === "group" ? (
            <Badge shape="sm" variant="info">
              {lang.interface.privacy_type.group}
            </Badge>
          ) : null}
        </div>
      </div>
    </div>
  );
};

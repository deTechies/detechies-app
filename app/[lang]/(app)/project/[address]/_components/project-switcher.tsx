import { Project } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";
import { FolderArchiveIcon } from "lucide-react";
import Image from "next/image";

export interface ProjectSwitcherProps {
  project?: Project;
}
export default function ProjectSwitcher({ project }: ProjectSwitcherProps) {
  if (project) {
    return <ProjectDisplay project={project} />;
  }

  return (
    <div className="border rounded-sm p-4">
      No project selected build component for selector
    </div>
  );
}

const ProjectDisplay = ({project}:{project:Project}) => {
  return (
    <div className="bg-background-layer-1 border border-border-div rounded-sm p-4 flex gap-6 items-center">
      <figure className="flex bg-background-layer-2 w-24 h-24 rounded-sm items-center justify-center">
        {
          project?.image
            ? <Image src={`https://ipfs.io/ipfs/`+project.image} alt={project.name} width={54} height={54} />
            : <FolderArchiveIcon size={54} className="text-text-secondary" />
        }
        
      </figure>
      <div className="flex flex-col gap-4">
        <h5 className="text-title_m">{project.name}</h5>
        <section className="flex flex-col gap-2">
          <span className="text-label_m text-text-secondary">
            {project.scope} | {project.category}
          </span>
          <span className="text-label_m text-text-secondary">
            {formatDate(project.begin_date) } ~ {project.end_date ? formatDate(project.end_date) : "present"}
          </span>
        </section>
      </div>
    </div>
  );
};

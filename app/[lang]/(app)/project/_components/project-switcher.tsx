import { Project } from "@/lib/interfaces";
import { beginEndDates } from "@/lib/utils";
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
    <div className="p-4 border rounded-sm">
      No project selected build component for selector
    </div>
  );
}

const ProjectDisplay = ({project}:{project:Project}) => {

  return (
    <div className="flex items-start gap-6 p-5 border rounded-md bg-background-layer-1 border-border-div">
      <figure className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-sm bg-background-layer-2">
        {
          project?.image
            ? <Image src={`https://ipfs.io/ipfs/`+project.image} alt={project.name} width={80} height={80} />
            : <FolderArchiveIcon size={54} className="text-text-secondary" />
        }
        
      </figure>

      <div className="flex flex-col gap-4 grow">
        <h5 className="text-title_m">{project.name}</h5>

        <section className="flex flex-col gap-2">
          <span className="text-label_m text-text-secondary">
            {project.type}
          </span>

          <span className="text-label_m text-text-secondary">
            {beginEndDates(project.begin_date, project.end_date)}
          </span>
        </section>
      </div>
    </div>
  );
};

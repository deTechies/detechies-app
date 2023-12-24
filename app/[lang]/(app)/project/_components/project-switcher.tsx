import { Badge } from "@/components/ui/badge";
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
  console.log(project);

  return (
    <div className="bg-background-layer-1 border border-border-div rounded-md p-5 flex gap-6 items-start">
      <figure className="flex bg-background-layer-2 w-[100px] h-[100px] rounded-sm items-center justify-center">
        {
          project?.image
            ? <Image src={`https://ipfs.io/ipfs/`+project.image} alt={project.name} width={54} height={54} />
            : <FolderArchiveIcon size={54} className="text-text-secondary" />
        }
        
      </figure>

      <div className="flex flex-col gap-4 grow">
        <h5 className="text-title_m">{project.name}</h5>

        <section className="flex flex-col gap-2">
          <span className="text-label_m text-text-secondary">
            {project.type} | {project.category}
          </span>

          <span className="text-label_m text-text-secondary">
            {formatDate(project.begin_date) } ~ {project.end_date ? formatDate(project.end_date) : "present"}
          </span>
        </section>
      </div>

      <Badge variant="info">
        그룹 멤버
      </Badge>
    </div>
  );
};

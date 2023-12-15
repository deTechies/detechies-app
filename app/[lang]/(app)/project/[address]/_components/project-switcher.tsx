import { FolderArchiveIcon } from "lucide-react";

export interface ProjectSwitcherProps {
  projectId?: string;
}
export default function ProjectSwitcher({ projectId }: ProjectSwitcherProps) {
  if (projectId) {
    return <ProjectDisplay />;
  }

  return (
    <div className="border rounded-sm p-4">
      No project selected build component for selector
    </div>
  );
}

const ProjectDisplay = () => {
  return (
    <div className="border rounded-sm p-4 flex gap-6 items-center">
        <figure className="flex bg-background-layer-2 w-24 h-24 rounded-sm items-center justify-center">
            <FolderArchiveIcon size={68} className="text-text-secondary" /> 
        </figure>
      <div className="flex flex-col gap-2">
        <h5 className="text-title_m">오더북 DEX 신규 서비스 개발</h5>
        <p className="text-body_m">웹 사이트 개발 | 외주 프로젝트</p>
        <span className="text-label_m">2023.05.05 ~ 2023.05.30</span>
      </div>
    </div>
  );
};

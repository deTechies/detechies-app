import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ChevronRight, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectWorkDetail from "../../project/[address]/_components/project-work-detail";

export default function ProfileProjects({ projects, text }: { projects: any, text:any }) {
  //get all the projects the user the user is part of

  return (
    <div className="flex flex-col gap-8">
      <Card className="flex flex-row justify-between items-center">
        <h5 className="text-subhead_s">{text?.projects}</h5>
        <Button size="sm" variant="secondary">
          {text?.new_project} {" "}
          <PlusIcon size="16" className="text-text-secondary ml-2" />
        </Button>
      </Card>

      {projects &&
        projects.map((project: any) => {
          return (
            <Card key={project.id} className="flex flex-row">
              <div className="w-[68px] h-[68px] relative aspect-square rounded-sm">
                <Image
                  src={`https://ipfs.io/ipfs/${project.project.image}`}
                  alt="project image"
                  fill={true}
                  className="rounded-sm"
                />
              </div>
              <div className="grow">
                <header className="flex gap-2 items-center">
                  <h5 className="text-subhead_s">{project.project.name}</h5>
                  <span className="text-text-secondary text-label_m ">
                    {project.project.type}|{" "}
                    {formatDate(project.project.begin_date)} ~{" "}
                    {project.project.end_date
                      ? formatDate(project.project.end_date)
                      : text?.present}{" "}
                  </span>
                </header>
                <div>
                  {project.works &&
                    project.works.map((work: any) => {
                      return <ProjectWorkDetail data={work} key={work.id} />;
                    })}
                </div>
              </div>
              <div className="flex flex-col justify-between  ">
                <Badge>{text?.evaluation} (0)</Badge>
                <Link
                  href={`/project/${project.project.id}`}
                  className="text-label_s text-text-secondary flex gap-2 items-center"
                >
                  {text?.view_project} <ChevronRight size="16" />
                </Link>
              </div>
            </Card>
          );
        })}
    </div>
  );
}
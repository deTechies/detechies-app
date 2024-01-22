"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import ProjectDetailItem from "./project-detail-item";

export default function ProfileProjects({
  projects,
  text,
  lang,
  visiting = false,
}: {
  projects: any;
  text: any;
  lang: any;
  visiting?: boolean;
}) {
  //get all the projects the user the user is part of
  const router = useRouter();
  // console.log(projects);

  return (
    <div className="flex flex-col gap-3">
      <Card className="flex flex-row items-center justify-between">
        <h5 className="text-subhead_s">{text?.projects}</h5>
        {!visiting && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              router.push("/project/create");
            }}
          >
            {text?.new_project}{" "}
            <PlusIcon size="16" className="ml-2 text-text-secondary" />
          </Button>
        )}
      </Card>
      {projects &&
        projects.map((project: any, index: number) => (
            <ProjectDetailItem
              data={{
                link: `/project/${project.project.id}`,
                image: project.project.image,
                description: project.project.description,
                role: project.works[0]?.role,
                type: project.project.type,
                contribution: project.works[0]?.percentage,
                tags: project.project.tags,
                title: project.project.name,
                begin_date: project.project.begin_date,
                end_date: project.project.end_date,
                work_name: project.project.work_name,
              }}
              lang={lang}
              key={index}
            />
          ))}
    </div>
  );
}

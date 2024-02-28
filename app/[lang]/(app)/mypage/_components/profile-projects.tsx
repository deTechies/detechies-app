import { Card } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
// import Image from "next/image";

import { serverApi } from "@/lib/data/general";
import Link from "next/link";
import ProjectDetailItem from "./project-detail-item";

export default async function ProfileProjects({
  text,
  lang,
  visiting = false,
}: {
  text: any;
  lang: any;
  visiting?: boolean;
  //get all the projects the user the user is part of
}) {
  const newUrl = new URLSearchParams();
  newUrl.set("me", "true");
  const { data: projects } = await serverApi(`/projects`, newUrl.toString());
  
  console.log(projects);
  return (
    <div className="flex flex-col gap-3">
      <Card className="flex flex-row items-center justify-between">
        <h5 className="text-subhead_s">{text?.projects}</h5>
        {!visiting && (
          <Link href="/project/create">
            {text?.new_project}{" "}
            <PlusIcon size="16" className="ml-2 text-text-secondary" />
          </Link>
        )}
      </Card>
      
      <div className="grid grid-cols-3 gap-4">
      {projects.data &&
        projects.data.map((project: any, index: number) => (
            <ProjectDetailItem
              data={project}
              lang={lang}
              key={index}
            />
          ))}
          </div>
    </div>
    
  );
}

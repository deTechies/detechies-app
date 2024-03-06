
import { PlusIcon } from "lucide-react";
// import Image from "next/image";

import PageHeader from "@/components/metronic/header/page-header";
import { Button } from "@/components/ui/button";
import { serverApi } from "@/lib/data/general";
import Link from "next/link";
import ProjectDetailItem from "./project-detail-item";

export default async function ProfileProjects({
  user,
  text,
  lang,
  visiting = false,
}: {
  user?: string
  text: any;
  lang: any;
  visiting?: boolean;
  //get all the projects the user the user is part of
}) {
  const newUrl = new URLSearchParams();
  newUrl.set("me", "true");
  
  if(user) {
    newUrl.set("wallet", user);
    newUrl.delete("me");
  }
  const { data: projects } = await serverApi(`/projects`, newUrl.toString());
  
  console.log(projects);
  return (
    <div className="flex flex-col gap-3">
      <PageHeader title={`${text?.projects} (${projects.totalCount})`}>
        {!visiting && (
          <Link href="/project/create" className="flex flex-row">
            <Button variant={"secondary"} size="sm">
              <PlusIcon size="16" className="text-text-secondary" /> <span>{text?.new_project} </span>
            </Button>
          </Link>
        )}
      </PageHeader>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md items-stretch">
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

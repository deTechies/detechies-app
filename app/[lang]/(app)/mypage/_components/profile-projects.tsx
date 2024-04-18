// import Image from "next/image";

import PageHeader from "@/components/metronic/header/page-header";
import { Button } from "@/components/ui/button";
import { serverApi } from "@/lib/data/general";
import { Plus } from "detechies-icons";
import Link from "next/link";
import ProjectListItem from "../../project/_components/project-list-item";

export default async function ProfileProjects({
  user,
  text,
  lang,
  visiting = false,
}: {
  user?: string;
  text: any;
  lang: any;
  visiting?: boolean;
  //get all the projects the user the user is part of
}) {
  const newUrl = new URLSearchParams();
  newUrl.set("me", "true");

  if (user) {
    newUrl.set("wallet", user);
    newUrl.delete("me");
  }
  const { data: projects } = await serverApi(`/projects/me`, newUrl.toString());

  return (
    <div className="flex flex-col gap-3">
      <PageHeader title={`${text?.projects} (${projects.totalCount})`}>
        {!visiting && (
          <Link href="/project/create" className="flex flex-row" passHref>
            <Button variant={"secondary"} size="sm">
              <Plus /> <span>{text?.new_project} </span>
            </Button>
          </Link>
        )}
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {projects.data &&
          projects.data.map((project: any, index: number) => (
            <ProjectListItem details={project} lang={lang} key={index} />
          ))}
      </div>
    </div>
  );
}

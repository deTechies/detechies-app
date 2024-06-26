import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { serverApi } from "@/lib/data/general";
import { addURL } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function MyProjectsCard({ user }: { user: any }) {
  const newURL = new URLSearchParams();
  newURL.set("user", user.toString());
  newURL.set("limit", "5");
  const { data: projects } = await serverApi(`/projects`, newURL.toString());
  return (
    <Card>
      <CardHeader>Recent Projects</CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col divide-y-1 ">
          {projects?.data.length > 0 ? (
            projects?.data.map((project: any, index: number) => (
              <ProjectItem key={index} details={project} lang={user} />
            ))
          ) : (
            <p>No projects</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export const ProjectItem = ({ details, lang }: { details: any; lang: any }) => {
  return (
    <div className="flex gap-3 items-center hover:bg-background-layer-2 justify-between w-full px-[30px] py-4 border-b border-border-div last:border-none last:rounded-b-[12px]">
      <div className="flex gap-3 items-start">
        <div className="w-[45px] h-[45px] aspect-square relative bg-background-layer-2 rounded-[6px]">
          <Image
            src={addURL(details.image)}
            fill
            className="my-auto object-contain"
            alt={details.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Link href={`/project/${details.id}`}>{details.name}</Link>
          <span className="text-2sm text-gray-600">{details.description}</span>
        </div>
      </div>
    </div>
  );
};

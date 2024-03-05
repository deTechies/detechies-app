import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { Button } from "@/components/ui/button";
import { serverApi } from "@/lib/data/general";
import { addURL } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MyProjectsCard({ user }: { user: any }) {
  const newURL = new URLSearchParams();
  newURL.set("me", "true");
  newURL.set("limit", "5");
  const { data: projects } = await serverApi(`/projects`, newURL.toString());
  return (
    <Card>
      <CardHeader>Recent Projects</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {projects.data.length > 0 ? (
            projects.data.map((project: any, index: number) => (
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
    <div className="flex gap-3 items-center hover:bg-background-layer-2 justify-between w-full">
      <div className="flex gap-3 items-center">
      <div className="w-[45px] h-[45px] aspect-square relative bg-background-layer-2 rounded-[6px]">
        <Image
          src={addURL(details.image)}
          fill
          className="my-auto object-contain"
          alt={details.name}
        />
      </div>
      <div>
      <span>{details.name}</span>
      <span>
        {details.membersCount}
      </span>
      </div>
    
      </div>
      <Link href={`/project/${details.id}`}>
        <Button
          className="text-primary"
          size="square"
        >
          <ArrowRight size={16}/>
        </Button>
      </Link>
    </div>
  );
};

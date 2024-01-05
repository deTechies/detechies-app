import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ChevronRight, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectWorkDetail from "../../project/_components/project-work-detail";
import { Member } from "@/lib/interfaces";

export default function ProfileClubs({
  clubs,
  text,
}: {
  clubs: Member[];
  text: any;
}) {
  //get all the clubs the user is part of

  return (
    <div className="flex flex-col gap-8">
      <Card className="flex flex-row justify-between items-center">
        <h5 className="text-subhead_s">{text?.clubs}</h5>
        <Button size="sm" variant="secondary">
          {text?.new_club}{" "}
          <PlusIcon size="16" className="text-text-secondary ml-2" />
        </Button>
      </Card>
      
      {clubs &&
        clubs.map((club: Member) => {
          return (
            <Card key={club.id} className="inline-flex flex-row my-2">
              <div className="w-[68px] h-[68px] relative aspect-square rounded-sm">
                <Image
                  src={`https://ipfs.io/ipfs/${club.club.image}`}
                  alt="project image"
                  fill={true}
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-4 grow shrink flex-wrap">
                <header className="flex gap-2 items-center">
                  <h5 className="text-subhead_s">{club.club.name}</h5>
                  <span className="text-text-secondary text-label_m ">
                    Group Type:{" "}
                    {club.club.type}
                  </span>
                  <span className="text-text-secondary text-label_m ">
                    Date joined: {" "}
                    {formatDate(club.club.created_at.toDateString())}
                  </span>
                </header>
                {/* <div>
                  {project.works && (
                    <ProjectWorkDetail data={project.works[0]} />
                  )}
                </div> */}
              </div>
              <div className="flex flex-col justify-between shrink-0">
                <Badge>{text?.evaluation} (0)</Badge>
                {/* <Link
                  href={`/project/${project.project.id}`}
                  className="text-label_s text-text-secondary flex gap-2 items-center"
                >
                  {text?.view_project} <ChevronRight size="16" />
                </Link> */}
              </div>
            </Card>
          );
        })}
    </div>
  );
}

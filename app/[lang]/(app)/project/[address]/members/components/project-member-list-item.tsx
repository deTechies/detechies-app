import { Card, CardContent, CardFooter } from "@/components/metronic/card/card";
import { Button } from "@/components/ui/button";
import { ProjectMember } from "@/lib/interfaces";
import { addURL } from "@/lib/utils";
import { Briefcase, PercentDiamond } from "lucide-react";
import Image from "next/image";
import ProjectContribution from "../../../_components/project-contribution";
import DeleteWorks from "../../_components/modals/delete-works";

export interface detailsProps {
  details: ProjectMember;
  isMember: boolean;
  viewer: string;
  lang: any;
  projectId: string
}
export default async function ProjectMemberListItem({
  lang,
  details,
  viewer,
  isMember,
  projectId
}: detailsProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5 justify-center grow">
        <div className="flex flex-col gap-4 mx-auto">
          <Image
            src={addURL(details.user.avatar_link)}
            width={100}
            height={100}
            className="rounded-full bg-accent-secondary mx-auto border border-accent-primary"
            alt="profile_image_project_member "
          />
          <h3 className="text-center font-medium">{details.user.display_name}</h3>
          {details.works[0] ? (
            <div className="flex flex-row flex-wrap gap-4 text-sm text-text-secondary">
              <div className="flex flex-row gap-2 items-center justify-center">
                <Briefcase size={16} />
                <span>{details.works[0].role}</span>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <PercentDiamond size={16} />
                <span>{details.works[0].percentage} % contribution</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-row gap-2 items-center text-sm text-text-secondary">
                <Briefcase size={16} />
                <span>{details.role}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          <span className="text-sm h-[50px] overflow-scroll">
            {details.works.length > 0
              ? details.works[0]?.description
              : "No contributions yet"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="justify-center items-center">
        <div className="flex flex-row gap-4 justify-center">
          {isMember ? (
            viewer === details.user.wallet ? (
              <>
                <ProjectContribution
                  projectId={projectId}
                  lang={lang}
                  defaultValues={details.works[0]}
                />

                {/* delete */}
                <DeleteWorks projectId={details.works[0].workId} lang={lang} />
              </>
            ) : (
              <>
                <Button size="sm" variant={"secondary"}>
                  Remove
                </Button>
                <Button size="sm" variant={"secondary"}>
                  Promote
                </Button>
              </>
            )
          ) : (
            <Button>{viewer === details.user.id ? "View" : "Invite"}</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

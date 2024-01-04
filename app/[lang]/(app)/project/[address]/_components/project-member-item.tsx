import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { auth } from "@/lib/helpers/authOptions";
import { ProjectMember } from "@/lib/interfaces";
import { MoreVertical } from "lucide-react";
import ProjectContribution from "../../_components/project-contribution";
import ProjectMemberEvaluate from "../../_components/project-evaluate";
import ProjectWorkDetail, { BlurredProjectWorkDetail } from "../../_components/project-work-detail";

import DeleteMember from "./modals/delete-member";
import RequestEvaluation from "./modals/request-evaluation";



export default async function ProjectMemberItem({
  details,
  access,
  projectId,
  lang,
  userRole,
}: {
  details: ProjectMember;
  projectId: string;
  access: boolean;
  lang: any;
  userRole: string;
}) {
  const session = await auth();

  return (
    <Card className="flex flex-row gap-5 px-8 pb-8 flex-start pt-7">
      <div className="flex w-full gap-5 ">
        <figure className="relative bg-background-layer-2 w-20 h-20 aspect-square rounded-[6px] flex justify-center items-center">
          <IPFSImageLayer
            hashes={details?.user?.nft ? details.user?.nft : defaultAvatar}
            className="rounded-sm"
          />
        </figure>

        <div className="flex items-center justify-start w-full gap-4 grow basis-0">
          <div className="flex flex-col gap-4 grow shrink">
            <header className="flex items-center gap-3">
              <h5 className="text-title_m">
                {details.user?.display_name} | {lang.details.role_type[details.role]}
              </h5>

              <Badge>{lang.details.members.unregistered}</Badge>
            </header>
            <>
              {access ? (
                <ProjectWorkDetail data={details.works[0]} />
              ) : (
                <BlurredProjectWorkDetail />
              )}
            </>
          </div>

          <div className="flex flex-col items-end justify-start h-full gap-3">
            {session?.web3.address == details.user.wallet ? (
              <>
                {userRole}
                {/* {details.works.length < 1 && (
                  <ProjectContribution project={details.project} />
                )}
                {details.works.length > 0 && (
                  <ProjectMemberEvaluate projectMember={details} />
                )} */}
              </>
            ) : (
              <>
                {details.works.length > 0 && (
                  <ProjectMemberEvaluate projectMember={details} />
                )}
                {
                  (userRole == 'admin' || userRole == 'member') && (
                    <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="w-6 h-6 text-text-secondary hover:text-text-primary"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <div className="flex flex-col gap-3 px-3 my-4 text-left">
                        <RequestEvaluation memberId={details.memberId} />
                        <DropdownMenuItem>관리자 권한 위임</DropdownMenuItem>
                        <DeleteMember memberId={details.memberId} />
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  )
                }
             
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

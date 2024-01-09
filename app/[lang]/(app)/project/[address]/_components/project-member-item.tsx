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
import ProjectWorkDetail, {
  BlurredProjectWorkDetail,
} from "../../_components/project-work-detail";

import DeleteMember from "./modals/delete-member";
import RequestEvaluation from "./modals/request-evaluation";
import ProjectContributionInvite from "../../_components/project-contribution-invite";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
=======
import InviteContributionMember from "@/components/invite-project-member/invite-contribution-member";


>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0

export default async function ProjectMemberItem({
  details,
  projectId,
  lang,
  userRole,
}: {
  details: ProjectMember;
  projectId: string;
  lang: any;
  userRole: string;
}) {
  const session = await auth();

  return (
<<<<<<< HEAD
    <Card className="flex flex-row gap-5 p-6 flex-start">
      <div className="flex flex-wrap w-full gap-5">
=======
    <Card className="flex flex-row flex-start gap-5 px-8 pb-8 pt-7">
      <div className="flex w-full gap-5 ">
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0
        <figure className="relative bg-background-layer-2 w-20 h-20 aspect-square rounded-[6px] flex justify-center items-center">
          <IPFSImageLayer
            hashes={details?.user?.nft ? details.user?.nft : defaultAvatar}
            className="rounded-sm"
          />
        </figure>

<<<<<<< HEAD
        <div className="flex items-start gap-4 grow basis-0">
          <div className="flex flex-col h-full gap-4 grow shrink">
            <header className="flex items-center justify-between h-full gap-3">
=======
        <div className="grow w-full basis-0 gap-4 justify-start items-center flex">
          <div className="flex-col grow shrink gap-4 flex">
            <header className="flex gap-3 items-center">
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0
              <h5 className="text-title_m">
                {details.user?.display_name} |{" "}
                {lang.details.role_type[details.role]}
                {details.works.length < 1 && (
                  <Badge className="ml-2.5">
                    {lang.details.members.unregistered}
                  </Badge>
                )}
              </h5>

<<<<<<< HEAD
              <div className="flex items-center gap-3 shrink-0">
                {session?.web3.address == details.user.wallet ? (
                  <>
                    {userRole != "client" && details.works.length < 1 && (
                      // <ProjectContributionInvite project={details.project} lang={lang}/>
                      <ProjectContribution project={details.project} />
=======
              <Badge>{lang.details.members.unregistered}</Badge>
              <div className="flex flex-col justify-start items-end gap-3 h-full ml-auto">
                {session?.web3.address == details.user.wallet ? (
                  <>
                  
                    {userRole != "client" && details.works.length < 1 && (
                    
                      <ProjectContributionInvite project={details.project} lang={lang}/>
                      // <ProjectContribution project={details.project} />
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0
                    )}
                    {details.works.length > 0 && (
                      <div className="flex gap-3">
                        <Button size="sm" variant="secondary">
                          수정하기
                        </Button>
                        
                        <Button size="sm" variant="secondary">
                          삭제하기
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {userRole != "none" && details.works.length > 0 && (
                      <ProjectMemberEvaluate projectMember={details} />
                    )}
                    {(userRole == "admin" || userRole == "member") && (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="w-6 h-6 text-text-secondary hover:text-text-primary" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <div className="flex flex-col gap-3 px-3 my-4 text-left">
                            <RequestEvaluation memberId={details.memberId} />
                            <DropdownMenuItem>
                              관리자 권한 위임
                            </DropdownMenuItem>
                            <DeleteMember memberId={details.memberId} />
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </>
                )}
              </div>
            </header>
<<<<<<< HEAD

            {userRole != "none" ? (
              <ProjectWorkDetail data={details.works[0]} />
            ) : (
              <BlurredProjectWorkDetail />
            )}
          </div>
=======
            <>
              {access ? (
                <ProjectWorkDetail data={details.works[0]} />
              ) : (
                <BlurredProjectWorkDetail />
              )}
            </>
          </div>

         
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0
        </div>
      </div>
    </Card>
  );
}

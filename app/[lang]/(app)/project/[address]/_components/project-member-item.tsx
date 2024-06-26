import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { auth } from "@/lib/helpers/authOptions";
import { ProjectMember } from "@/lib/interfaces";
import { MoreVertical } from "lucide-react";
import ProjectMemberEvaluate from "../../_components/project-evaluate";
import ProjectWorkDetail, {
  BlurredProjectWorkDetail,
} from "../../_components/project-work-detail";

import ProjectContribution from "../../_components/project-contribution";
import DeleteMember from "./modals/delete-member";
import DeleteWorks from "./modals/delete-works";
import RequestEvaluation from "./modals/request-evaluation";

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

  const finishedSurveyLength = details.works[0]?.surveyResponses.filter(
    (surveyResponse) => {
      return surveyResponse.status == "finished";
    }
  ).length;

  return (
    <>
      <Card className="flex flex-row gap-5 p-6 truncate flex-start">
        <div className="flex flex-wrap w-full gap-5 md:flex-nowrap">
          <figure className="relative bg-background-layer-2 w-20 h-20 aspect-square rounded-[6px] flex justify-center items-center">
            <IPFSImageLayer
              hashes={
                details?.user?.avatar ? details.user?.avatar : defaultAvatar
              }
              className="rounded-sm"
            />
          </figure>

          <div className="flex items-start gap-4 truncate grow">
            <div className="flex flex-col h-full gap-4 truncate grow shrink">
              <header className="flex flex-wrap items-center justify-between h-full gap-3">
                <div className="flex gap-3">
                  <h5 className="text-title_m">
                    {details.user?.display_name} |{" "}
                    {lang.interface.role_type[details.role]}
                  </h5>

                  <Badge
                    shape="sm"
                    variant={finishedSurveyLength > 0 ? "info" : "default"}
                    className="px-1.5 py-0.5"
                  >
                    {details.works.length < 1
                      ? lang.project.details.members.unregistered
                      : `${lang.project.details.members.registered} (${
                          details.works[0].surveyResponses
                            ? finishedSurveyLength
                            : 0
                        })`}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 ml-auto shrink-0">
                  {/* My work */}
                  {session?.web3.address == details.user.wallet ? (
                    <>
                      {userRole != "client" && details.works.length < 1 && (
                        // Add works
                        <ProjectContribution
                          projectId={details.project.id}
                          lang={lang}
                        />
                      )}
                      {details.works.length > 0 && finishedSurveyLength < 1 && (
                        <div className="flex gap-3">
                          {/* edit */}
                          <ProjectContribution
                            projectId={details.project.id}
                            lang={lang}
                            defaultValues={details.works[0]}
                          />

                          {/* delete */}
                          <DeleteWorks
                            projectId={details.works[0].workId}
                            lang={lang}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Others works */}

                      {/* 
                        <Button size="sm" variant="secondary" disabled={true}>
                          평가완료
                        </Button>
                      */}

                      {userRole != "none" &&
                        userRole != "invited" &&
                        userRole != "joined" &&
                        details.works.length > 0 && (
                          // Evaluate this member
                          <ProjectMemberEvaluate
                            projectMember={details}
                            lang={lang}
                          />
                        )}

                      {(userRole == "admin" || userRole == "member") && (
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical className="w-6 h-6 text-text-secondary hover:text-text-primary" />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            <div className="flex flex-col gap-3 px-3 my-4 text-left">
                              <RequestEvaluation
                                projectId={projectId}
                                memberWallet={details.user.wallet}
                                lang={lang}
                              />
                              {/* <DropdownMenuItem>
                                {lang.project.details.members.delegate_admin}
                                </DropdownMenuItem> */}
                              {userRole == "admin" && (
                                <DeleteMember
                                  memberId={details.memberId}
                                  lang={lang}
                                />
                              )}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </>
                  )}
                </div>
              </header>

              {userRole == "admin" || "client" || "member" ? (
                <ProjectWorkDetail data={details.works[0]} lang={lang} />
              ) : (
                <BlurredProjectWorkDetail />
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

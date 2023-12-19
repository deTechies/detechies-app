import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { auth } from "@/lib/helpers/authOptions";
import { ProjectMember } from "@/lib/interfaces";
import ProjectContribution from "./project-contribution";
import ProjectMemberEvaluate from "./project-evaluate";
import ProjectWorkDetail, {
  BlurredProjectWorkDetail,
} from "./project-work-detail";



export default async function ProjectMemberItem({
  details,
  access,
  projectId,
}: {
  details: ProjectMember;
  projectId: string;
  access: boolean;
}) {
  const session = await auth();

  return (
    <Card className="flex flex-row flex-start gap-5 p-8">
      <div className="flex w-full gap-5 ">
        <figure className="relative bg-background-layer-2 w-20 h-20 aspect-square rounded-[6px] flex justify-center items-center">
          <IPFSImageLayer
            hashes={details?.user?.nft ? details.user?.nft : defaultAvatar}
            className="rounded-sm"
          />
        </figure>
        <div className="grow w-full basis-0 gap-2 justify-start items-start flex flex-wrap">
          <div className="flex-col grow shrink gap-2 flex">
            <header className="flex gap-4 items-center">
              <h5 className="text-title_m">
                {details.user?.display_name} | {details.role}
              </h5>
              <Badge>Rewards</Badge>
            </header>
            <>
              {access  ?
                  <ProjectWorkDetail data={details.works[0]}  />

                  :
                  <BlurredProjectWorkDetail />
              }
            </>
          </div>
          <div className="flex flex-col justify-start items-end gap-3 ">
            {session?.web3.address == details.user.wallet ? (
              <>
                <ProjectContribution project={details.project} />
                {
                  details.works.length > 0 &&    <ProjectMemberEvaluate projectMember={details} />
                }
             
              </>
            ) : (
              <Badge>
                <span className="text-sm">Review</span>
              </Badge>
            )}
          </div>
        
        </div>
       
      </div>
    </Card>
  );
}

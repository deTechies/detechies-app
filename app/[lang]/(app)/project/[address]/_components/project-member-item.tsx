import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { auth } from "@/lib/helpers/authOptions";
import { User } from "@/lib/interfaces";
import ProjectContribution from "./project-contribution";
import ProjectWorkDetail from "./project-work-detail";

interface MemberDetails {
  memberId: string;
  created_at: string;
  level: number;
  verified: boolean;
  user: User;
  role: string;
  works: any[];
  joined: string;
}

export default async function ProjectMemberItem({
  details,
  userAddress,
  projectId,
}: {
  details: MemberDetails;
  projectId: string;
  userAddress: string;
}) {
  const session = await auth();

  
  return (
    <Card className="flex flex-row flex-start gap-5">
      <figure className="relative bg-background-layer-2 h-24 w-24 rounded-[6px]">
        <IPFSImageLayer
          hashes={details?.user?.nft ? details.user?.nft : defaultAvatar}
          className="rounded-sm"
        />
      </figure>
      <div className="flex flex-col gap-2 flex-grow">
        <header className="flex gap-4 items-center">
          <h5 className="text-title_m">
            {details.user?.display_name} | {details.role}
          </h5>
          <Badge>Rewards</Badge>
        </header>
        <section>
          {details?.works &&
            details.works.map((work) => (
              <ProjectWorkDetail data={work} key={work.id} />
            ))}
        </section>
      </div>
      
      <div className="flex flex-col gap-4 flex-end">
        {session?.web3.address == details.user.wallet ? (
          <>
            <ProjectContribution projectId={projectId} />
            <Badge variant="secondary">
              <span className="text-sm">Request</span>
            </Badge>
          </>
        ) : (
          <Badge>
            <span className="text-sm">Review</span>
          </Badge>
        )}
      </div>
    </Card>
  );
}

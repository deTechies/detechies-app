import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultAvatar } from "@/lib/constants";
import { getUserProfile } from "@/lib/data/user";
import ProjectContribution from "./project-contribution";
import ProjectWorkDetail from "./project-work-detail";

interface MemberDetails {
  memberId: string;
  created_at: string;
  level: number;
  verified: boolean;
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
  const data = await getUserProfile(userAddress);

  if (!data) return <Skeleton className="h-24 w-full" />;

  return (
    <Card className="flex flex-row flex-start gap-5">
      <figure className="relative bg-background-layer-2 h-24 w-24 rounded-[6px]">
        <IPFSImageLayer
          hashes={data?.nft ? data.nft : defaultAvatar}
          className="rounded-sm"
        />
      </figure>
      <div className="flex flex-col gap-2 flex-grow">
        <header className="flex gap-2 items-center">
          <h5 className="font-medium leading-none">
            {data?.display_name} | {details.role}
          </h5>
          <Badge variant={"info"}>Rewards</Badge>
        </header>
        <p className="text-sm text-muted-foreground">
          Joined at {details?.created_at}
        </p>
        <section>
          {details?.works &&
            details.works.map((work) => (
              <ProjectWorkDetail data={work} key={work.id} />
            ))}
        </section>
      </div>
      <div className="flex flex-col gap-4 flex-end">
        <ProjectContribution projectId={projectId} />
        <Button variant="secondary" size="sm">
          <span className="text-sm">Request</span>
        </Button>
      </div>
    </Card>
  );
}

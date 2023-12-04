
import AddMemberModal from "@/components/extra/add-member";
import { Card } from "@/components/ui/card";

import PendingMemberList from "@/components/modal/pending-member-list";
import { getPendingProjectMembers } from "@/lib/data/project";
import { Address } from "wagmi";
import ProjectMemberItem from "./_components/project-member-item";

export default async function ProjectMembers({
  members,
  isCreator,
  projectId,
}: {
  members: any[];
  projectId: string;
  isCreator: boolean;
}) {
  //getting all the members and holders of this project NFT.

  let pendingMembers: any[] = [];
  if (isCreator) {
    pendingMembers = await getPendingProjectMembers(projectId);
  }
  

  return (
    <section className="flex flex-col gap-4">
      <Card className="flex flex-col gap-4 py-4">
        <header className="flex items-center justify-between">
          <h5 className="text-subhead_s text-text-primary font-medium">
            Members ({members.length})
          </h5>
          {pendingMembers.length > 0 && (
            <span className="text-subhead_s text-text-secondary">
              <PendingMemberList pendingMembers={pendingMembers} />
            </span>
          )}
          {isCreator && <AddMemberModal type="project" />}
        </header>
      </Card>

      <div className="flex flex-col gap-4">
        {members &&
          members.map((member, index) => (
            <ProjectMemberItem
              key={index}
              details={member}
              userAddress={member.address as Address}
            />
          ))}
      </div>
    </section>
  );
}

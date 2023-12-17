import { Card } from "@/components/ui/card";

import InviteProjectMember from "@/components/invite-project-member/invite-project-member";
import PendingMemberList from "@/components/modal/pending-member-list";
import JoinProject from "@/components/project/join-project";
import { getPendingProjectMembers } from "@/lib/data/project";
import ProjectMemberItem from "./_components/project-member-item";

export default async function ProjectMembers({
  members,
  userRole,
  projectId,
}: {
  members: any[];
  projectId: string;
  userRole: string;
}) {
  //getting all the members and holders of this project NFT.

  let pendingMembers: any[] = [];
  if (userRole == "admin") {
    pendingMembers = await getPendingProjectMembers(projectId);
  }

  return (
    <section className="flex flex-col gap-3">
      <Card className="flex flex-col gap-4 pt-7 px-9 pb-9">
        <header className="flex items-center justify-between">
          <h5 className="text-subhead_s text-text-primary ">
            Members ({members.length})
          </h5>
          {pendingMembers.length > 0 && (
            <span className="text-xs text-text-secondary">
              <PendingMemberList pendingMembers={pendingMembers} />
            </span>
          )}
          {userRole == 'none' && <JoinProject address={projectId} />}
          {userRole == 'admin' && <InviteProjectMember projectId={projectId} />}
        </header>
      </Card>

      <div className="flex flex-col gap-4">
        {members.length > 0 &&
          members.map((member, index) => (
            <ProjectMemberItem
              projectId={projectId}
              key={index}
              access={userRole != 'none'}
              details={member}
            />
          ))}
      </div>
    </section>
  );
}

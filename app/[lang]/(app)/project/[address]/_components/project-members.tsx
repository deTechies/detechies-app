import { Card } from "@/components/ui/card";

import InviteProjectMember from "@/components/invite-project-member/invite-project-member";

import JoinProject from "@/components/project/join-project";
import { getPendingProjectMembers } from "@/lib/data/project";
import ProjectMemberItem from "./project-member-item";


export default async function ProjectMembers({
  members,
  userRole,
  projectId,
  lang,
}: {
  members: any[];
  projectId: string;
  userRole: string;
  lang: any
}) {
  //getting all the members and holders of this project NFT.

  

  let pendingMembers: any[] = [];
  if (userRole == "admin") {
    pendingMembers = await getPendingProjectMembers(projectId);
  }
  
  console.log(members[0].works);

  return (
    <section className="flex flex-col gap-4">
      <Card className="flex flex-col gap-4 p-4 px-6">
        <header className="flex items-center justify-between">
          <h5 className="text-subhead_s text-text-primary ">
            Members ({members.length})
          </h5>

          {userRole == 'none' && <JoinProject lang={lang} address={projectId} />}
          {userRole == 'admin' && <InviteProjectMember lang={lang} projectId={projectId} />}
        </header>
      </Card>

      <div className="flex flex-col gap-4">
        {members.length > 0 &&
          members.map((member, index) => (
            <ProjectMemberItem
              projectId={projectId}
              key={index}
              userRole={userRole}
              lang={lang}
              access={userRole != 'none'}
              details={member}
            />
          ))}
      </div>
    </section>
  );
}

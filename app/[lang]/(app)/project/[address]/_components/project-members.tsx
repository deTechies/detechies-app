import { Card } from "@/components/ui/card";

import InviteProjectMember from "@/components/invite-project-member/invite-project-member";

import JoinProject from "@/components/project/join-project";
import { getPendingProjectMembers } from "@/lib/data/project";
import ProjectMemberItem from "./project-member-item";


export default async function ProjectMembers({
  details,
  projectId,
  lang,
}: {
  details: any;
  projectId: string;
  lang: any
}) {
  //getting all the members and holders of this project NFT.

  // console.log(details.members);

  return (
    <section className="flex flex-col gap-4">
      <Card className="flex flex-col gap-4 p-6">
        <header className="flex items-center justify-between">
          <h5 className="text-subhead_s text-text-primary ">
            Members ({details.members.length})
          </h5>
          
          {details.userRole == 'none' && <JoinProject lang={lang} address={projectId} />}
          {details.userRole == 'admin' && <InviteProjectMember lang={lang} projectId={projectId} />}
        </header>
      </Card>

      <div className="flex flex-col gap-4">
        {details.members.length > 0 &&
          details.members.map((member: any, index: number) => (
            <ProjectMemberItem
              projectId={projectId}
              key={index}
              userRole={details.userRole}
              lang={lang}
              details={member}
            />
          ))}
      </div>
    </section>
  );
}

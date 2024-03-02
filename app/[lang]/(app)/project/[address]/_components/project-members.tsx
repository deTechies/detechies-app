import { Card } from "@/components/ui/card";

import InviteProjectMember from "@/components/invite-project-member/invite-project-member";

import JoinProject from "@/components/project/join-project";
import { serverApi } from "@/lib/data/general";
import ProjectMemberItem from "./project-member-item";

export default async function ProjectMembers({
  details,
  projectId,
  lang,
}: {
  details: any;
  projectId: string;
  lang: any;
}) {

  const profiles = await serverApi(`/users?limit=1000`);

  return (
    <section className="flex flex-col gap-4">
      <Card className="flex flex-col gap-4 p-6">
        <header className="flex items-center justify-between">
          <h5 className="text-subhead_s text-text-primary ">
            {lang.project.details.members.title} ({details.members.length})
          </h5>

         

          {details.userRole == "none" && (
            <JoinProject lang={lang} address={projectId} />
          )}
          {details.userRole == "admin" && profiles.data && (
            <InviteProjectMember
              lang={lang}
              members={profiles.data.data}
              projectId={projectId}
              projectMembers={details.members}
            />
          )}
        </header>
      </Card>

      <div className="flex flex-col gap-4">
        {details.members &&
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

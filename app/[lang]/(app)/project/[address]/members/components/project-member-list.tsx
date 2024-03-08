import { serverApi } from "@/lib/data/general";
import { auth } from "@/lib/helpers/authOptions";
import { Session } from "next-auth";
import ProjectMemberListItem from "./project-member-list-item";

export default async function ProjectMemberList({
  projectId,
  lang
}: {
  projectId: string;
  lang: any
}) {
  //getting all the members of the project
  const { data: members } = await serverApi(
    `/project-member/project/${projectId}`
  );
  const session = (await auth()) as Session;

  const isMember = members.find(
    (member: any) => member.user.wallet === session?.web3?.address
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-md">
      {members.map((member: any, index: number) => (
        <ProjectMemberListItem
          key={index}
          details={member}
          isMember={isMember}
          lang={lang}
          viewer={session?.web3.address}
          projectId={projectId}
        />
      ))}
    </div>
  );
}

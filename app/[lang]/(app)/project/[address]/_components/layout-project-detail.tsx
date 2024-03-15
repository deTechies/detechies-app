import AvatarMemberGroup from "@/components/metronic/avatar/avatar-member-group";
import { serverApi } from "@/lib/data/general";
import { AsteriskIcon, TimerIcon } from "lucide-react";

import InviteProjectMember from "@/components/invite-project-member/invite-project-member";
import JoinProject from "@/components/project/join-project";
import { getDictionary } from "@/get-dictionary";
import { auth } from "@/lib/helpers/authOptions";
import Image from "next/image";
import ProfileTabs from "../../../mypage/_components/profile-page-card/profile-tabs";

export default async function LayoutProjectDetail({
  projectId,
}: {
  projectId: string;
}) {
  const { data: project } = await serverApi(`/projects/${projectId}`);
  const lang = await getDictionary("en");
  const session = await auth();

  const groupList = project.members.map((member: any) => {
    return {
      name: member.user.name,
      src: `https://ipfs.io/ipfs/${member.user.avatar_link}`,
      id: member.user.wallet,
    };
  });

  const links = [
    {
      name: "dashboard",
      href: "",
      isAdmin: false,
    },
    {
      name: "members",
      href: `members`,
      isAdmin: false,
    },
  ] as any;
  
  if(project.owner === session?.web3.address) {
    links.push({
      name: "settings",
      href: `edit`,
      isAdmin: true,
    });
  }

  return (
    <header className="border-none rounded-t-none flex flex-col  bg-background-layer-1 rounded-sm ">
      <div className="flex gap-md py-10 mx-2 md:mx-10 ">
        <div className="w-[100px] h-[100px] rounded-[6px] flex items-center">
          <div className="md:w-[50px] aspect-square lg:w-[75px] mx-auto my-auto">
            <Image
              src={`https://ipfs.io/ipfs/${project.image}`}
              alt={project.name}
              width={75}
              height={75}
            />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <section className="flex flex-col gap-2 mt-2">
            <h2 className="text-lg font-medium">{project.name}</h2>
            <dl className="flex gap-4 text-text-secondary text-label_m">
              <div className="flex gap-1 items-center">
                <AsteriskIcon />
                <dd className="text-text-secondary">{project.type}</dd>
              </div>
              <div className="flex gap-1 items-center">
                <TimerIcon />
                <dd className="text-text-secondary">
                  {project.begin_date} ~ {project.end_date}
                </dd>
              </div>
            </dl>
          </section>
          <section className="flex justify-end">
            <div className="flex flex-col justify-between">
              <div>
                <AvatarMemberGroup
                  group={[...groupList, ...groupList, ...groupList]}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <ProfileTabs links={links} prelink={`/project/${projectId}`}>
        {project.userRole == "none" && (
          <JoinProject lang={lang} address={projectId} />
        )}
        {project.userRole == "admin" && (
          <InviteProjectMember
            lang={lang}
            members={[]}
            projectId={projectId}
            projectMembers={project.members}
          />
        )}
      </ProfileTabs>
    </header>
  );
}

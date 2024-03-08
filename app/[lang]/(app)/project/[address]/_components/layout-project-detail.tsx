import AvatarMemberGroup from "@/components/metronic/avatar/avatar-member-group";
import { Button } from "@/components/ui/button";
import { serverApi } from "@/lib/data/general";
import { AsteriskIcon, PenSquare, TimerIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import ProfileTabs from "../../../mypage/_components/profile-page-card/profile-tabs";

export default async function LayoutProjectDetail({
  projectId,
}: {
  projectId: string;
}) {
  const { data: project } = await serverApi(`/projects/${projectId}`);

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
    {
      name: "edit",
      href: "edit",
      isAdmin: false,
    }
  ] as any;

  return (
    <header className=" border-none rounded-t-none flex flex-col gap-10">
      <div className="flex gap-md px-10 mx-10 lg:mx-20">
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
            <h2 className="text-subhead_m">{project.name}</h2>
           
            <span className=" text-text-secondary max-w-[400px] max-h-[200px]">
              {project.description}
            </span>
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
              {project.userRole == "admin" && (
                <Link
                  href={`/project/${project.id}/edit`}
                  className="ml-auto shrink-0"
                >
                  <Button variant="secondary" size="sm">
                    <span className="mr-2">Edit</span>
                    <PenSquare size={16} className="inline-block " />
                  </Button>
                </Link>
              )}
              <div>
                <AvatarMemberGroup
                  group={[...groupList, ...groupList, ...groupList]}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <ProfileTabs links={links}
        prelink={`/project/${projectId}`}
      ></ProfileTabs>
    </header>
  );
}

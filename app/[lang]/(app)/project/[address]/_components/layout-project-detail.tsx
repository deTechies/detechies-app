import AvatarMemberGroup from "@/components/metronic/avatar/avatar-member-group";
import { Card } from "@/components/metronic/card/card";
import { Button } from "@/components/ui/button";
import { serverApi } from "@/lib/data/general";
import { AsteriskIcon, PenSquare, TimerIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

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

  return (
    <Card className="p-10 border-none rounded-t-none">
      <div className="flex gap-8 px-10">
        <div className="w-[100px] h-[100px] rounded-[6px] bg-background-layer-2 flex items-center">
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
    </Card>
  );
}

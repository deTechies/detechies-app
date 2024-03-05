import AvatarMemberGroup from "@/components/metronic/avatar/avatar-member-group";
import { Card } from "@/components/metronic/card/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Club } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function GroupListItem({
  details,
  lang,
  isPending,
}: {
  details: Club;
  lang: any;
  isPending?: boolean;
  // The group on Pending is only visiable for owner (not implemented yet)
}) {
  //conevert hte members to avatar members
  if(!details.members){
    details.members = []
  }
  const avatarMembers = details?.members.map((member: any) => {
    return {
      id: member.id,
      name: member.name,
      src: member.image,
    };
  });
  return (
    <Link href={`/groups/${details.id}`} passHref>
      <Card className="flex flex-col items-center  h-full p-[30px] gap-[30px] border hover:border-accent-primary">
        <section className="flex flex-col items-center justify-center gap-4 text-center">
          <Avatar className="w-[50x] h-[50px] mx-auto ">
            <AvatarImage
              src={`https://ipfs.io/ipfs/${details.image}`}
              alt={details.name}
              className="rounded-full bg-none"
            />

            <AvatarFallback className="relative">
              <Image
                src="/images/detechies.png"
                alt="no-item"
                fill={true}
                className="object-contain bg-no-repeat"
              />
            </AvatarFallback>
          </Avatar>
          <div className="max-w-[250px]">
            <h5 className="trunctate font-semibold text-md mb-2">{details.name}</h5>
            <p className="text-xs">{details.description}</p>
          </div>
        </section>


          <section className="flex flex-col gap-1.5">
            <h5 className="text-gray-500 text-xs uppercase font-medium">Team</h5>
            <AvatarMemberGroup group={avatarMembers} size={8} />
          </section>

        <div className="flex divide-x">
          <div className="px-4">
            <div className="text-xs">{details.members?.length}</div>
            <div className="mb-1 text-xs">{lang.group.list.members}</div>
          </div>

          <div className="px-4 text-center">
            <div className="text-xs">{details.achievements?.length}</div>
            <div className="mb-1 text-xs">{lang.group.list.nfts}</div>

          </div>
        </div>
      </Card>
    </Link>
  );
}

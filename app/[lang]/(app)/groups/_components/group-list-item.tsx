import AvatarMemberGroup from "@/components/metronic/avatar/avatar-member-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
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
      <Card className="flex flex-col items-center pt-[46px] h-full px-[20px] gap-[30px] border border-white hover:border-accent-primary">
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
          <div>
            <h5 className="trunctate font-semibold text-md">{details.name}</h5>
            <p>{details.description}</p>
          </div>
        </section>


          <section className="flex flex-col gap-1.5">
            <h5 className="text-gray-500 text-xs uppercase font-medium">Team</h5>
            <AvatarMemberGroup group={avatarMembers} size={8} />
          </section>

        <div className="flex divide-x">
          <div className="px-4">
            <div className="text-title_m">{details.members?.length}</div>
            <div className="mb-1 text-label_s">{lang.group.list.members}</div>
          </div>

          <div className="px-4 text-center">
            <div className="text-title_m">{details.achievements?.length}</div>
            <div className="mb-1 text-label_s">{lang.group.list.nfts}</div>

          </div>
        </div>
      </Card>
    </Link>
  );
}

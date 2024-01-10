import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getClub } from "@/lib/data/groups";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectItemProps {
  id: string;
  name: string;
  image: string;
  description: string;
  status: string;
  achievements: any[];
  location: string;
  addr: string;
  creator: string;
  type: string;
  members: any[];
}
const GroupListItem = React.memo(
  ({ details, lang }: { details: ProjectItemProps; lang: any }) => {
    // const group = await getClub(details.id);

    return (
      <Link href={`groups/${details.id}`}>
        <Card className="flex flex-col items-center bg-black-700 text-accent-on-primary pt-[46px] pb-6 px-6 gap-0">
          <section className="flex flex-col items-center justify-center max-w-full text-center">
            <Avatar className="w-24 h-24 aspect-square bg-[#C7E2FF] mb-2">
              <AvatarImage
                src={`https://ipfs.io/ipfs/${details.image}`}
                alt={details.name}
                className="rounded-full"
              />

              <AvatarFallback className="relative">
                <Image src="/images/careerzen.png" alt="no-item" fill={true} />
              </AvatarFallback>
            </Avatar>

            <h5 className="max-w-full mb-1 truncate text-heading_s">
              {details.name}
            </h5>
            <div className="text-title_m mb-[46px] flex items-center gap-1">
              {/* {details.type != "community" && (
                <Image
                  height={20}
                  width={20}
                  alt="certified"
                  src={`/icons/certified_${details.type}.png`}
                ></Image>
              )} */}

              {/* {lang.group.list[details.type]} */}
              {lang.interface.group_type[details.type]}
            </div>

            <div className="flex divide-x">
              <div className="px-4">
                <div className="mb-1 text-label_s">
                  {lang.group.list.members}
                </div>
                <div className="text-title_m">{details.members?.length}</div>
              </div>

              <div className="px-4 text-center">
                <div className="mb-1 text-label_s">{lang.group.list.nfts}</div>
                <div className="text-title_m">0</div>
                {/* <div className="text-title_m">{group.achievements.length}</div> */}
              </div>
            </div>
          </section>
        </Card>
      </Link>
    );
  }
);

GroupListItem.displayName = 'GroupListItem'

export default GroupListItem;

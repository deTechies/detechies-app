import { Card, CardFooter } from "@/components/metronic/card/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Club } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function TeamListItem({
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
  if (!details.members) {
    details.members = [];
  }
  const avatarMembers = details?.members.map((member: any) => {
    return {
      id: member.id,
      name: member.name,
      src: member.image,
    };
  });
  return (
    <Link href={`/teams/${details.id}`} passHref>
      <Card className="flex border hover:scale-[1.02] transition-transform duration-200">
        <section className="flex flex-col items-center justify-center gap-4 text-center p-4">
          <Avatar className="w-[60x] h-[60px] p-[18px] mx-auto ">
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
            <h5 className="text-md mb-2">{details.name}</h5>
            <p className="text-sm text-text-secondary h-[100px] overflow-scroll">
              {details.description}
            </p>
          </div>
          <div className="w-full flex-col">
            <TeamListItemStat
              label="Members"
              value={details.members.length.toString()}
            />
            <TeamListItemStat
              label="Achievements"
              value={details.achievements.length.toString()}
            />
            <TeamListItemStat label="Created" value={formatDate(details.created_at)} />
          </div>
        </section>
        <CardFooter>

            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              disabled={isPending}
              >{isPending ? "pending" : "verified"}</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function TeamListItemStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="text-sm flex flex-row justify-between border-b border-dashed border-border-div last:border-none gap-2 py-2 first:pt-0 last:pb-0">
      <span className=" text-text-secondary">{label}</span>
      <span className="">{value}</span>
    </div>
  );
}

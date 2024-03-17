"use client";
import { DEFAULT_AVATAR_LINK } from "@/lib/constants";
import { User } from "@/lib/interfaces";
import Link from "next/link";

import { Card, CardFooter } from "@/components/metronic/card/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { addURL, formatDate } from "@/lib/utils";
import Image from "next/image";

interface ProfileProps {
  profile: User;
  lang: any;
}

export default function ProfileListItem({ profile, lang }: ProfileProps) {
  return (
    <Link href={`/profiles/${profile.wallet}`} passHref>
      <Card className="flex border hover:scale-[1.02] transition-transform duration-200">
        <section className="flex flex-col items-center justify-center gap-4 text-center p-4">
          <Avatar className="w-[60x] h-[60px] mx-auto ">
            <AvatarImage
              src={addURL(profile.avatar_link) || DEFAULT_AVATAR_LINK}
              alt={profile.display_name}
              className="rounded-full bg-none"
            />

            <AvatarFallback className="relative">
              <Image
                src={addURL(profile.avatar_link) || DEFAULT_AVATAR_LINK}
                alt="avatar"
                fill={true}
              />
            </AvatarFallback>
          </Avatar>
          <div className="max-w-[250px]">
            <h5 className="text-md mb-2"> {profile.display_name}</h5>
          </div>

          <div className="w-full flex-col">
            <TeamListItemStat
              label="Profession"
              value={profile.profile_details?.profession}
            />
            <TeamListItemStat
              label="Projects"
              value={profile.projectsCount.toString()}
            />
            <TeamListItemStat
              label="Created"
              value={formatDate(profile?.created_at)}
            />
          </div>
        </section>
        <CardFooter>
          <Button variant="secondary" size="sm" className="w-full">
            Connect
          </Button>
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

"use client";
import { DEFAULT_AVATAR_LINK } from "@/lib/constants";
import { User } from "@/lib/interfaces";
import Link from "next/link";

import { Card } from "../../../../../components/metronic/card/card";
import { Badge } from "../../../../../components/ui/badge";

import { addURL } from "@/lib/utils";
import Image from "next/image";

interface ProfileProps {
  profile: User;
  lang: any;
}

export default function ProfileCard({ profile, lang }: ProfileProps) {
  return (
    <Link href={`/profiles/${profile.wallet}`} passHref>
      <Card className="flex flex-row h-full gap-4 truncate cursor-pointer p-6">
        <div className="relative w-[80px] h-[80px] aspect-square rounded-sm bg-background-layer-2 mx-auto">
          <Image
            src={addURL(profile.avatar_link) || DEFAULT_AVATAR_LINK}
            alt="avatar"
            fill={true}
          />
        </div>

        <div className="flex flex-col w-full gap-2 truncate">
          <h5 className="truncate text-title_m ">
            {profile.display_name ? profile.display_name : `&nbsp`}{" "}
            {profile.role && "| " + profile.role}
          </h5>

          <div className="flex flex-wrap gap-1">
            {profile.tags?.length > 0 ? (
              profile.tags.map((item, index) =>
                index > 2 ? (
                  index == 3 && (
                    <Badge shape={"sm"} variant="outline" key={index}>
                      More+{profile.tags?.length - 3}
                    </Badge>
                  )
                ) : (
                  <Badge shape={"sm"} variant="outline" key={index}>
                    {item}
                  </Badge>
                )
              )
            ) : (
              <Badge shape={"sm"} variant={"outline"}>
                No role
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-text-secondary text-label_s">
                {lang.profile_detail_card.projects}
              </span>
              <span className="text-title_s">{profile.projectsCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-text-secondary text-label_s">
                {lang.profile_detail_card.certificates}
              </span>
              <span className="text-title_s">{profile.achievementsCount}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
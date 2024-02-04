"use client";
import { defaultAvatar } from "@/lib/constants";
import { User } from "@/lib/interfaces";
import Link from "next/link";
import { Badge } from "../ui/badge";
import IPFSImageLayer from "../ui/layer";

interface ProfileProps {
  profile: User;
  lang: any;
}

export default function ProfileCard({ profile, lang }: ProfileProps) {
  return (
    <Link href={`/profiles/${profile.wallet}`} passHref>
      <section className="flex flex-row gap-6 rounded-sm cursor-pointer p-7 bg-background-layer-1 hover:shadow-lg">
        <div className="relative w-[100px] h-[100px] aspect-square  rounded-sm bg-[#FFE590] mx-auto">
          <IPFSImageLayer
            hashes={profile.avatar ? profile.avatar : defaultAvatar}
          />
        </div>
        <div className="flex flex-col justify-between w-full gap-4">
          <h5 className="text-title_m">
            {profile.display_name ? profile.display_name : `&nbsp`}{" "}
            {profile.role && "| " + profile.role}
          </h5>

          <div className="flex gap-1 ">
            {profile.tags?.length > 0 ? (
              profile.tags.map((item, index) =>
                index > 2 ? (
                  index == 3 && (
                    <Badge shape={"skill"} variant="outline" key={index}>
                      그외 기술+{profile.tags?.length - 3}
                    </Badge>
                  )
                ) : (
                  <Badge shape={"skill"} variant="outline" key={index}>
                    {item}
                  </Badge>
                )
              )
            ) : (
              <Badge shape={"skill"} variant={"outline"}>No role</Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-text-secondary text-label_s">
                {lang.profile_detail_card.projects}
            </span>
            <span className="text-title_s">
              {profile.projectsCount}
            </span>
            </div>
           <div className="flex items-center gap-1">
           <span className="text-text-secondary text-label_s">
              {lang.profile_detail_card.achievements}
            </span>
            <span className="text-title_s">
              {profile.achievementsCount}
            </span>
           </div>

          </div>
        </div>
      </section>
    </Link>
  );
}

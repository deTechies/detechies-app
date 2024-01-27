"use client";
import { defaultAvatar } from "@/lib/constants";
import { User } from "@/lib/interfaces";
import Link from "next/link";
import { Badge } from "../ui/badge";
import IPFSImageLayer from "../ui/layer";

interface ProfileProps {
  profile: User;
  lang: any
}

export default function ProfileCard({ profile, lang }: ProfileProps) {
  return (
    <Link href={`/profiles/${profile.wallet}`} passHref>
      <section className="flex flex-col justify-center gap-3 p-5 rounded-sm cursor-pointer bg-background-layer-1 hover:shadow-lg">
        <div className="flex flex-col w-full gap-4">
          <div className="relative w-[110px] h-[110px]  rounded-full bg-[#FFE590] mx-auto">
            <IPFSImageLayer
              hashes={profile.avatar ? profile.avatar : defaultAvatar}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center mx-auto text-center gap-2 ">
            <h5 className="text-title_s text-text-secondary">
              {profile.role ? profile.role : "none"}
            </h5>
            <h5 className="text-subhead_s">
              {profile.display_name ? profile.display_name : `&nbsp`}
            </h5>
          </div>
          <div className="flex justify-center gap-1 align-center">
            {profile.tags?.length > 0 ? (
              profile.tags.map((item, index) =>
                index > 2 ? (
                  index == 3 && (
                    <Badge shape={"category"}>
                      그외 기술+{profile.tags?.length - 3}
                    </Badge>
                  )
                ) : (
                  <Badge
                  shape={"category"}
                    key={index}
                  >
                    {item}
                  </Badge>
                )
              )
            ) : (
              <Badge shape={"category"}>No role</Badge>
            )}
          </div>

          <hr className="w-full border-[1px] border-lightGray/30  " />
        </div>
        <div className="flex justify-center gap-5 md:gap-10 align-center my-3">
          <div className="flex flex-col text-center">
            <div className=" text-accent-primary text-heading_s">
              {profile.projectsCount}
            </div>
            <div className="text-text-secondary text-title_s">
              {lang.profile_detail_card.projects}
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="text-[#00C71B]  text-heading_s">
              {profile.achievementsCount}
            </div>
            <div className="text-text-secondary text-title_s ">
              {lang.profile_detail_card.achievements}
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="text-[#00C71B] text-heading_s">
              {profile.clubsCount}
            </div>
            <div className="text-text-secondary text-title_s">
              {lang.profile_detail_card.groups}
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

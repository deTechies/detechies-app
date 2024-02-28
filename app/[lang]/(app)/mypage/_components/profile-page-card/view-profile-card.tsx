import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addURL, getTimezone } from "@/lib/utils";
import { Briefcase, Edit, Euro, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ViewProfileCard({ dictionary, profile }: any) {
  return (
    <Card className="flex flex-row gap-4 w-full justify-between items-start px-5">
      <div className="flex gap-8">
        <div className="relative w-[120px] h-[120px] aspect-square rounded-[6px] bg-background-layer-2 mx-auto">
          <Image
            src={addURL(profile?.avatar_link)}
            fill
            className="rounded-[6px]"
            alt={"profile_picture"}
          />
        </div>
        <div className="flex flex-col justify-between gap-2 lg:max-w-[40vw]">
          <div className="flex gap-4">
            <h1 className="text-subhead_m">{profile.display_name}</h1>
            <Badge
              variant={
                profile.profile_details.availability === "available"
                  ? "accent"
                  : profile.profile_details.availability === "soon available"
                  ? "info"
                  : "secondary"
              }
            >
              {profile.profile_details.profession}
            </Badge>
          </div>

          <p>{profile.profile_details.description}</p>
          <div>
            <div className="flex gap-4 divide-x">
              {profile.profile_details.hourly_rate && (
                <div className="flex gap-2 justify-center items-center">
                  <Euro />
                  <span className="text-label_m">
                    {profile.profile_details.hourly_rate}
                  </span>
                </div>
              )}
              {profile.profile_details.timezone && (
                <div className="flex gap-2 justify-center items-center pl-3">
                  <MapPin />
                  <span className="text-label_m">
                    {getTimezone(profile.profile_details.timezone)}
                  </span>
                </div>
              )}
              {profile.profile_details.availability && (
                <div className="flex gap-2 justify-center items-center pl-3">
                  <Briefcase />
                  <span className="text-label_m">
                    {profile.profile_details.availability}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link
          href={`/mypage/edit`}
         
        >
          <Button variant={"secondary"} size="sm" className="flex flex-row items-center gap-1">
            <Edit className="ml-2 text-icon-secondary" size="12" />
            <span>{dictionary?.mypage.main.edit}</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
}

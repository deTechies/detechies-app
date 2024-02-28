
import { Card } from "@/components/ui/card";
import { addURL } from "@/lib/utils";
import Image from "next/image";
import ProfileSocials from "./profile-socials";
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
        <div className="flex flex-col justify-between gap-2">
          <h1 className="text-subhead_m">
            {profile.display_name}
          </h1>
        <div>
          <ProfileSocials />
        </div>
        </div>
      </div>
    </Card>
  );
}

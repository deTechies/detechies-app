"use client";
// import MyCredits from "@/components/profile/my-credits";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { usePathname } from "next/navigation";
import AvatarUpdate from "./avatar-update";
import ProfileCardDetails from "./profile-card-details";

export default function ViewProfileCard({ dictionary, profile }: any) {
  const pathName = usePathname();

  if (pathName.includes("avatar")) {
    return <AvatarUpdate profile={profile} lang={dictionary} />;
  }
  return (
    <Card className="flex flex-col gap-5 w-full pt-[24px] pb-[28px] px-5 md:max-w-[376px]">
      <div className="flex flex-col gap-4">
        <div className="relative w-[120px] aspect-square rounded-full bg-background-layer-2 mx-auto">
          <IPFSImageLayer
            hashes={profile.avatar ? profile.avatar : defaultAvatar}
            className="rounded-full"
          />
        </div>
        <ProfileCardDetails profile={profile} dictionary={dictionary} />
      </div>
    </Card>
  );
}

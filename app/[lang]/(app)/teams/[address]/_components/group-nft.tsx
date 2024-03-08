//FIXME: old version of the application fix this 
"use client";
import { Button } from "@/components/ui/button";
import { Achievement } from "@/lib/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NftList from "../(layout)/nft/nft-list";

export default function GroupNFT({
  address,
  isCreator,
  achievements,
  userAchievements,
  contract,
  lang,
}: {
  address: any;
  isCreator?: boolean;
  achievements: Achievement[];
  userAchievements: any[];
  contract: string;
  lang: any;
}) {
  const pathName = usePathname();
  const user_achievements = userAchievements.map((item) => item.achievement.id);

  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-subhead_s">
          {lang.group.details.about.latest_nft}
        </h3>

        <Link href={pathName + "/nft"} passHref>
          <Button size="sm" variant="secondary">
            {lang.group.details.about.all}
          </Button>
        </Link>
      </div>

      <NftList
        achievements={achievements}
        lang={lang}
        useTab={false}
        limit={5}
        userAchievements={user_achievements}
      />
    </div>
  );
}

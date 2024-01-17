"use client";
import DisplayNFT from "@/components/nft/display-nft";

import { Button } from "@/components/ui/button";
import { Achievement } from "@/lib/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  console.log(achievements);
  console.log(userAchievements);

  const user_achievements = userAchievements.map(item => item.achievement.id);


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

      <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {achievements &&
          achievements
            .slice(0, 5)
            .map((item: Achievement, index: number) => (
              <DisplayNFT
                details={item}
                key={index}
                lang={lang}
                contract={contract}
                blockRequest={user_achievements.includes(item.id)}
              />
            ))}
      </div>

      {achievements && achievements.length < 1 && (
        <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
          {lang.group.details.about.no_latest_nft}
        </div>
      )}
    </div>
  );
}

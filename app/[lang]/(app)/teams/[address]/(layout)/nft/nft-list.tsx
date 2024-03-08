"use client";

import DisplayNFT from "@/components/nft/display-nft";
import { Button } from "@/components/ui/button";
import { Achievement, NFT_TYPE } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default function NftList({
  achievements,
  userAchievements,
  useTab = true,
  limit,
  lang,
}: {
  achievements: Achievement[];
  userAchievements?: string[];
  useTab?: boolean;
  limit?: number,
  lang: any;
}) {
  const TAB_BUTTONS = {
    ALL: "all",
    CAREER: "career",
    LIMITED: "limited",
    AVATAR: "avatar",
  };

  const [currentTab, setCurrentTab] = useState(TAB_BUTTONS.ALL);
  const [nftList, setNftList] = useState<Achievement[]>([]);

  useEffect(() => {
    let filtered = achievements;

    if (currentTab === TAB_BUTTONS.CAREER) {
      filtered = filtered.filter(
        (achievement) => achievement.nft_type == NFT_TYPE.SBT
      );
    } else if (currentTab === TAB_BUTTONS.LIMITED) {
      filtered = filtered.filter(
        (achievement) => achievement.nft_type == NFT_TYPE.ERC721
      );
    } else if (currentTab === TAB_BUTTONS.AVATAR) {
      filtered = filtered.filter((achievement) => achievement.avatar);
    }

    const sorted = filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setNftList(sorted);
  }, [achievements, userAchievements, currentTab]);

  return (
    <>
      {useTab && (
        <div className="flex flex-wrap justify-start gap-2 mb-5">
          {Object.values(TAB_BUTTONS).map((tab) => (
            <Button
              key={tab}
              size="sm"
              variant={currentTab === tab ? "secondary" : "inactive"}
              className="py-3 "
              onClick={() => setCurrentTab(tab)}
            >
              {lang.group.details.nft[tab]}
            </Button>
          ))}
        </div>
      )}

      <div className="grid items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {nftList &&
          nftList.slice(0, limit).map((achievement: Achievement, index: number) => (
            <DisplayNFT
              details={achievement}
              key={index}
              lang={lang}
              showMintButton={true}
              blockRequest={userAchievements?.includes(achievement.id)}
            />
          ))}
      </div>

      {nftList.length < 1 && (
        <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
          {lang.group.details.nft.no_nft}
        </div>
      )}
    </>
  );
}

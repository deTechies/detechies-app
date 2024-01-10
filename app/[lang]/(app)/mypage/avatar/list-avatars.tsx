"use client";
import DisplayNFT from "@/components/nft/display-nft";
import { AchievementReward } from "@/lib/interfaces";
import { useMemo } from "react";

export default function ListAvatars({
  rewards,
  status,
  lang,
  sbt,
  avatar,
}: {
  rewards: AchievementReward[];
  status: string;
  lang: any;
  sbt?: boolean;
  avatar?: boolean;
}) {
  const filteredAchievements = useMemo(() => {
    let pending = rewards.filter(
      (achievement) => achievement.status === status
    );

    if (avatar) {
      pending = rewards.filter(
        (achievement) =>
          achievement.status === "granted" &&
          achievement.achievement.avatar != null
      );
      
      if(sbt){
        pending = rewards.filter(
          (achievement) =>
            achievement.status === "granted" &&
            achievement.achievement.nft_type === "sbt"
        );
      }
    }
    return { pending };
  }, [rewards]);
  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredAchievements.pending &&
        filteredAchievements.pending.map(
          (achievementReward: AchievementReward, index: number) => (
            <DisplayNFT
              key={index}
              details={achievementReward.achievement}
              showSelect={avatar}
              lang={lang}
            />
          )
        )}
    </div>
  );
}
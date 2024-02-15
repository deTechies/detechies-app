"use client";
import { AchievementReward, NFT_TYPE } from "@/lib/interfaces";
import { useMemo } from "react";
import ListAvatarItem from "./list-avatars-item";
import ListAvatarItemTrigger from "./list-avatars-item-trigger";

export default function ListAvatars({
  rewards,
  status,
  lang,
  nft_type,
}: {
  rewards: AchievementReward[];
  status: string;
  lang: any;
  nft_type?: NFT_TYPE;
}) {
  const filteredAchievements = useMemo(() => {
    let pending = rewards.filter(
      (achievement) => achievement.status === status
    );

    if (nft_type) {
      pending = rewards.filter(
        (achievement) =>
          achievement.status === "granted" &&
          achievement.achievement.nft_type === nft_type
      );
    }

    const seenAchievement = new Set();

    // If an item has duplicate achievement.avatar, only the first one is shown.
    pending = pending.filter(obj => {
      if (!seenAchievement.has(obj.achievement.avatar)) {
        seenAchievement.add(obj.achievement.avatar);
        return true;
      }
      return false;
    });

    return { pending };
  }, [rewards, nft_type, status]);

  return (
    <>
      <div className="flex flex-wrap gap-[11px]">
        {filteredAchievements.pending &&
          filteredAchievements.pending.map(
            (achievementReward: AchievementReward, index: number) => (
              <div className="max-w-[174px] w-full">
                <ListAvatarItem
                  key={index}
                  details={achievementReward.achievement}
                  showSelect={status === "granted"}
                  lang={lang}
                  showMintButton={true}
                  blockRequest={true}
                />
              </div>
            )
          )}
      </div>

      <div>
        {filteredAchievements.pending?.length === 0 && (
          <div className="py-24 text-center text-text-secondary text-subhead_s">
            {lang.mypage.edit_avatar.no_avatar}
          </div>
        )}
      </div>
    </>
  );
}

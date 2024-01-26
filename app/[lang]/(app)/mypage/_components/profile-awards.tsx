"use client";

import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
// import Image from "next/image";
import Image from "@/components/ui/image";
import { NftCard } from "./nft-card";
import { AchievementReward } from "@/lib/interfaces";

interface IProfileAwardsProps{
  achievement_rewards: AchievementReward[];
  text: any;
}

export default function ProfileAwards({
  achievement_rewards,
  text,
}: IProfileAwardsProps) {
  
  return (  
    <div className="flex flex-col gap-2">
      <Card className="flex flex-row items-center justify-between">
        <h5 className="text-subhead_s">{text?.awards}</h5>
        {/* <Button size="sm" variant="secondary" onClick={()=>{
          router.push("/groups/create")
        }}>
          {text?.new_club}{" "}
          <PlusIcon size="16" className="ml-2 text-text-secondary" />
        </Button> */}
      </Card>
      
      {achievement_rewards &&
        achievement_rewards.map((achievement_reward: AchievementReward) => {
            if(achievement_reward.status == 'granted' && achievement_reward.achievement.type == 'awards'){
                return (
                    <NftCard id={achievement_reward.id} achievement={achievement_reward.achievement}/>
                  );
            }
        })}
    </div>
  );
}



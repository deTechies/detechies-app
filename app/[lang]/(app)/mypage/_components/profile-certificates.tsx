"use client";

import { Card } from "@/components/ui/card";
// import Image from "next/image";
import DisplayNFTModal from "@/components/nft/display-nft-modal";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTrigger
} from "@/components/ui/dialog";
import { useDictionary } from "@/lib/dictionaryProvider";
import { AchievementReward } from "@/lib/interfaces";
import { NftCard } from "./nft-card";





interface IProfileClubsProps{
  achievement_rewards: AchievementReward[];
  text: any;
}

export default function ProfileCertificates({
    achievement_rewards,
    text,
  }: IProfileClubsProps) {
  const dictionary = useDictionary();

  return (  
    <div className="flex flex-col gap-2">
      <Card className="flex flex-row items-center justify-between">
        <h5 className="text-subhead_s">{text?.education}</h5>
        {/* <Button size="sm" variant="secondary" onClick={()=>{
          router.push("/groups/create")
        }}>
          {text?.new_club}{" "}
          <PlusIcon size="16" className="ml-2 text-text-secondary" />
        </Button> */}
      </Card>
      
      {achievement_rewards &&
        achievement_rewards.map((achievement_reward: AchievementReward, index: number) => {

          if(achievement_reward.status == 'granted' && achievement_reward.achievement.type == 'edu'){
            return (
              <Dialog key={index}>
                <DialogTrigger>

                  <NftCard id={achievement_reward.id} achievement={achievement_reward.achievement}/>
                </DialogTrigger>
               <DialogPortal >
                  <DialogOverlay className="bg-blackA4 data-[state=open]:animate-overlayShow fixed inset-0"/>
                  <DisplayNFTModal details={achievement_reward.achievement} showMintButton={false} lang={dictionary}/>
                </DialogPortal>
              </Dialog>
            );
          }

        })}
    </div>
  );
}


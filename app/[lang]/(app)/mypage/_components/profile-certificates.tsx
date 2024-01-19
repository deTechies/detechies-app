"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
// import Image from "next/image";
import Image from "@/components/ui/image";
import { Achievement, AchievementReward } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import DisplayNFTModal from "@/components/nft/display-nft-modal";
import { useDictionary } from "@/lib/dictionaryProvider";

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogContent
} from "@/components/ui/dialog";





interface IProfileClubsProps{
  achievement_rewards: AchievementReward[];
  text: any;
}

export default function ProfileCertificates({
    achievement_rewards,
    text,
  }: IProfileClubsProps) {
  const router = useRouter();
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

          if(achievement_reward.status == 'granted'){
            return (
              <Dialog key={index}>
                <DialogTrigger>
                  <Card key={achievement_reward.id} className="flex flex-row items-start">
                    <div className="w-[68px] h-[68px] relative aspect-square rounded-sm ">
                      <Image
                        src={`https://ipfs.io/ipfs/${achievement_reward.achievement?.image ? achievement_reward.achievement.image : achievement_reward.achievement.avatar}`}
                        alt="project image"
                        fill={true}
                        className="rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col flex-wrap gap-4 grow shrink">
                      <header className="flex items-center gap-2">
                        <h5 className="text-subhead_s">{achievement_reward.achievement?.name}</h5>
                      </header>
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col gap-2 basis-1/4">
                          <span className="text-text-secondary text-label_m">
                            {text?.issuer}:{" "}
                            <span className="capitalize">{achievement_reward.achievement?.club?.name}</span>
                          </span>
                          <span className="text-text-secondary text-label_m ">
                            {text?.issue_date}: {" "} {formatDate(achievement_reward?.created_at.toString())}
                          </span>
                        </div>
                        <div className="flex flex-col basis-3/4">
                          <span className="text-text-secondary text-label_m">{achievement_reward.achievement?.description}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between shrink-0">
                      <Badge variant="info">{achievement_reward.achievement?.type}</Badge>
                    </div>
                  </Card>
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


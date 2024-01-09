"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

import { Achievement, AchievementReward } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import DisplayNFT from "@/components/nft/display-nft";

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogContent } from "@radix-ui/react-dialog";

interface IProfileClubsProps{
  achievement_rewards: AchievementReward[];
  text: any;
}

interface IClubCertificateProps{
  details: Achievement
}

export default function ProfileCertificates({
  achievement_rewards,
  text,
}: IProfileClubsProps) {
  const router = useRouter();
  
  return (  
    <div className="flex flex-col gap-2">
      <Card className="flex flex-row justify-between items-center">
        <h5 className="text-subhead_s">{text?.education}</h5>
        {/* <Button size="sm" variant="secondary" onClick={()=>{
          router.push("/groups/create")
        }}>
          {text?.new_club}{" "}
          <PlusIcon size="16" className="text-text-secondary ml-2" />
        </Button> */}
      </Card>
      
      {achievement_rewards &&
        achievement_rewards.map((achievement_reward: AchievementReward) => {
          console.log("Achievement: ", achievement_reward.achievement)

          if(achievement_reward.status == 'granted'){
            return (
              <Card key={achievement_reward.id} className="flex inline-flex flex-row items-start">
                <div className="w-[68px] h-[68px] relative aspect-square rounded-sm ">
                  <Image
                    src={`https://ipfs.io/ipfs/${achievement_reward.achievement.image ? achievement_reward.achievement.image : achievement_reward.achievement.avatar}`}
                    alt="project image"
                    fill={true}
                    className="rounded-sm"
                  />
                </div>
                <div className="flex flex-col gap-4 grow shrink flex-wrap">
                  <header className="flex gap-2 items-center">
                    <h5 className="text-subhead_s">{achievement_reward.achievement.name}</h5>
                  </header>
                  <div className="flex gap-4 items-start">
                    <div className="flex flex-col gap-2 basis-1/4">
                      <span className="text-text-secondary text-label_m">
                        {text?.issuer}:{" "}
                        <span className="capitalize">{achievement_reward.achievement.club.name}</span>
                      </span>
                      <span className="text-text-secondary text-label_m ">
                        {text?.issue_date}: {" "} {formatDate(achievement_reward?.created_at.toString())}
                      </span>
                    </div>
                    <div className="flex flex-col basis-3/4">
                      <span className="text-text-secondary text-label_m">{achievement_reward.achievement.description}</span>
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col justify-between shrink-0">
                  <ClubCertificate 
                    details={achievement.achievement}
                  />
                </div> */}
              </Card>
            );
          }

        })}
    </div>
  );
}

// function ClubCertificate({
//   details
// }:IClubCertificateProps){
//   return(
//     <Dialog>
//       <DialogTrigger>
//         <Badge variant="info">{details?.type}</Badge>
//       </DialogTrigger>
//       <DialogPortal >
//         <DialogOverlay className="bg-blackA4 data-[state=open]:animate-overlayShow fixed inset-0 z-10"/>
//         <DialogContent className="flex flex-col gap-6 max-w-[504px] pt-6">
//         <div className="flex items-center justify-between gap-2">
//           <span className="text-subhead_s">{details.name}</span>

//           <Button variant="secondary" size="sm" onClick={onClickContract}>
//             {truncateMiddle("aaaaaaaaaaaaaaaaaaa", 13)}
//           </Button>
//         </div>

//         <div className="flex flex-col gap-4">
//           <div className="relative object-scale-down w-full rounded-sm aspect-square bg-gradient-to-b from-state-info to-accent-primary">
//             <Image
//               src={DEFAULT_IPFS_URL + showingImage}
//               alt={details.name}
//               fill={true}
//               className="rounded-sm"
//             />

//             {details.avatar && details.image && (
//               <Button
//                 className="absolute w-12 h-12 bottom-2 right-2"
//                 onClick={onClickChangeImage}
//                 size="image"
//               >
//                 <Image
//                   src={
//                     showingImage == details.avatar
//                       ? "/icons/certificate.png"
//                       : "/icons/avatar.png"
//                   }
//                   alt="avatar"
//                   width="48"
//                   height="48"
//                 ></Image>
//               </Button>
//             )}
//           </div>
//           <div className="max-w-md p-0 border rounded-sm border-border-div">
//             <div className="flex items-center justify-between px-4 py-3 border-b border-border-div">
//               <div className="text-label_m text-text-secondary ">NFT 유형</div>

//               <div className="flex items-center gap-2 overflow-auto text-right">
//                 <span className="text-title_m">
//                   {details.nft_type == "sbt" ? "커리어" : "한정판"}
//                 </span>

//                 {details.nft_type == "sbt" && (
//                   <Badge variant="info" shape="category">
//                     {
//                       details.type == "awards" ? "수상":"교육 수료증"
//                     }
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center justify-between px-4 py-3 border-b border-border-div">
//               <div className="text-label_m text-text-secondary ">NFT 속성</div>

//               <div className="flex items-center gap-2 overflow-auto text-right">
//                 <span className="text-title_m">
//                   {details.avatar && details.image
//                     ? "아바타 + 증명서"
//                     : details.avatar
//                     ? "아바타"
//                     : "증명서"}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between px-4 py-3">
//               <div className="text-label_m text-text-secondary ">발행자</div>

//               <div className="flex items-center gap-2 overflow-auto text-right">
//                 <span className="text-title_m">그룹 이름</span>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 rounded-sm bg-background-layer-2">
//             <div className="flex justify-between">
//               <span className="mb-4 text-title_m">NFT 설명</span>

//               <button
//                 onClick={() => {
//                   setShowFull(!showFull);
//                 }}
//                 className="flex items-center gap-2 p-0 text-label_m text-text-secondary w-fit h-fit"
//               >
//                 {showFull ? "hide" : "show_more"}
//                 {showFull ? <ChevronUp size="12" /> : <ChevronDown size="12" />}
//               </button>
//             </div>

//             <p className={`text-body_m ${!showFull && "line-clamp-2"}`}>
//               {details.description}
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-2">
//           <DialogClose asChild>
//             <Button variant={"secondary"}>다음에 할래요</Button>
//           </DialogClose>
          
//           <Button onClick={handleRequestNFT}>발행 요청</Button>
//         </div>
//       </DialogContent>
//       </DialogPortal>
//     </Dialog>
//   )
// }

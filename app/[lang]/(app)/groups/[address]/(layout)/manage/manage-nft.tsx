// import { Locale } from "@/i18n.config";

import PendingNftListItem from "@/components/group/pending-nft-list-item";
import DisplayNFT from "@/components/nft/display-nft";
import { Button } from "@/components/ui/button";
import { getPendingAchievements } from "@/lib/data/achievements";
import { Achievement } from "@/lib/interfaces";

export default async function ManageNft({ details }: { details: any }) {
  // const dictionary = await getDictionary(params.lang);
  
  //getting all the pending achievements 
  
  const pendingAchievements = await getPendingAchievements(details.id);
  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="flex justify-between mb-4">
        <h3 className="text-subhead_s">NFT 발행 대기 중 ({pendingAchievements.length})</h3>


        <Button size="sm">
          {/* Approve All */}
          모두 승인하기
        </Button>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <div className="grid grid-cols-[282px_1fr_90px_144px] gap-4 text-text-placeholder text-title_s">
          <div>유저 / 프로젝트</div>
          <div>요청한 NFT</div>
          <div className="text-center ">요청한 날짜</div>
          <div className="text-center ">승인 여부</div>
        </div>

        {/* temp */}
        {pendingAchievements.length > 0 &&
          pendingAchievements.map((item: any, index: number) => {
            return (
              <PendingNftListItem
                nft={item}
                key={index}
                contract={details.id}
              ></PendingNftListItem>
            );
          })}
      </div>

      <h3 className="mb-4 text-subhead_s">
        생성된 NFT ({details.achievements.length})
      </h3>

      <div className="overflow-auto max-w-[90vw]">
        <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {details.achievements &&
            details.achievements.map((item: Achievement, index: number) => (
              <DisplayNFT details={item} key={index} />
            ))}
        </div>

        {details.achievements && details.achievements.length < 1 && (
          <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
            최근 생성한 NFT가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

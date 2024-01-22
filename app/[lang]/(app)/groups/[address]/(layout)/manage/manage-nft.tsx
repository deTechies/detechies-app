// import { Locale } from "@/i18n.config";

import PendingNftListItem from "@/components/group/pending-nft-list-item";
import DisplayNFT from "@/components/nft/display-nft";
import { Button } from "@/components/ui/button";
import { getPendingAchievements } from "@/lib/data/achievements";
import { Achievement, AchievementReward } from "@/lib/interfaces";

export default async function ManageNft({
  details,
  lang,
}: {
  details: any;
  lang: any;
}) {
  // const dictionary = await getDictionary(params.lang);


  const {data: pendingAchievements} = await getPendingAchievements(details.id);
  
  // console.log(pendingAchievements)
  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="flex justify-between mb-4">
        <h3 className="text-subhead_s">
          {lang.group.details.manage.nft.waiting}({pendingAchievements.length})
        </h3>

        <Button size="sm">{lang.group.details.manage.nft.all_accept}</Button>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <div className="grid grid-cols-[282px_1fr_90px_144px] gap-4 text-text-placeholder text-title_s">
          <div>{lang.group.details.manage.nft.user_project}</div>
          <div>{lang.group.details.manage.nft.request_nft}</div>
          <div className="text-center ">
            {lang.group.details.manage.nft.request_date}
          </div>
          <div className="text-center ">
            {lang.group.details.manage.nft.actions}
          </div>
        </div>

        {pendingAchievements.length > 0 &&
          pendingAchievements.map((item: AchievementReward, index: number) => {
            return (
              <PendingNftListItem
                nft={item}
                key={index}
                contract={details.contract}
                lang={lang}
              ></PendingNftListItem>
            );
          })}

        {pendingAchievements && pendingAchievements.length < 1 && (
          <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
            {lang.group.details.manage.nft.no_published}
          </div>
        )}
      </div>

      <h3 className="mb-4 text-subhead_s">
        {lang.group.details.manage.nft.published} ({details.achievements.length}
        )
      </h3>

      <div className="overflow-auto max-w-[90vw]">
        <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {details.achievements &&
            details.achievements.map((item: Achievement, index: number) => (
              <DisplayNFT details={item} key={index} lang={lang} showMintButton={false}/>
            ))}
        </div>

        {details.achievements && details.achievements.length < 1 && (
          <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
            {lang.group.details.manage.nft.no_published}
          </div>
        )}
      </div>
    </div>
  );
}

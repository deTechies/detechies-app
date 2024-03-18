import DisplayNFT from "@/components/nft/display-nft";
import { serverApi } from "@/lib/data/general";
import { Achievement } from "@/lib/interfaces";

export default async function NftList({
  address,
  lang,
}: {
  address?: string;
  lang: any;
}) {
  const { data: achievements } = await serverApi(
    `/achievement/club/${address}`
  );

  return (
    <div>
      <div className="grid items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {achievements &&
          achievements.map((achievement: Achievement, index: number) => (
            <DisplayNFT
              details={achievement}
              key={index}
              lang={lang}
              showMintButton={true}
            />
          ))}
      </div>

      {achievements.length < 1 && (
        <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
          {lang.group.details.nft.no_nft}
        </div>
      )}
    </div>
  );
}

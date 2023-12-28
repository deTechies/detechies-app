
import { getDictionary } from "@/get-dictionary";
// import { Locale } from "@/i18n.config";

import { NFTItem } from "@/components/card/nft-list-item";
import DisplayNFT from "@/components/nft/display-nft";
import PendingNftListItem from "@/components/group/pending-nft-list-item";
import { Button } from "@/components/ui/button";

export default async function ManageNft({ details }: { details: any }) {
  // const dictionary = await getDictionary(params.lang);

  const dummy_nft_item = {
    contract: "test",
    id: "asdfasdfasdf",
    tokenId: 0,
    achievement: {
      tokenId: 0,
      group: {
        id: "38aa53bd-8a2f-4efc-9d73-c6621f7012b4",
        addr: "38aa53bd-8a2f-4efc-9d73-c6621f7012b4",
      },
    },
    group: {
      id: "38aa53bd-8a2f-4efc-9d73-c6621f7012b4",
      addr: "38aa53bd-8a2f-4efc-9d73-c6621f7012b4",
    },
    metadata: {
      name: "name",
      image: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
      category: "avatar",
      description: "this descrip",
      attributes: [
        {trait_type: "hat",
        value: "test",}
      ]
    }
  } as NFTItem;

  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="flex justify-between mb-4">
        <h3 className="text-subhead_s">NFT 발행 대기 중 ()</h3>

        <Button size="sm">
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
        {details.members.length > 0 &&
          details.members.map((item: any, index: number) => {
            return (
              <PendingNftListItem
                profile={item}
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
        <div className="flex flex-wrap gap-4">
              <DisplayNFT details={dummy_nft_item} />
          {/* {details.achievements &&
            details.achievements.map((item: NFTItem, index: number) => (
              <DisplayNFT details={item} key={index} />
            ))} */}

          {details.achievements && details.achievements.length < 1 && (
            <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
              최근 생성한 NFT가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import DisplayNFT from "@/components/nft/display-nft";

import { Button } from "@/components/ui/button";
import { Achievement } from "@/lib/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GroupNFT({
  address,
  isCreator,
  achievements,
}: {
  address: any;
  isCreator?: boolean;
  achievements: Achievement[];
}) {
  const pathName = usePathname();

  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-subhead_s">최근 생성한 NFT</h3>

        <Link href={pathName + "/nft"} passHref>
          <Button size="sm" variant="secondary">
            전체보기
          </Button>
        </Link>

      </div>

      <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {achievements &&
          achievements.map((item: Achievement, index: number) => (
            <DisplayNFT details={item} key={index} />
          ))}
      </div>

      {achievements && achievements.length < 1 && (
        <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
          최근 생성한 NFT가 없습니다.
        </div>
      )}
    </div>
  );
}

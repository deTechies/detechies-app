"use client";
import MemberCard from "@/components/card/member-card";
import { NFTItem } from "@/components/card/nft-list-item";
import DisplayNFT from "@/components/nft/display-nft";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAddress } from "viem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function GroupMember({
  address,
  isCreator,
  achievements,
}: {
  address: any;
  isCreator?: boolean;
  achievements: NFTItem[];
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

        {/* {
          isCreator && <Link href={pathName + '/members'}>Manage</Link>
        } */}
      </div>

      <div>
        {achievements &&
          achievements.map((item: NFTItem, index: number) => (
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

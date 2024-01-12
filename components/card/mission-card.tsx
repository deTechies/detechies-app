"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export default function MemberCard({
  address,
  info,
  manage = false,
  children,
  lang,
}: {
  address: string;
  manage?: boolean;
  info?: any;
  children?: React.ReactNode;
  lang: any;
}) {
  const router = useRouter();
  const params = useParams();

  const onClickCard = (e: any) => {
    // router.push(`/groups/${address}/mission/12`);
    // router.push(`/en/groups/${address}/missions/${info.seq}`);

    if (manage) {
      router.push(`/${params.lang}/groups/${address}/mission/manage/${info.campaignId}`);
      return;
    }
    router.push(`/${params.lang}/groups/${address}/mission-detail/${info.campaignId}`);
  };

  const getDaysUntilEnd = (dateEndString: string): string => {
    const today = new Date();
    const endDate = new Date(dateEndString);
    const timeDiff = endDate.getTime() - today.getTime();

    const daysUntilEnd = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysUntilEnd > 0) {
      return `${lang.mission.card.end_date_1} ${daysUntilEnd} ${lang.mission.card.end_date_2}`;
    } else if (daysUntilEnd === 0) {
      return lang.mission.card.end;
    } else {
      return lang.mission.card.before_end;
    }
  };

  const createBadgeArr = (data: any[]) => {
    const resultArr = new Set();
    let hasImage = false;
    let hasAvatar = false;

    data.forEach((item) => {
      // Check for nft_type and type
      if (item.achievement.nft_type) {
        resultArr.add(lang.interface.nft_type[item.achievement.nft_type]);
      }
      if (item.achievement.type) {
        resultArr.add(lang.interface.sbt_type[item.achievement.type]);
      }

      // Check for image and avatar
      if (item.achievement.image && !hasImage) {
        hasImage = true;
        resultArr.add(lang.interface.nft_image_type.image);
      }
      if (item.achievement.avatar && !hasAvatar) {
        hasAvatar = true;
        resultArr.add(lang.interface.nft_image_type.avatar);
      }
    });

    return Array.from(resultArr) as string[];
  };

  const content = children || (
    <div>
      {/* NO NFT */}
      {createBadgeArr(info.achievements) &&
        createBadgeArr(info.achievements)?.length < 1 && (
          <Badge shape="category">No NFT</Badge>
        )}

      {createBadgeArr(info.achievements) &&
      createBadgeArr(info.achievements)?.length <= 3 ? (
        // If there are 3 or less rewards
        <div className="flex flex-wrap gap-2 text-title_m">
          {createBadgeArr(info.achievements).map(
            (chip: string, index: number) => {
              return (
                <Badge variant={"info"} shape="category" key={index}>
                  {chip}
                </Badge>
              );
            }
          )}
        </div>
      ) : (
        // If there are more than 4 rewards
        <div className="flex flex-wrap gap-2 text-title_m">
          {createBadgeArr(info.achievements)
            ?.slice(0, 2)
            .map((chip: string, index: number) => {
              return (
                <Badge variant={"info"} shape="category" key={index}>
                  {chip}
                </Badge>
              );
            })}

          <Badge shape="category">
            +{createBadgeArr(info.achievements)?.length - 2}
          </Badge>
        </div>
      )}
    </div>
  );

  if (!info) return <div>no data</div>;

  return (
    <Card
      className="gap-1 p-0 overflow-hidden border rounded-md cursor-pointer border-border-div bg-bacound-layer-1 hover:shadow-lg"
      onClick={onClickCard}
    >
      <div className="relative w-full m-0 rounded-t-sm bg-accent-secondary">
        <Image
          src="/images/mission.png"
          alt="mission"
          className="object-cover"
          width="999"
          height="999"
        ></Image>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h5 className="text-title_l">{info.name}</h5>
        <div className="text-label_l">{getDaysUntilEnd(info.end_date)}</div>
        {content}
      </div>
    </Card>
  );
}

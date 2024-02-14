"use client";

import React from "react"; // 추가된 부분
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDictionary } from "@/lib/dictionaryProvider";
import { NFT_TYPE, SBT_TYPE } from "@/lib/interfaces";

const RequestNftListItem = React.memo(
  ({
    achievement,
    onClick,
    type,
  }: {
    achievement: any;
    onClick?: Function;
    type?: string;
  }) => {
    const lang = useDictionary();

    return (
      <div
        className={`flex items-center py-4 truncate ${
          type === "click"
            ? "cursor-pointer hover:bg-background-layer-2"
            : "border px-5 rounded-md"
        }`}
        onClick={() => onClick?.()}
      >
        <Avatar className="w-[52px] h-[52px] mr-4 overflow-hidden rounded-sm shrink-0 aspect-square bg-state-info-secondary">
          <AvatarImage
            src={`https://ipfs.io/ipfs/${
              achievement.image || achievement.avatar
            }`}
            alt={achievement.name}
          />

          <AvatarFallback className="relative">
            <Image
              src="/images/careerzen.png"
              alt="no-item"
              fill={true}
              className="object-contain bg-no-repeat"
            />
          </AvatarFallback>
        </Avatar>

        <div className="truncate">
          <div className="mb-2 truncate text-title_m">{achievement.name}</div>

          <div className="flex flex-wrap gap-2">
            <Badge shape="category" variant="info">
              {lang.interface.nft_type[achievement.nft_type as NFT_TYPE]}
            </Badge>

            {achievement.type && (
              <Badge shape="category" variant="info">
                {lang.interface.sbt_type[achievement.type as SBT_TYPE]}
              </Badge>
            )}
          </div>
        </div>

        <div className="grow" />

        {type === "click" && (
          <div>
            <ChevronRight className="text-icon-secondary"></ChevronRight>
          </div>
        )}
      </div>
    );
  }
);

RequestNftListItem.displayName = "RequestNftListItem";

export default RequestNftListItem;

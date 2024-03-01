"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDictionary } from "@/lib/dictionaryProvider";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react"; // 추가된 부분
import AchievementChips from "../extra/achievement-chips";

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
        <Avatar className="w-[52px] h-[52px] mr-4 rounded-sm">
          <AvatarImage
            src={`https://ipfs.io/ipfs/${
              achievement.image || achievement.avatar
            }`}
            alt={achievement.name}
          />

          <AvatarFallback className="relative">
            <Image
              src="/images/detechies.png"
              alt="no-item"
              fill={true}
              className="object-contain bg-no-repeat"
            />
          </AvatarFallback>
        </Avatar>

        <div className="truncate">
          <div className="mb-2 truncate text-title_m">{achievement.name}</div>

          <AchievementChips
            achievements={achievement}
            limit={2}
            truncate={true}
          />
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

"use client";
import { Achievement, NFT_TYPE, SBT_TYPE } from "@/lib/interfaces";
import { Badge } from "../ui/badge";
import { useDictionary } from "@/lib/dictionaryProvider";
import React, { useEffect, useState } from "react";

export default function AchievementChips({
  achievement,
  length,
}: {
  achievement: Achievement;
  length?: number;
}) {
  const lang = useDictionary();

  const [chips, setChips] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const chipsArray = [] as React.ReactNode[];
    if (achievement.nft_type == NFT_TYPE.SBT) {
      chipsArray.push(
        <Badge variant="info" shape="category" key="sbt">
          {lang.interface.nft_type[achievement.nft_type]}
        </Badge>
      );
    }

    if (
      achievement.nft_type == NFT_TYPE.SBT &&
      achievement.type == SBT_TYPE.AWARDS
    ) {
      chipsArray.push(
        <Badge variant="info" shape="category" key="sbt-awards">
          {lang.interface.sbt_type[achievement.type]}
        </Badge>
      );
    }

    if (
      achievement.nft_type == NFT_TYPE.SBT &&
      achievement.type == SBT_TYPE.EDU
    ) {
      chipsArray.push(
        <Badge variant="info" shape="category" key="sbt-edu">
          {lang.interface.sbt_type[achievement.type]}
        </Badge>
      );
    }

    if (achievement.nft_type == NFT_TYPE.ERC721) {
      chipsArray.push(
        <Badge variant="info" shape="category" key="erc721">
          {lang.interface.nft_type[achievement.nft_type]}
        </Badge>
      );
    }

    if (achievement.avatar) {
      chipsArray.push(
        <Badge variant="info" shape="category" key="avatar">
          {lang.interface.nft_image_type.avatar}
        </Badge>
      );
    }

    if (achievement.image) {
      chipsArray.push(
        <Badge variant="info" shape="category" key="image">
          {lang.interface.nft_image_type.image}
        </Badge>
      );
    }

    setChips(chipsArray);
  }, [achievement]);

  return (
    <div className="flex gap-2">
      {chips.map((chip, index) => {
        if (length && index >= length) return null;

        return chip;
      })}
    </div>
  );
}

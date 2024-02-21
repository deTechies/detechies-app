import React, { useEffect, useState } from "react";

import { Achievement, NFT_TYPE, SBT_TYPE } from "@/lib/interfaces";
import { useDictionary } from "@/lib/dictionaryProvider";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";

export default function AchievementChips({
  achievements,
  limit,
  truncate = false,
}: {
  achievements: Achievement | { achievement: Achievement }[];
  limit?: number;
  truncate?: boolean;
}) {
  const lang = useDictionary();
  const [chips, setChips] = useState<React.ReactNode[]>([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const achievementsArray = Array.isArray(achievements)
      ? achievements.map((item) => item.achievement || item)
      : [achievements];

    const chipSet = new Set<string>();
    const chipsArray: React.ReactNode[] = [];

    achievementsArray.forEach((achievement) => {
      if (!chipSet.has(achievement.nft_type)) {
        chipsArray.push(
          <Badge
            variant={achievement.nft_type == NFT_TYPE.SBT ? "info" : "purple"}
            shape="category"
            key={`${achievement.nft_type}`}
          >
            {lang.interface.nft_type[achievement.nft_type as NFT_TYPE]}
          </Badge>
        );
        chipSet.add(achievement.nft_type);
      }

      if (
        achievement.nft_type == NFT_TYPE.SBT &&
        achievement.type &&
        !chipSet.has(achievement.type)
      ) {
        chipsArray.push(
          <Badge variant="info" shape="category" key={`${achievement.type}`}>
            {lang.interface.sbt_type[achievement.type as SBT_TYPE]}
          </Badge>
        );
        chipSet.add(achievement.type);
      }

      if (achievement.avatar && !chipSet.has("avatar")) {
        chipsArray.push(
          <Badge variant="warning" shape="category" key="avatar">
            {lang.interface.nft_image_type.avatar}
          </Badge>
        );
        chipSet.add("avatar");
      }

      if (achievement.image && !chipSet.has("image")) {
        chipsArray.push(
          <Badge variant="warning" shape="category" key="image">
            {lang.interface.nft_image_type.image}
          </Badge>
        );
        chipSet.add("image");
      }
    });

    setChips(chipsArray);
  }, [achievements]);

  return (
    <div className="flex gap-2">
      {chips.slice(0, limit)}
      {truncate && limit && chips.length > limit && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            asChild
            onMouseEnter={() => {
              setOpen(true);
            }}
            onMouseLeave={() => {
              setOpen(false);
            }}
          >
            <div className="bg-background-layer-2 py-1.5 px-2.5 rounded-[5px] text-text-placeholder text-title_s">
              +{chips.length - limit}
            </div>
          </PopoverTrigger>

          <PopoverContent className="max-w-full p-0" side="top">
            <Card className="max-w-[500px] bg-text-placeholder rounded-sm p-4 flex-row gap-2">
              {chips.slice(limit)}
            </Card>
          </PopoverContent>
        </Popover>
      )}
      {chips.length === 0 && (
        <Badge shape="category" className="text-border-input">
          No NFT
        </Badge>
      )}
    </div>
  );
}

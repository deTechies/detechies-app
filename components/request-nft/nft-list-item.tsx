"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";

export default async function RequestNFTModal({
  achievement,
  onClick,
  type,
}: {
  achievement: any;
  onClick?: Function;
  type?: "click" | "default";
}) {
  return (
    <div
      className={`flex items-center py-4 ${
        type == "click"
          ? "cursor-pointer hover:bg-background-layer-2"
          : "border px-5 rounded-md"
      }`}
      onClick={() => (onClick ? onClick() : {})}
    >
      <div className="w-[52px] h-[52px] mr-4 overflow-hidden rounded-sm shrink-0">
        <Image
          height="52"
          width="52"
          src={`https://ipfs.io/ipfs/${
            achievement.image || achievement.avatar
          }`}
          alt={achievement.name}
        />
      </div>

      <div>
        <div className="mb-2 text-title_m">{achievement.name}</div>

        <div>
          <Badge shape="category" variant="info">
            {achievement.type == "edu" ? "에듀" : "수상"}
          </Badge>
        </div>
      </div>

      <div className="grow" />

      {type == "click" && (
        <div>
          <ChevronRight className="text-icon-secondary"></ChevronRight>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RequestGroupListItem = React.memo(
  ({
    _group,
    onClick,
    type,
  }: {
    _group: any;
    onClick?: Function;
    type?: string;
  }) => {
    return (
      <div
        className={`flex items-center py-4 truncate ${
          type === "click"
            ? "cursor-pointer hover:bg-background-layer-2"
            : "border px-5 rounded-md"
        }`}
        onClick={() => (onClick ? onClick() : {})}
      >
        <div className="shrink-0">
          <Avatar className="w-[52px] h-[52px] mr-4 overflow-hidden rounded-full shrink-0 aspect-square bg-state-info-secondary">
            <AvatarImage
              src={`https://ipfs.io/ipfs/${_group.image}`}
              alt={_group.name}
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
        </div>

        <div className="truncate">
          <div className="mb-2 truncate text-title_m">{_group.name}</div>
          <div className="text-label_m text-text-secondary">{_group.type}</div>
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

RequestGroupListItem.displayName = "RequestGroupListItem";

export default RequestGroupListItem;

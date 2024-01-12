import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const GroupListItem = React.memo(
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
        className={`flex items-center py-4 ${
          type === "click"
            ? "cursor-pointer hover:bg-background-layer-2"
            : "border px-5 rounded-md"
        }`}
        onClick={() => (onClick ? onClick() : {})}
      >
        <div className="w-[52px] h-[52px] mr-4 overflow-hidden rounded-full shrink-0">
          <Image
            height="52"
            width="52"
            src={`https://ipfs.io/ipfs/${_group.image}`}
            alt={_group.name}
          />
        </div>

        <div>
          <div className="mb-2 text-title_m">{_group.name}</div>
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

GroupListItem.displayName = "GroupListItem";

export default GroupListItem;

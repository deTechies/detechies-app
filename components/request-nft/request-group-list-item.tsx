import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDictionary } from "@/lib/dictionaryProvider";
import { Club } from "@/lib/interfaces";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const RequestGroupListItem = React.memo(
  ({
    _group,
    onClick,
    type,
    useChevron = true
  }: {
    _group: Club;
    onClick?: Function;
    type?: string;
    useChevron?: boolean;
  }) => {
    const lang = useDictionary();

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
          <Avatar className="w-[52px] h-[52px] mr-4">
            <AvatarImage
              src={`https://ipfs.io/ipfs/${_group.image}`}
              alt={_group.name}
            />

            <AvatarFallback className="relative">
              <Image
                src="/images/connectfast.png"
                alt="no-item"
                fill={true}
                className="object-contain bg-no-repeat"
              />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="truncate">
          <div className="mb-2 truncate text-title_m">{_group.name}</div>
          <div className="text-label_m text-text-secondary">
            {lang.interface.group_type[_group.type]}
          </div>
        </div>

        <div className="grow" />

        {useChevron && (
          <div>
            <ChevronRight className="text-icon-secondary" />
          </div>
        )}
      </div>
    );
  }
);

RequestGroupListItem.displayName = "RequestGroupListItem";

export default RequestGroupListItem;

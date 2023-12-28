"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

export interface NFTItem {
  contract: string;
  id: string;
  tokenId: number;
  achievement: {
    tokenId: number;
    group: {
      id: any;
      addr: string;
    };
  };
  group: {
    id: any;
    addr: string;
  };
  metadata: {
    name: string;
    image: string;
    category: string;
    description: string;
    attributes: {
      trait_type: string;
      value: string;
    }[];
  };
}

interface NftListItemProps {
  showSelect?: boolean;
  selected?: boolean;
  item: NFTItem;
}

export default function NftListItem({
  showSelect,
  selected,
  item,
}: NftListItemProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const DEFAULT_IPFS_URL = "https://ipfs.io/ipfs/";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function removeIPFSPrefix(url: string): string {
    return url.startsWith(DEFAULT_IPFS_URL)
      ? url.substring(DEFAULT_IPFS_URL.length)
      : url;
  }

  const avatarAttribute = item.metadata.attributes?.find(
    (attr) => attr.trait_type === "avatar"
  );

  return (
    <section className="w-full p-0 border rounded-md shadow-custom bg-background-layer-1">
      <div className="relative object-scale-down w-full m-0 aspect-square ">
        {showSelect && avatarAttribute && (
          <Switch
            className="absolute z-10 text-white cursor-pointer top-5 right-5 hover:text-text-primary"
            checked={selected}
            onCheckedChange={() => {
              router.push(
                pathname +
                  "?" +
                  createQueryString(
                    avatarAttribute.value,
                    removeIPFSPrefix(item.metadata.image)
                  )
              );
            }}
          />
        )}
        <Image
          src={
            item.metadata.image
              ? DEFAULT_IPFS_URL + item.metadata.image
              : DEFAULT_IPFS_URL +
                "bafkreigodckc2cne7l6kcirr7hzzcpa7q7yes7xj72wl7t4lb44xfx4r7e"
          }
          alt="nft_list_item"
          className="object-scale-down rounded-t-sm bg-gradient-to-b from-blue-500 to-green-300"
          fill={true}
          priority={true}
        />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="text-left text-title_l">
          {item.metadata.name || "undefined"}
        </div>

        {/* <Link 
          className="font-medium text-center capitalize truncate text-text-primary text-ellipsis hover:text-green-800 " 
          href={`/nft/${item.achievement ? item.achievement?.group?.addr : item.group.id}/${item.achievement ? item.achievement.tokenId.toString() : item.tokenId.toString()}`}
          >
          {item.metadata.name || "undefined"}
        </Link> */}

        <div className="flex">
          <Badge
            variant="info"
            className="flex justify-center px-2.5 py-2 rounded-[5px] capitalize"
          >
            {item.metadata.category || "not found"}
          </Badge>
        </div>
      </div>
    </section>
  );
}

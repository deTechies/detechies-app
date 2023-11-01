"use client"
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
      addr:string;
    };
  }
  group: {
    id: any;
    addr:string;
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
  item
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
    return url.startsWith(DEFAULT_IPFS_URL) ? url.substring(DEFAULT_IPFS_URL.length) : url;
  }
  console.log(item)
  const avatarAttribute = item.metadata?.attributes?.find(attr => attr.trait_type === "avatar");

  return (
    <section className="rounded-sm shadow-custom bg-background-layer-1 p-0 min-w-[150px] max-w-[200px] border">
      <div className="w-full aspect-square relative m-0 object-scale-down ">
        {showSelect && avatarAttribute && (
          <Switch
            className="absolute top-5 right-5 z-10 text-white hover:text-text-primary cursor-pointer"
            checked={selected}
            onCheckedChange={() => {
              router.push(pathname + '?' + createQueryString(avatarAttribute.value, removeIPFSPrefix(item.metadata.image)));
            }}
          />
        )}
        <Image
          src={item.metadata.image ? DEFAULT_IPFS_URL + item.metadata.image : DEFAULT_IPFS_URL + "bafkreigodckc2cne7l6kcirr7hzzcpa7q7yes7xj72wl7t4lb44xfx4r7e"}
          alt="nft_list_item"
          className="object-scale-down rounded-t-sm bg-gradient-to-b from-blue-500 to-green-300"
          fill={true}
          priority={true}
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Link 
          className="truncate text-text-primary font-medium text-center capitalize text-ellipsis hover:text-green-800 " 
          href={`/nft/${item.achievement ? item.achievement?.group?.addr : item.group.id}/${item.achievement ? item.achievement.tokenId.toString() : item.tokenId.toString()}`}
          >
          {item.metadata.name || "undefined"}
        </Link>
        <Badge variant="info" className="flex justify-center text-sm py-2 text-center capitalize">{item.metadata.category || "not found"}</Badge>
      </div>
    </section>
  );
}

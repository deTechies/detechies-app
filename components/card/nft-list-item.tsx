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
  name: string;
  image: string;
  avatar: string;
  description: string;
  category: string;
  nft_type: string;
  type?: "awards" | "edu";
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

  const avatarAttribute = item.metadata?.attributes?.find(
    (attr) => attr.trait_type === "avatar"
  );

  // console.log(item);

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
                    removeIPFSPrefix(item.image)
                  )
              );
            }}
          />
        )}
        <Image
          src={
            item.image
              ? DEFAULT_IPFS_URL + item.image
              : DEFAULT_IPFS_URL + item.avatar
          }
          alt="nft_list_item"
          className="object-scale-down rounded-t-sm bg-gradient-to-b from-blue-500 to-green-300"
          fill={true}
          priority={true}
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-3 p-5">
        <div className="flex justify-between w-full">
          <span className="capitalize truncate text-title_l">
            {item?.name || "undefined"}
          </span>
        </div>
        {/* <Link className="capitalize truncate text-title_l" href="#">
          {item?.name || "undefined"}
        </Link> */}

        <div className="flex flex-wrap gap-2">
          <Badge variant="info" shape="category">
            {item.nft_type == "sbt"
              ? "커리어 NFT"
              : item.nft_type == "erc721"
              ? "한정판 NFT"
              : "not found"}
          </Badge>

          {
            item?.avatar && <Badge variant="warning" shape="category">아바타</Badge>
          }
        </div>
      </div>
    </section>
  );
}

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
  name:string;
  image: string;
  description:string;
  category:string;
  nft_type:string;
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

  const avatarAttribute = item.metadata?.attributes?.find(attr => attr.trait_type === "avatar");

  return (
    <section className="w-full p-0 border rounded-md shadow-custom bg-background-layer-1">
      <div className="relative object-scale-down w-full m-0 aspect-square ">
        {showSelect && avatarAttribute && (
          <Switch
            className="absolute z-10 text-white cursor-pointer top-5 right-5 hover:text-text-primary"
            checked={selected}
            onCheckedChange={() => {
              router.push(pathname + '?' + createQueryString(avatarAttribute.value, removeIPFSPrefix(item.image)));
            }}
          />
        )}
        <Image
          src={item.image ? DEFAULT_IPFS_URL + item.image : DEFAULT_IPFS_URL + "bafkreigodckc2cne7l6kcirr7hzzcpa7q7yes7xj72wl7t4lb44xfx4r7e"}
          alt="nft_list_item"
          className="object-scale-down rounded-t-sm bg-gradient-to-b from-blue-500 to-green-300"
          fill={true}
          priority={true}
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-3 p-5">
        <Link 
          className="capitalize truncate text-title_l" 
          href="#"
        >
          {item?.name || "undefined"}
        </Link>
        <Badge variant="info" className="flex justify-center py-2 uppercase">{item.nft_type || "not found"}</Badge>
      </div>
    </section>
  );
}

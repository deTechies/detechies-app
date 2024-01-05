"use client";
import { Achievement } from "@/lib/interfaces";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

interface NftListItemProps {
  showSelect?: boolean;
  selected?: boolean;
  item: Achievement;
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


  

  // console.log(item);

  return (
    <section className="w-full p-0 border rounded-md shadow-custom bg-background-layer-1">
      <div className="relative object-scale-down w-full m-0 aspect-square ">
        {showSelect && item.avatar_type && (
          <Switch
            className="absolute z-10 text-white cursor-pointer top-5 right-5 hover:text-text-primary"
            checked={selected}
            onCheckedChange={() => {
              router.push(
                pathname +
                  "?" +
                  createQueryString(
                    item.avatar_type ? item.avatar_type : "",
                    removeIPFSPrefix(item.avatar)
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

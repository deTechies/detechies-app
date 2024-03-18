"use client";
import { Achievement } from "@/lib/interfaces";
// import Image from "next/image";
import Image from "@/components/ui/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import AchievementChips from "../extra/achievement-chips";
import { Switch } from "../ui/switch";

interface NftListItemProps {
  showSelect?: boolean;
  selected?: boolean;
  item: Achievement;
  lang?: any;
}

export default function NftListItem({
  showSelect,
  selected,
  item,
  lang,
}: NftListItemProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const DEFAULT_IPFS_URL = "https://ipfs.io/ipfs/";

  const isSelected = item.avatar_type
    ? searchParams.get(item?.avatar_type) === item.avatar
    : false;

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

  return (
    <section className="w-full p-0 border border-border-div rounded-md shadow-custom bg-background-layer-1">
      <div className="relative object-scale-down w-full m-0 aspect-square ">
        {showSelect && item.avatar_type && (
          <Switch
            className="absolute z-10 text-white cursor-pointer top-5 right-5 hover:text-text-primary"
            checked={isSelected}
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
            onClick={(event) => event.stopPropagation()}
          />
        )}
        <Image
          src={
            item.image
              ? DEFAULT_IPFS_URL + item.image
              : DEFAULT_IPFS_URL + item.avatar
          }
          alt="nft_list_item"
          className="object-contain rounded-t-md bg-[url('/images/bg-nft.png')] bg-[length:232px_232px]"
          fill={true}
          sizes="200px"
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-3 p-5">
        <div className="flex justify-between w-full">
          <span className="capitalize truncate text-title_m">
            {item?.name || "undefined"}
          </span>
        </div>
        {/* <Link className="capitalize truncate text-title_l" href="#">
          {item?.name || "undefined"}
        </Link> */}

        <AchievementChips
          achievements={item}
          limit={2}
          truncate={true}
        />
      </div>
    </section>
  );
}

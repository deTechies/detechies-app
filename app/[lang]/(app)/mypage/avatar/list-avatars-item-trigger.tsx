"use client";
import { Achievement } from "@/lib/interfaces";
// import Image from "next/image";
import Image from "@/components/ui/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {DEFAULT_IPFS_URL} from "@/lib/constants";

interface IListAvatarItemTriggerProps {
  showSelect?: boolean;
  selected?: boolean;
  item: Achievement;
  lang?: any;
}

interface INftTypeChipProps{
  label: string,
  theme: "warning" | "info"
}

export default function ListAvatarItemTrigger({
  showSelect,
  selected,
  item,
  lang,
}: IListAvatarItemTriggerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isSelected = item.avatar_type ? searchParams.get(item?.avatar_type) === item.avatar : false;

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
    <section className="w-[174px] p-0 border border-inherit rounded-xl shadow-custom">
      <div className="relative object-scale-down w-full m-0 aspect-square rounded-t-xl">
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
          />
        )}
        <Image
          src={
            item.image
              ? DEFAULT_IPFS_URL + item.image
              : DEFAULT_IPFS_URL + item.avatar
          }
          alt="nft_list_item"
          className="object-contain rounded-t-xl !bg-background-layer-2"
          fill={true}
          priority={true}
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-3 pt-2 px-3 pb-3 bg-background-layer-1 rounded-b-xl">
        <div className="flex justify-between w-full">
          <span className="capitalize truncate text-title_s">
            {item?.name || "undefined"}
          </span>
        </div>
        {/* <Link className="capitalize truncate text-title_l" href="#">
          {item?.name || "undefined"}
        </Link> */}

        <div className="flex flex-wrap gap-2 bg-background-layer-1">
          <NftTypeChip label={
            lang && item.nft_type
              ? lang.interface.nft_type[item.nft_type]
              : "No Type"}
              theme="info"
            />



          {item?.avatar && (
            <NftTypeChip label={lang.interface.nft_image_type.avatar} theme="warning"/>
          )}
        </div>
      </div>
    </section>
  );
}



function NftTypeChip({label, theme}:INftTypeChipProps){
  return(
    <div className={`relative grid select-none items-center whitespace-nowrap rounded-full ${theme == "info" ? "bg-state-warning-secondary" : "bg-state-info-secondary"} py-1 px-2 font-sans text-xs font-normal uppercase`}>
      <span>{label}</span>
    </div>
  )
}


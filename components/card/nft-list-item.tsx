"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

export default function NftListItem({
  ipfs,
  onSelect,
  showSelect,
  selected,
  item
}: {
  ipfs?: string;
  onSelect?: (selectedIpfs: string) => void;
  showSelect?: boolean;
  selected?: boolean;
  item?: any;
}) {
  const searchParams = useSearchParams()!
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  
  console.log(item);
  
  function removeIPFSPrefix(url: string): string {
    const prefix = "https://ipfs.io/ipfs/";
    if (url.startsWith(prefix)) {
        return url.substring(prefix.length);
    }
    return url;
}


 
  //if select is pressed we want to add it to the search params how to do that 
  return (
    <div
      className={`rounded-sm shadow-custom bg-background-layer-1 p-0 min-w-[150px] my-4 `}
    >
      <div className="w-full aspect-square relative m-0 bg-red">
        {showSelect && (
           <Switch
           className="absolute top-5 right-5 z-10 text-white hover:text-black cursor-pointer"
           checked={selected}
           onCheckedChange={() => {
             router.push(pathname + '?' + createQueryString("jacket", removeIPFSPrefix(item?.nft?.metadata?.image)))
           }}
         />
        )}
       
        <Image
          src={`${
            item?.metadata?.image ? item?.metadata?.image : (
            item?.nft?.metadata?.image  ? 'https://ipfs.io/ipfs/' + removeIPFSPrefix(item?.nft?.metadata?.image) : "https://ipfs.io/ipfs/bafkreigodckc2cne7l6kcirr7hzzcpa7q7yes7xj72wl7t4lb44xfx4r7e")
          }`}
          alt="nft_list_item"
          className="object-scale-down rounded-t-sm bg-gradient-to-b from-blue-500 to-green-300"
          fill={true}
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Link className="truncate text-primary text-center hover:text-green-800 font-medium" href={`/nft/${item.contract}/${item.tokenId}`}>{item?.name ? item.name : item.metadata?.name}</Link>
        <Badge color="green">{item.category ? item.category : item.metadata?.category}</Badge>
      </div>
    </div>
  );
}

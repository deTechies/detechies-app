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
  group:{
    id: any;
  }
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
  
  
  function removeIPFSPrefix(url: string): string {
    const prefix = "https://ipfs.io/ipfs/";
    if (url.startsWith(prefix)) {
        return url.substring(prefix.length);
    }
    return url;
}

const hasAvatarAttribute = item.metadata?.attributes?.some(attr => attr.trait_type === "avatar");
const avatarAttribute = item.metadata?.attributes?.find(attr => attr.trait_type === "avatar");


 
  //if select is pressed we want to add it to the search params how to do that 
  return (
    <section
      className={`rounded-sm shadow-custom bg-background-layer-1 p-0 min-w-[150px] max-w-[200px] border `}
      
    >
      <div className="w-full aspect-square relative m-0 object-scale-down ">
        {hasAvatarAttribute && avatarAttribute && (
           <Switch
           className="absolute top-5 right-5 z-10 text-white hover:text-text-primary cursor-pointer"
           checked={selected}
           onCheckedChange={() => {
             router.push(pathname + '?' + createQueryString(avatarAttribute.value, removeIPFSPrefix(item?.metadata?.image)))
           }}
         />
        )}
       
        <Image
          src={`${item?.metadata.image ? 'https://ipfs.io/ipfs/'+item.metadata.image : "https://ipfs.io/ipfs/bafkreigodckc2cne7l6kcirr7hzzcpa7q7yes7xj72wl7t4lb44xfx4r7e" }`}
          alt="nft_list_item"
          className="object-scale-down rounded-t-sm bg-gradient-to-b from-blue-500 to-green-300"
          fill={true}
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Link className="truncate text-text-primary text-center text-ellipsis hover:text-green-800 " href={`/nft/${item.group?.id}/${item.id}`}>
         {item?.metadata.name ? item.metadata.name : "undefined"}
        </Link>
        <Badge variant="info">{item.metadata.category ? item.metadata.category : "not found"}</Badge>
      </div>
    </section>
    
    
  );
}



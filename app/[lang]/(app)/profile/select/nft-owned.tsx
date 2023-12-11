"use client"


import NftListItem from "@/components/card/nft-list-item";

type NftItem = {
  name: string;
  image: string;
  description: string;
};
export default function NftOwned({ address, status, avatar }: { address: any, status?:string, avatar?: string[] }) {
  
  const nfts = [] as NftItem[];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {nfts.length > 0 ? (nfts.map((item: any, index: number) => (
        <NftListItem key={index} item={item} selected={avatar?.includes(item.cid)} showSelect={true} />
      ))): (<div>No items found</div>)}
    </div>
  );
}

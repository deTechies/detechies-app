import { useEffect, useState } from "react";


import NftListItem from "@/components/card/nft-list-item";
import NftListItemLoading from "@/components/card/nft-list-item-loading";

type NftItem = {
  name: string;
  image: string;
  description: string;
};
export default function NftOwned({ address, status, avatar }: { address: any, status?:string, avatar?: string[] }) {
  const [nfts, setNfts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAll = async () => {
      setLoading(true)
      const url = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
      if(status == "minting"){
        const result = await fetch(url + `/polybase/nft/minting/${address}`).then((res) =>
        res.json()
      );
      console.log(result);
      setNfts(result);

      }else{
      
      const result = await fetch(url + `/nft/all/${address}`).then((res) =>
        res.json()
      );
      console.log(result);
      setNfts(result);
      
      }
      setLoading(false);
    };
    getAll();
  }, [address, status, avatar]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <NftListItemLoading />
        <NftListItemLoading />
        <NftListItemLoading />
        <NftListItemLoading />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {nfts.length > 0 ? (nfts.map((item: any, index: number) => (
        <NftListItem key={index} item={item} selected={avatar?.includes(item.cid)} showSelect={true} />
      ))): (<div>No items found</div>)}
    </div>
  );
}


import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProfileNFTItem from "./profile-nft-item";


export default function ProfileItems({
  items,
  name,
}: {
  items: any[];
  name: string;
}) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2>{name}</h2>
        <Badge className="text-primary">
        <Link className="flex gap-2 text-sm rounded-md  items-center" href={`/profile/mint?category=${name}`}>
          Add <Plus size={16} className=""/>
        </Link>
        </Badge>
       
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item: any, index: number) => (
              <ProfileNFTItem key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="mx-auto w-full gap-2 items-center flex flex-col">
            <Image
              src="/images/icons/no-item.png"
              alt="no-item"
              width={64}
              height={64}
            />
            <p className="text-center text-primary font-medium">No items for {name} </p>
            <Link href="/profile/mint" className="font-semibold bg-accent-secondary text-accent-primary leading-[18px] p-3 rounded-full px-12">Get a Career NFT</Link>

          </div>
        )}
      </CardContent>
    </Card>
  );
}

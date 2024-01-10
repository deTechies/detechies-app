"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from 'next/image';

export default function AvatarNFTs({nfts}: {nfts: string[]}) {
    
    if(!nfts) return null;
  return (
    <Card>
        <CardHeader>
            Avatar NFTs
        </CardHeader>
        <CardContent>
            {
                nfts.length > 0 && 
                <div className="flex gap-4 flex-wrap">
                    {
                        nfts.map((nft: string, index: any) => (
                            <div key={index}>
                                <Image 
                                    src={`https://ipfs.io/ipfs/${nft}`} 
                                    className="rounded-sm bg-gray-100 w-16 h-16" 
                                    width={80}
                                    height={80}
                                    alt="avatar nft"
                                    />
                            </div>
                        ))
                    }
                </div>
        }        
        </CardContent>
    </Card>
  )
}

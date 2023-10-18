"use client";

import { NFTItem } from "@/components/card/nft-list-item";
import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useFetchData from "@/lib/useFetchData";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function NFTDetailPage() {
  //want the read the token uri and display the content.
  //want to read the token id and display the content.
  const {tokenid, contract} = useParams();
  const [details, setDetails] = useState<any>();
const router = useRouter();
  
  const {data, loading, error} = useFetchData<NFTItem>(`/achievement/getSingle/${contract}/${tokenid}`);
  
  if(loading) return <Loading />
  
  if(error) return <div>Error</div>

  return (
    <main className="flex items-center justify-center my-8">
      {!data ? (
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold">No data bro</span>
        </div>
      ) : (
        <Card className="max-w-[500px] min-w-[400px] m-4">
          <CardHeader className="flex justify-between items-center">
            {data.metadata?.name}

            <Share2
              size={24}
              className="text-black hover:text-green-400 cursor-pointer"
              onClick={() => {
                console.log("popup shre modal");
              }}
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div
                className={`aspect-square w-full flex items-center justify-center relative rounded-sm`}
              >
                <Image
                  src={`https://ipfs.io/ipfs/${data.metadata?.image}`}
                  alt="Uploaded Content"
                  className="max-w-full max-h-full block object-scale-down rounded-md bg-gray-100"
                  fill={true}
                />
              </div>
              <div className="flex justify-between">
                <Badge color="green">
                  <span className="truncate">{data.metadata?.category}</span>
                </Badge>
              </div>

            <table className="table bg-black-100 rounded-sm p-2 w-fit">
                  {data.metadata && Object.entries(data.metadata).map(([key, value], index) => (
                    <tr className="flex justify-between p-1 px-3 my-2" key={index} >
                      <td className="text-black-300 text-sm">{key}</td>
                      <td className="text-black text-sm truncate overflow-auto">{value?.toString()}</td>
                    </tr>
                  ))}
                </table>
                
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="secondary" onClick={() => router.back()}>
                        Go back
                    </Button>
                    <Button>
                        Request mint
                    </Button>
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}

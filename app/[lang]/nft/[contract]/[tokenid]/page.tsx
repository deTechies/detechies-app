"use client";

import { NFTItem } from "@/components/card/nft-list-item";
import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";
import useFetchData from "@/lib/useFetchData";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function NFTDetailPage() {
  //want the read the token uri and display the content.
  //want to read the token id and display the content.
  const { tokenid, contract } = useParams();
  const [details, setDetails] = useState<any>();
  const [requesting, setRequesting] = useState<boolean>(false);
  const { address } = useAccount();
  const router = useRouter();

  const { data, loading, error } = useFetchData<NFTItem>(
    `/achievement/getSingle/${contract}/${tokenid}`
  );

  if (loading) return <Loading />;

  if (error) return <div>Error</div>;

  const handleMint = async () => {
    //@ts-ignore
    setRequesting(true);
    const submitData = {
      contract: contract,
      tokenId: tokenid,
      type: "individual",
      data: [""],
      requester: address,
      tokenbound: address,
    };

    if (
      !submitData.contract ||
      !submitData.tokenId ||
      !submitData.data ||
      !submitData.requester ||
      !submitData.tokenbound
    ) {
      toast({
        title: "Something went wrong with submitting the data",
        description:
          "Please contact the admins to see if there is an issue with the contract",
      });
      console.log(submitData);

      return;
    }

    await fetch(`${API_URL}/achievement/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          toast({
            title: "Success",
            description: "Your request has been submitted",
          });
          router.replace(`/group/${contract}`);
        } else {
          console.error("Error creating profile:", data.message);
          toast({
            title: "Something went wrong with submitting the data",
            description:
              "Please contact the admins to see if there is an issue with the contract",
          });
        }
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
        toast({
          title: "Something went wrong with submitting the data",
          description:
            "Please contact the admins to see if there is an issue with the contract",
        });
      });

    setRequesting(false);
  };

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
              className="text-text-secondary hover:text-green-400 cursor-pointer"
              onClick={() => {
                console.log("popup shre modal");
              }}
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-8">
              <div
                className={`aspect-square flex items-center object-fit justify-center relative rounded-md`}
              >
                <Image
                  src={`https://ipfs.io/ipfs/${data.metadata?.image}`}
                  alt="Uploaded Content"
                  fill={true}
                  className="rounded-md shadow-md"
                />
              </div>
              <div className="flex w-full">
                <Badge
                  variant={"info"}
                  className="w-full text-md justify-center capitalize text-center outline outline-state-info"
                >
                  <span className="truncate">{data.metadata?.category}</span>
                </Badge>
              </div>

              <p className="text-text-secondary">
                {data.metadata?.description}
              </p>

              <div className="bg-black-100 rounded-sm p-2 shadow-sm">
                {data.metadata &&
                  Object.entries(data.metadata).map(([key, value], index) => (
                    <tr
                      className="flex  justify-between p-1 px-2 gap-2 my-2"
                      key={index}
                    >
                      <td className="text-text-secondary text-light text-sm capitalize">
                        {key}
                      </td>
                      <td className="text-primary text-sm text-ellipsis overflow-hidden">
                        {value?.toString()}
                      </td>
                    </tr>
                  ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="secondary" onClick={() => router.back()}>
                  Go back
                </Button>
                <Button
                  onClick={handleMint}
                  loading={requesting}
                  disabled={requesting}
                >
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

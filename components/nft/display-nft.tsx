import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { ABI, API_URL } from "@/lib/constants";
import Image from "next/image";
import { Address, useContractWrite } from "wagmi";
import NftListItem, { NFTItem } from "../card/nft-list-item";
import TransactionData from "../screens/transaction-data";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
export default function DisplayNFT( details : NFTItem) {
  
  
  const { write, isLoading, error, data } = useContractWrite({
    address: details.contract as Address,
    abi: ABI.group,
    functionName: "distributeAchievement",
  });

  const mintNFT = async () => {
    //in here we want to have the profile.id

    if (!details) {
      toast({
        title: "Error minting ",
        description:
          "You have provided an invalid address, please check if the user still exists",
        variant: "destructive",
      });
    }

    await fetch(
      `${API_URL}/polybase/nft/accepted/${details.id}`,
      {}
    ).then((res) => {
      console.log(res)
    })
    .catch((err: Error) => console.log(err));


    
    //await write({ args: [details.id, details, 1] });
    
   

    //await write();
  };
  return (
    <Dialog>
      <DialogTrigger>
        <NftListItem item={details} />
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center space-x-2 space-y-4 my-4">
          <div className="relative aspect-square  rounded-sm object-scale-down w-[400px]">
            <Image
              src={`https://ipfs.io/ipfs/${details.metadata.image}`}
              alt={details.metadata.name}
              fill={true}
              className="rounded-sm shadow-md"
            />
          </div>
          <div className="bg-black-100 rounded-sm p-2 shadow-sm max-w-md">
            {details.metadata &&
              Object.entries(details.metadata).map(([key, value], index) => (
                <dl
                  className="grid grid-cols-4 justify-between p-1 px-2 gap-2 my-2"
                  key={index}
                >
                  <dd className="text-text-secondary font-light text-sm capitalize">
                    {key}
                  </dd>
                  <dd className="col-span-3 text-primary text-sm overflow-auto text-right text-clip">
                    {value?.toString()}
                  </dd>
                </dl>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Button variant={"secondary"}>Cancel</Button>
          <Button
            onClick={() => mintNFT()}
          >Reward </Button>
        </div>
      </DialogContent>
      <TransactionData hash={data?.hash} />
    </Dialog>
  );
}

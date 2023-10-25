"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Image from "next/image";
import { NFTItem } from "../card/nft-list-item";
import { Button } from "../ui/button";


export default function ListItemNFT({details}: {details: NFTItem}) {
  return (
    <Dialog>
      <DialogTrigger>
        <section className="flex gap-4 rounded-sm hover:bg-background-layer-2 cursor-pointer">
          <div className="aspect-square w-24 h-24 relative object-scale rounded-sm bg-gradient-to-b from-state-info to-accent-secondary">
            <Image
              src={`https://ipfs.io/ipfs/${details.metadata?.image}`}
              alt={details.metadata?.name}
              fill={true}
              className="rounded-sm shadow-md"
            />
          </div>
          <div className="flex flex-col justify-evenly text-left">
            <h5 className="font-medium">{details.metadata?.name}</h5>
            <span className="text-text-primary text-sm capitalize font-light">
             Sender opf NFT
            </span>
            <span className="text-text-secondary text-sm font-light">
              {" "}
              4 days ago
            </span>
          </div>
        </section>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center space-x-2 space-y-4 my-4 overflow-scroll max-h-[100vh]">
          <div className="relative aspect-square  rounded-sm object-scale-down bg-gradient-to-b from-state-info to-accent-secondary w-[200px] my-4">
            <Image
              src={`https://ipfs.io/ipfs/${details.metadata?.image}`}
              alt={details.metadata?.name}
              fill={true}
              className="rounded-sm shadow-md"
            />
          </div>
          <div className="bg-black-100 rounded-sm p-2 shadow-sm max-w-md  max-h-[20vh] overflow-auto">
            {details.metadata &&
              Object.entries(details.metadata).map(
                ([key, value], index) => (
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
                )
              )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Button variant={"secondary"}>Show Details</Button>

        </div>
      </DialogContent>
    </Dialog>
  )
}

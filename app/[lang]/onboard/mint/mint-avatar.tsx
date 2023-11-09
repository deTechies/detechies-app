"use client";
// components/MintAvatar.js
import TransactionData from "@/components/screens/transaction-data";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { toast } from "@/components/ui/use-toast";
import AuthenticateButton from "@/components/user/authenticate-button";
import { checkTBA, updateTBA } from "@/lib/data/user";
import { useAvatarData } from "@/lib/hooks/avatar/readMint";
import { useMint } from "@/lib/hooks/avatar/useMint";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { isAddress } from 'viem';
import Confetti from "./confetti";
export default function MintAvatar() {
  const { data, tba } = useAvatarData();
  const { minting, mint, isLoading, mintingStatus, finished } = useMint();
  const {data:session} = useSession();

  useEffect(() => {
    
    const updateAccount = async () => {
      if (data && (parseInt(data?.toString()) > 0) ) {
        const checkResult = await checkTBA();
        if(!tba){return;}
        if (isAddress(tba.toString()) && !isAddress(checkResult.message.TBA)) {
          const updateResult = await updateTBA(tba);
          //sign out the user 
          
          toast({ title: "succesfully added the TBA" });
          signOut()
        }
      }
    };
    if(data){
      updateAccount();
    }
    
    if(finished){
      updateAccount();
      //now we need to get a tba account here so we can use it directly to update. 
      
    }
  }, [data, tba, finished]);

  if (parseInt(data) > 0 || finished) {
    return (
      <section className="flex flex-col gap-4">
        <div className="w-full aspect-square relative m-0 z-0">
          <IPFSImageLayer hashes={defaultAvatar} />
        </div>
        <h1 className="text-3xl font-bold">NFT Career Profile is ready</h1>
        <p className="text-sm tracking-wide leading-5 text-text-secondary">
          Congratulations!! Your NFT Account has been created successfully, and
          you have received some NFTs. You can collect career NFTs on My Page.
        </p>
        <div className="flex gap-4">
          {
            tba && session?.web3.user.TBA && !isAddress(session.web3.user.TBA)  ? (
                <AuthenticateButton />
            ): (
              <>
              <Link
              href="/profiles"
              className="w-full py-3 rounded-md bg-button-secondary text-primary text-center"
            >
              Browse Builders
            </Link>
            <Link
              href="/profile"
              className="w-full py-3 rounded-md bg-accent-secondary text-accent-on-secondary text-center"
            >
              View my Profile
            </Link>
            </>
            )
          }
       
        </div>
        <section className="z-10">
          <h1 className="font-semibold mb-2 ml-2">NFT received</h1>
          <div className="text-center text-light text-secondary justify-evenly flex flex-wrap gap-4 border border-border-div rounded-sm p-3">
            {defaultAvatar.map((nft: string, index: any) => (
              <div key={index}>
                <Image
                  src={`https://ipfs.io/ipfs/${nft}`}
                  className="rounded-sm bg-button-secondary w-16 h-16"
                  width={80}
                  height={80}
                  alt="avatar nft"
                />
              </div>
            ))}
          </div>
        </section>
        <Confetti
          count={16}
          images={[
            "/confetti/confetti1.png",
            "/confetti/confetti2.png",
            "/confetti/confetti3.png",
            "/confetti/confetti4.png",
          ]}
        />
      </section>
    );
  }

  return (
    <div>
      <CardHeader className="flex flex-col gap-4 z-10">
        <h1 className="text-2xl">Get Digital Career Profile</h1>
        <p className="text-sm tracking-wide font-light leading-5 text-text-secondary">
          To start your career, we will give you a free career profile and some
          free credits to look around.
        </p>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-4">
          <div className="w-full aspect-square border rounded-md relative m-0 z-0">
            <IPFSImageLayer hashes={defaultAvatar} />
          </div>
          <section className="">
            <h1 className="font-semibold mb-2 ml-2">Gifted Profile Items</h1>
            <div className="text-center text-light text-secondary justify-evenly flex flex-wrap gap-4 border border-border-div rounded-sm p-3">
              {defaultAvatar.map((nft: string, index: any) => (
                <div key={index}>
                  <Image
                    src={`https://ipfs.io/ipfs/${nft}`}
                    className="rounded-sm bg-button-secondary w-16 h-16"
                    width={80}
                    height={80}
                    alt="avatar nft"
                  />
                </div>
              ))}
            </div>
          </section>
          <Button
            disabled={isLoading}
            onClick={() => {
              mint();
            }}
          >
            {isLoading || minting ? (
              <span className="flex gap-2">
                <RefreshCw className="animate-spin" /> Minting..
              </span>
            ) : data && parseInt(data?.toString()) > 0 ? (
              "You already have a profile"
            ) : (
              "Mint"
            )}
          </Button>
        </section>
      </CardContent>
      <TransactionData hash={mintingStatus?.hash} />
    </div>
  );
}

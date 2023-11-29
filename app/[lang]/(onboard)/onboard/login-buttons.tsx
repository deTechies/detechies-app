"use client";
import AuthenticateButton from "@/components/user/authenticate-button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export default function LoginButtons() {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();
  const { data: session } = useSession();

  useEffect(() => {
    //check if user is signed in

    if (session && address == session.web3?.address) {
      
      //check if there is a user profile 
      
      if(session.web3?.user?.TBA){
        window.location.href = "/profile";
      }
      //if not, redirect to onboard/mint
      if(!session.web3?.user?.verified){
        window.location.href = "/onboard/profile";
      }
      window.location.href = "/onboard/email";
    }
    console.log(session)
    console.log(address)
  }, [address, session]);

  const handleConnect = (connector: any) => {
    connect({ connector });
  };

  if (address && session?.web3?.address != address) {
    return (
      <div>
        <AuthenticateButton />
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-1 gap-4">
      <div
        key={connectors[0].id}
        className="text-lg bg-accent-secondary text-accent-primary rounded-sm px-6 py-5 flex gap-6 hover:outline hover:outline-accent-primary items-center cursor-pointer"
        onClick={() => handleConnect(connectors[1])}
      >
        <Image
          src={`/icons/google.png`}
          height={24}
          width={24}
          alt={connectors[1].name}
          quality={2}
        />
        <span className="w-full text-center">소셜 계정으로 계속하기</span>
      </div>

      <div
        key={connectors[1].id}
        className="text-lg bg-background-layer-2 font-medium border border-border-div rounded-sm px-6 py-4 flex gap-6 hover:border-orange-500 items-center cursor-pointer"
        onClick={() => handleConnect(connectors[0])}
      >
        <Image
          src={`/icons/browser.png`}
          height={24}
          width={24}
          alt={connectors[0].name}
        />
        <span className="w-full text-center text-text-primary">
          메타마스크 지갑
        </span>
      </div>
    </div>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";

export default function Onboarding() {
  const { connect, connectors } = useConnect();
  const {address, isConnecting} = useAccount();
  
  if(address) {
    return (
      <Card className="max-w-lg">
        <CardContent>
          {address}
          
        </CardContent>
      </Card>  
    )
  } 
  
  if(isConnecting) {
    return (
      <div>
        Connecting...
      </div>  
    )
  }
    
  return (
    <div className="flex flex-col space-y-4 gap-4">
      {connectors.map((connector) => (
        <div
          key={connector.id}
          className="text-lg font-semibold border border-gray-300 rounded-sm px-6 py-4 flex gap-6 hover:bg-gray-200 items-center cursor-pointer"
          onClick={() => connect({ connector })}
        >
          <Image
            src={`/images/icons/` + connector.name.toLocaleLowerCase() + `.png`}
            height={44}
            width={44}
            alt={connector.name}
          />
          {connector.name == "Web3Auth" ? "Social Login" : connector.name}
        </div>
      ))}
    </div>
  );
};

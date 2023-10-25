"use client"
import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useEthersSigner } from "./utils";

// 1. Create a PushContext
export const PushContext = createContext<PushAPI | null>(null);

// 2. Create a UserProvider component
export default function PushProvider({ children }: { children: any }) {
  const [user, setUser] = useState<PushAPI | null>(null);
  const {address, isConnected, isDisconnected} = useAccount();
  const signer = useEthersSigner({chainId: 8001});
  const router = useRouter();
  useEffect(() => {

    const initializeUser = async () => {
      
      //now we want to do that here... 
      if(!signer) return;
      try {
        console.log("initializing user")
        const initializedUser = await PushAPI.initialize(signer, {
          env: ENV.STAGING,
        });
        

    

        setUser(initializedUser);

      }catch(err){
        console.log(err)
      }

 

    };
    if (signer && isConnected) {
      initializeUser();
    }
    
    if(isDisconnected && !address){
      router.push("/onboard")
    }
  }, [signer, address, isConnected, isDisconnected, router]);

  return <PushContext.Provider value={user}>{children}</PushContext.Provider>;
}

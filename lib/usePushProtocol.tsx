"use client"
import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useEthersSigner } from "./utils";

// 1. Create a PushContext that also provides an initialization function
export const PushContext = createContext({
  user: null as PushAPI | null,
  initializeUser: async () => {}
});

// 2. Create a PushProvider component
export default function PushProvider({ children }: { children: any }) {
  const [user, setUser] = useState<PushAPI | null>(null);
  const {address, isConnected, isDisconnected} = useAccount();
  const signer = useEthersSigner({chainId: 8001});
  const router = useRouter();
  const {data: session} = useSession();

  const initializeUser = useCallback(async () => {
    if(!signer) return;
    try {
      console.log("initializing user");
      const initializedUser = await PushAPI.initialize(signer, {
        env: ENV.STAGING,
      });
      console.log(initializedUser)
      setUser(initializedUser);
    } catch(err) {
      console.log(err);
    }
  }, [signer]);

  useEffect(() => {
    if(isDisconnected && !address){
      router.push("/onboard");
    }
    
  }, [address, isDisconnected, router]);

  return (
    <PushContext.Provider value={{ user, initializeUser }}>
      {children}
    </PushContext.Provider>
  );
}

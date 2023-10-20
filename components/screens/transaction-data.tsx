"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Address, useWaitForTransaction } from "wagmi";

interface TransactionDataProps {
    hash?: Address;
    redirect?: string;
}

export default function TransactionData({
    hash, 
    redirect
}: TransactionDataProps)  {
    
    const {data, isError, isLoading, isSuccess}  = useWaitForTransaction({
        hash: hash,
    })
    const router = useRouter();
    
    
    useEffect(() => {
      if(isSuccess && redirect){
        router.push(redirect); 
      }
    }, [isSuccess])
    
    
    if(!hash || isSuccess){ return null }
  return (
    <div className="fixed bottom-1 rounded-md h-8 right-[5vw] border-accent-primary p-8 border flex bg-white z-10">
      <div>
        <Loader2 className="animate-spin" size="12"/>
      </div>
      <span className="text-text-secondary text-sm "> 
      Your transaction is being  processed
        With transaction hash of: {hash}
      </span>
    </div>
  )
}

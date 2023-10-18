"use client";
import { Address, useWaitForTransaction } from "wagmi";

interface TransactionDataProps {
    hash?: Address;
}

export default function TransactionData({
    hash
}: TransactionDataProps)  {
    
    const {data, isError, isLoading}  = useWaitForTransaction({
        hash: hash,
    })
    
    if(!hash){ return null }
  return (
    <div className="fixed bottom-1 rounded-md w-[90vw] left-[5vw] border-accent-primary p-8 border text-center bg-white z-10">
      Please wait we are currently processing your transaction
      With transaction hash of: {hash}
    </div>
  )
}

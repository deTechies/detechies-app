"use client";
import Confetti from "@/app/onboard/mint/confetti";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Address, useWaitForTransaction } from "wagmi";
import Loading from "../loading";

interface TransactionDataProps {
  hash?: Address;
  redirect?: string;
}

export default function TransactionData({
  hash,
  redirect,
}: TransactionDataProps) {
  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: hash,
  });
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && redirect) {
      router.push(redirect);
    }
  }, [isSuccess, redirect, router]);
  
  if(isSuccess){
      return <Confetti />
  }

  if (!hash || isSuccess) {
    return null;
  }
  //TODO: fix this code to make it look nice. 
  

  return (
    <div className="">
      <span>
        <Loading />
        <div className="flex flex-col gap-4">
          <h1>Data is being processed</h1>
          <Loading />
          <span>
            {isLoading
              ? "Please wait while we process your transaction"
              : isError
              ? "There was an error processing your transaction"
              : "Your transaction is being processed"}
          </span>
        </div>
      </span>
    </div>
  )
} 

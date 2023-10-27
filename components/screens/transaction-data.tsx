"use client";
import Confetti from "@/app/onboard/mint/confetti";
import { ToastDescription } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Address, useWaitForTransaction } from "wagmi";
import Loading from "../loading";
import { Toast, ToastTitle } from "../ui/toast";

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
  return (
    <Toast>
      <ToastTitle>Your transaction is beign processed</ToastTitle>
      <ToastDescription className="flex flex-col gap-3">
      <div>
        <Loading />
      </div>
      <span className="text-text-secondary text-sm">
        Your transaction is being processed With transaction hash of: {hash}
      </span>
      </ToastDescription>
    </Toast>
  );
}

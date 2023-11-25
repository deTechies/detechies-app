"use client";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    if (isSuccess && redirect) {
      router.push(redirect);
    }

    // Set a timeout to hide the component after a certain time
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000); // 5000 milliseconds or 5 seconds

    return () => {
      clearTimeout(timer); // Clear the timeout if the component unmounts
    };
  }, [isSuccess, redirect, router]);
  

  if (!hash) {
    return null;
  }
  

  if(isSuccess) {
    return (
      <div className={`fixed bottom-5 right-5 border-border-div rounded-md shadow-md bg-background-layer-2 fade-in`}>
        <div className="flex flex-col gap-4">
          <span>
            Transaction processed successfully!
          </span>
          <span>
            Please wait for the transaction to be recognized by and read from the blockchain.
            <Link href={`https://mumbai.polygonscan.com/tx/${hash}`} target="_blank"  className="text-accent"> View your Transaction</Link>
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className={`fixed bottom-5 right-5 border-border-div rounded-md shadow-md bg-background-layer-2 fade-in`}>
    <div className="flex flex-col gap-4">
      <Loading /> {/* Consider a custom animated loader */}
      <span>
        {isLoading
          ? "Processing your transaction..."
          : isError
            ? <button >Retry Transaction</button>
            : "Transaction processed successfully!"}
      </span>
    </div>
  </div>
  )
} 

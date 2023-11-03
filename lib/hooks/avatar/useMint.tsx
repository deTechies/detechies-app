// hooks/useMint.js
import { toast } from "@/components/ui/use-toast";
import { ABI, MUMBAI } from "@/lib/constants";
import { useState } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";

export function useMint() {
  const [minting, setMinting] = useState(false);
  const { write, isLoading, data: mintingStatus } = useContractWrite({
    address: MUMBAI.profile,
    abi: ABI.profile,
    functionName: "mint",
  });

  const waitForTransaction = useWaitForTransaction({
    hash: mintingStatus?.hash,
    onSuccess() {
      toast({ title: "Successfully minted all the items" });
      setMinting(false);
    },
  });

  const mint = () => {
    write();
    setMinting(true);
  };

  return { minting, mint, isLoading, mintingStatus };
}

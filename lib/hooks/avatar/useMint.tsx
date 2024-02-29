// hooks/useMint.js
import { ABI, MUMBAI } from "@/lib/constants";
import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function useMint() {
  const [minting, setMinting] = useState(false);
  const [finished, setFinished] = useState(false);
  const { writeContract, data: mintingStatus } = useWriteContract();

  const waitForTransaction = useWaitForTransactionReceipt({
    hash: mintingStatus,
  });

  const mint = () => {
    writeContract({
      address: MUMBAI.profile,
      abi: ABI.profile,
      functionName: "mint",
      args: [],
    });
    setMinting(true);
  };

  return { minting, mint, mintingStatus, finished };
}

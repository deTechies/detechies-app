// hooks/useMint.js
import { toast } from "@/components/ui/use-toast";
import { ABI } from "@/lib/constants";
import { useState } from "react";
import { Address, useContractWrite, useWaitForTransaction } from "wagmi";

export function useRemoveWork(address: Address) {
  const [active, setActive] = useState(false);
  const [finished, setFinished] = useState(false);
  const { write, isLoading, data, error } = useContractWrite({
    address: address,
    abi: ABI.project,
    functionName: "removeWork",
  });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast({ title: "Transaction has been completed succesfully.." });
      setActive(false);
      setFinished(true);
    },
  });

  const removeWork = (id: number) => {
    write({args: [id]});
    setActive(true);
  };
  
  if(error){
    toast({
        title: "Transaction has failed..",
        description: error.message,
        variant: "destructive",
    })
  }

  return { active, removeWork, isLoading, data, finished };
}

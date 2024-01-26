"use client";

import { Button } from "@/components/ui/button";
import { ABI, MUMBAI } from "@/lib/constants";
import { useEthersSigner } from "@/lib/utils";
import { TokenboundClient } from "@tokenbound/sdk";
import { useEffect, useMemo } from "react";
import { polygonMumbai } from "viem/chains";
import {
    useAccount,
    useContractRead,
    useContractWrite,
    useWaitForTransaction
} from "wagmi";

export default function MintTokenbound() {
  const { write, isSuccess, data } = useContractWrite({
    address: MUMBAI.careerzen,
    abi: ABI.careerzen,
    functionName: "mint",
    args: [],
  });

  const { address } = useAccount();

  const signer = useEthersSigner();

  const { isSuccess: isSuccessTransaction, data: dataTransaction } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  const { data: contractRead } = useContractRead({
    address: MUMBAI.careerzen,
    abi: ABI.careerzen,
    functionName: "balanceOf",
    args: [address],
  }) as any;

  useEffect(() => {
    async function testTokenboundClass() {}

    testTokenboundClass();
  }, [address]);

  const tokenboundClient = useMemo(
    () =>
      new TokenboundClient({
        signer,
        chainId: polygonMumbai.id,
      }),
    [signer]
  );

  console.log(signer);

  const tokenboundAccount = useMemo(
    () =>
      tokenboundClient?.getAccount({
        tokenContract: MUMBAI.careerzen,
        tokenId: "1",
      }),
    [tokenboundClient]
  );
  
  const prepareExecute = async() => {
    
  }

      

  if (parseInt(contractRead) > 0) {
    return (
      <>
        <Button disabled>
          Your account is {tokenboundAccount}
        </Button>
        <Button onClick={prepareExecute}>Transfer value</Button>
      </>
    );
  }

  if (data?.hash && !isSuccessTransaction) {
    return <Button disabled>Waiting for transaction</Button>;
  }

  return <Button onClick={() => write()}>Mint Tokenbound</Button>;
}

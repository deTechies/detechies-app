import { ABI, MUMBAI } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { AvatarData } from "./avatar-types";

// Define a type for the return value of useAvatarData
type UseAvatarDataReturnType = {
  data: AvatarData | any;
  tba: unknown | null;  // Replace 'unknown' with the actual type of 'tba'
  refetch: () => void;
};

export function useAvatarData(): UseAvatarDataReturnType {
  const { address } = useAccount();
  const [data, setData] = useState<AvatarData | any>(null);
  const [tba, setTba] = useState<unknown | null>(null);  // Replace 'unknown' with the actual type of 'tba'

  const { data: balanceData, refetch: refetchBalanceData } = useContractRead({
    address: MUMBAI.profile,
    abi: ABI.profile,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: tbaData, refetch: refetchTbaData } = useContractRead({
    address: MUMBAI.profile,
    abi: ABI.profile,
    functionName: "getTBA",
    args: [address],
  });

  useEffect(() => {
    setData(balanceData);
    setTba(tbaData);
  }, [balanceData, tbaData]);

  const refetch = () => {
    refetchBalanceData();
    refetchTbaData();
  };

  return { data, tba, refetch };
}

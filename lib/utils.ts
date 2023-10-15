import { clsx, type ClassValue } from "clsx";

import { getWalletClient } from '@wagmi/core';
import { providers } from "ethers";
import * as React from 'react';
import { twMerge } from "tailwind-merge";
import { WalletClient } from "viem";
import { useWalletClient } from 'wagmi';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}

export const formatAddress = (addr: string) => {
  return `${addr.substring(0, 8)}...`
}

export function truncateMiddle(input: string, maxLength: number): string {
  // If the input string is shorter than or equal to the maxLength, return the original string
  if (input.length <= maxLength) {
      return input;
  }

  const charsToShow = maxLength - 3; // 3 for the ellipsis
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return input.substr(0, frontChars) + '...' + input.substr(input.length - backChars);
}


/* export function walletClientToSigner(walletClient: any) {
  const ethersWalletClient = {
    getAddress: async (): Promise<`0x${string}`> => {
      return (await walletClient?.account.address) ?? "";
    },
    signMessage: async (message: string): Promise<string> => {
      const signature = await walletClient?.signMessage({ message });
      return signature ?? "";
    },
  };

  const { signMessage, ...rest } = walletClient ?? {};

  return {
    ...ethersWalletClient,
    ...{ ...rest },
  };
} */




export function walletToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain?.contracts?.ensRegistry?.address,
  }
  //@ts-ignore
  const provider = new providers.Web3Provider(transport, network)
  //@ts-ignore
  const signer = provider.getSigner(account.address)
  return signer
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId })
  return React.useMemo(
    () => (walletClient ? walletToSigner(walletClient) : undefined),
    [walletClient],
  )
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  
  if(!account) return undefined
  if(!chain) return undefined
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}
 
/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient({ chainId })
  if (!walletClient) return undefined
  return walletClientToSigner(walletClient)
}


export function didToAddress(did: string) {
  return did.split(":")[2]
}

import { useEffect, useState } from "react";

import { formatEther } from "viem";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

import { Address, createPublicClient, http } from "viem";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { ThemeToggle } from "../extra/theme-toggle";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import ModalLayout from "./modal-layout";
import ProfileBalance from "./profile-balance";

export default function ProfileDetails({ showModal }: any) {
  const { toast } = useToast();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(true);
  //get all the chains configered from wagmi
  const { chain, chains } = useNetwork();
  const [balances, setBalances] = useState<any>([]);

  const { address: account, isConnected } = useAccount();

  useEffect(() => {
    async function getBalances() {
      console.log(chain);
      for (let i = 0; i < chains.length; i++) {
        const client = createPublicClient({
          chain: chains[i],
          transport: http(chains[i].rpcUrls.default.http[0]),
        });

        let getBalance: any = await client.getBalance({
          address: account as Address,
        });

        getBalance = formatEther(getBalance);

        if (i == 0) {
          setBalances([
            {
              chain: chains[i],
              balance: getBalance,
              active: chain?.id == chains[i].id,
            },
          ]);
        } else {
          setBalances((prev: any) => [
            ...prev,
            {
              chain: chains[i],
              balance: getBalance,
              active: chain?.id == chains[i].id,
            },
          ]);
        }
      }
    }

    if (account && chains) {
      getBalances();
      setLoading(false);
    }
  }, [account, chains, chain]);

  async function copyAddress() {
    navigator.clipboard.writeText(account as Address);
    toast({ title: "Copied to clipboard" });
  }

  return (
    <ModalLayout title="My Account" showModal={showModal}>
      {isConnected ? (
        <div className="flex flex-col divide-solid">
          <div
            id="username"
            className="text-md bg-background-layer-2 rounded-md p-4"
          >
            <span className="text-text-secondary">Wallet Address</span>
            <div className="flex gap-2 items-center">
              <span className="text-sm">{account && account}</span>
              <Button variant="secondary" size="sm" onClick={copyAddress}>
                Copy
              </Button>
            </div>
          </div>

          <div id="balances" className="grid grid-cols-1 py-4 my-4 gap-4">
            <h1>Select Network</h1>
            {balances.map((balance: any, key: number) => (
              <ProfileBalance
                key={key}
                loading={loading}
                token={balance.chain}
                balance={balance.balance}
                active={balance.active}
              />
            ))}
          </div>
          <div>
            <ThemeToggle />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => {
              disconnect()
              signOut()
            }} variant="destructive">
              Sign out
            </Button>
            <Link
              href={`/profile`}
              className="bg-accent-secondary text-accent-primary hover:bg-accent-secondary/50 w-full rounded-md flex items-center justify-center"
            >
                Visit Profile
            </Link>
          </div>
        </div>
      ) : (
        <p>Not connected</p>
      )}
    </ModalLayout>
  );
}

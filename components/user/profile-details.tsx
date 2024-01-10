import { useEffect, useState } from "react";

import { formatEther } from "viem";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

import { Address, createPublicClient, http } from "viem";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import ModalLayout from "./modal-layout";
import ProfileBalance from "./profile-balance";

export default function ProfileDetails({ showModal }: any) {
  const { toast } = useToast();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { chain, chains } = useNetwork();
  const [balances, setBalances] = useState<any>([]);

  const { address: account, isConnected } = useAccount();
  
  const {data:session} = useSession();

  useEffect(() => {
    async function getBalances() {

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
            <span className="text-text-secondary text-label_m">내 암호화 계정 주소</span>
            <div className="flex gap-2 items-center justify-between flex-wrap">
              <span className="text-xs flex-wrap">{account && account}</span>
              
              {
                session?.web3?.address != account ? (
                  <Button
                    size="sm"
                    variant={"destructive"}
                    className="text-md shrink-0"
                    onClick={() => signOut()}
                  >
                    Change Account
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm" className="shrink-0" onClick={copyAddress}>
                  복사하기  
                </Button>)
              }
             
            </div>
          </div>

          <div id="balances" className="grid grid-cols-1 py-4 my-4 gap-4">
            <h1 className="text-title_m">블록체인 네트워크</h1>
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
          
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => {
              disconnect()
              signOut()
              router.push('/onboard')

            }} variant="destructive">
              Sign out
            </Button>
            <Link
              href={`/mypage`}
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

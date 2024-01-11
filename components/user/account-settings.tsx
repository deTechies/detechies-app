import { useEffect, useState } from "react";

import { formatEther } from "viem";
import { useAccount, useDisconnect, useNetwork } from "wagmi";
import { Address, createPublicClient, http } from "viem";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import ModalLayout from "./modal-layout";
import ProfileBalance from "./profile-balance";

interface IAccountSettingsProps {
    showModal: boolean;
    text_my_account: {
      "my_account_title": string,
      "my_encrypted_account_address": string,
      "change_account": string,
      "copy_label": string,
      "blockchain_network": string,
      "chains":{
        "polygon_mainnet": string,
        "polygon_mumbai": string
      },
      "language":{
        "placeholder": string,
        "english": string,
        "korean": string
      },
      "theme":{
        "placeholder": string,
        "light": string,
        "dark": string,
        "system":  string
      },
      "sign_out": string,
      "my_profile": string,
      "not_connected": string
  }
}

export default function AccountSettings({ showModal, text_my_account }: IAccountSettingsProps) {
  const { toast } = useToast();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { chain, chains } = useNetwork();
  const [balances, setBalances] = useState<any>([]);
  const pathName = usePathname();
  const params = pathName.split("/")[1];

  const { address: account, isConnected } = useAccount();

  const { data: session } = useSession();

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

  function changeLanguage(value: string) {
    //change the value in the path name
    const segments = pathName.split("/").filter(Boolean);
    const newPath = "/" + value + "/" + segments.slice(1).join("/");
    router.replace(newPath);
  }

  return (
    <ModalLayout title={text_my_account.my_account_title} showModal={showModal}>
      {isConnected ? (
        <div className="flex flex-col divide-solid">
          {/* Address */}
          <div
            id="username"
            className="text-md bg-background-layer-2 rounded-md p-4"
          >
            <span className="text-text-secondary text-label_m">
              {text_my_account.my_encrypted_account_address}
            </span>
            <div className="flex gap-2 items-center justify-between flex-wrap">
              <span className="text-xs flex-wrap">{account && account}</span>

              {session?.web3?.address != account ? (
                <Button
                  size="sm"
                  variant={"destructive"}
                  className="text-md shrink-0"
                  onClick={() => signOut()}
                >
                  {text_my_account.change_account}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  className="shrink-0"
                  onClick={copyAddress}
                >
                  {text_my_account.copy_label}
                </Button>
              )}
            </div>
          </div>
          {/* Balances */}
          <div id="balances" className="grid grid-cols-1 py-4 my-4 gap-4">
            <h1 className="text-title_m">{text_my_account.blockchain_network}</h1>
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
          {/* Language and theme settings */}
          <div className="flex justify-between mb-4">
            <Select
              onValueChange={(value) => changeLanguage(value)}
              defaultValue={params}
            >
              <SelectTrigger className="w-[105px] bg-background-layer-1 border">
                <SelectValue placeholder={text_my_account.language.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kr">{text_my_account.language.korean}</SelectItem>
                <SelectItem value="en">{text_my_account.language.english}</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[100px]  bg-background-layer-1 border">
                <SelectValue placeholder={text_my_account.theme.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{text_my_account.theme.light}</SelectItem>
                <SelectItem value="dark">{text_my_account.theme.dark}</SelectItem>
                <SelectItem value="system">{text_my_account.theme.system}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Buttons at the bottom  */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                disconnect();
                signOut();
                router.push("/onboard");
              }}
              variant="destructive"
            >
              {text_my_account.sign_out}
            </Button>
            <Link
              href={`/mypage`}
              className="bg-accent-secondary text-accent-primary hover:bg-accent-secondary/50 w-full rounded-md flex items-center justify-center"
            >
              {text_my_account.my_profile}
            </Link>
          </div>
        </div>
      ) : (
        <p>{text_my_account.not_connected}</p>
      )}
    </ModalLayout>
  );
}

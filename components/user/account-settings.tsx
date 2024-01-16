import { useEffect, useState } from "react";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Address, createPublicClient, formatEther, http } from "viem";
import { useAccount, useDisconnect, useNetwork } from "wagmi";
import { ThemeToggle } from "../extra/theme-toggle";
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
  
  function signUserOut(){
    router.replace("/onboard")
    signOut()
  }

  return (
    <ModalLayout title={text_my_account.my_account_title} showModal={showModal}>
        <div className="flex flex-col gap-[20px]  !pt-[20px]">
          {/* Address */}
          <div
            id="username"
            className="flex flex-col w-full items-start gap-[12px] p-[16px] relative bg-background-layer-2 rounded-[12px] "
          > 
            <div className="flex-col self-stretch w-full flex[0_0_auto] flex items-start gap-[12px] relative">
              <div className="relative w-fit mt-[-1.00px] text-[#6B7684] text-[14px]">
                {text_my_account.my_encrypted_account_address}
              </div>
            </div>
            <div className="flex gap-[12px] items-start relative self-stretch grow w-full">
              <div className="flex-1 w-5/6 break-all text-[16px]">
                  <span className="text-[#00d41d]">{account && account.slice(0,6)}</span>
                  <span className="">{account && account.slice(5,37)}</span>
                  <span className="text-[#00d41d]">{account && account.slice(-5)}</span>
              </div>
              <div className="w-1/6">
                {session?.web3?.address != account ? (
                  <Button
                    size="sm"
                    variant={"destructive"}
                    className="shrink-0 !dark: border-[1px] border-[#3B414B] !px-[10px] !pt-[4px] !pb-[6px] !text-[14px]"
                    onClick={signUserOut}
                  >
                    {text_my_account.change_account}
                  </Button>
                ) :   (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0 !dark: border-[1px] border-[#3B414B] !px-[10px] !pt-[4px] !pb-[6px] !text-[14px]"
                    onClick={copyAddress}
                  >
                    {text_my_account.copy_label}
                  </Button>
                )}
              </div> 
            </div>
          </div>
          {/* Balances */}
          <div id="balances" className="flex flex-col items-start gap-[16px] w-full relative">
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
          <div className="flex justify-between">
            <Select
              onValueChange={(value) => changeLanguage(value)}
              defaultValue={params}
            >
              <SelectTrigger className="w-[100px] bg-background-layer-1 border !p-[8px]">
                <SelectValue placeholder={text_my_account.language.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kr">{text_my_account.language.korean}</SelectItem>
                <SelectItem value="en">{text_my_account.language.english}</SelectItem>
              </SelectContent>
            </Select>

            <ThemeToggle text={text_my_account.theme}/>
          </div>
          {/* Buttons at the bottom  */}
          <div className="grid grid-cols-2 gap-4 mt-[12px]">
            <Button
              onClick={() => {
                disconnect();
                signOut();
                router.push("/onboard");
              }}
              variant="destructive"
              className="!py-[15.5px] rounded-[40px]"
            >
              {text_my_account.sign_out}
            </Button>
            <Link
              href={`/mypage`}
              className="bg-accent-secondary text-accent-primary hover:bg-accent-secondary/50 w-full rounded-full flex items-center !py-[15.5px] justify-center"
            >
              {text_my_account.my_profile}
            </Link>
          </div>
        </div>
    </ModalLayout>
  );
}

"use client";

import { signOut, useSession } from "next-auth/react";

import { DEFAULT_AVATAR_LINK } from "@/lib/constants";
import { addURL, truncateMiddle } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork
} from "wagmi";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import AccountSettings from "./account-settings";

interface ILoginProps {
  lang: any;
}

export default function Login({ lang }: ILoginProps) {
  const { connect, connectors } = useConnect();
  const {
    address,
    status,
    isConnected,
    isConnecting,
    isReconnecting,
    isDisconnected,
  } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain, chains } = useNetwork();
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Eager connection
  useEffect(() => {
    if (!isDisconnected) return;
    const wagmiConnected = localStorage.getItem("wagmi.connected");
    const isWagmiConnected = wagmiConnected
      ? JSON.parse(wagmiConnected)
      : false;

    if (!isWagmiConnected) return;

    const str_wallet = localStorage.getItem("wagmi.wallet");
    const wallet_name = str_wallet && str_wallet.replace(/^"|"$/g, "");
    connect({
      connector: connectors.find((connector) => connector.id === wallet_name),
    });

  }, [connect, connectors, isDisconnected]);

  if (isConnecting || isReconnecting) {
    return (
      <Avatar
        className="animate-pulse bg-accent-primary"
        onClick={() => {
          disconnect();
          signOut();
        }}
      >
        <AvatarFallback />
      </Avatar>
    );
  }

  if (session?.web3?.address != address && isConnected) {
    //sign message
    return (
      <div className="flex items-center gap-2 rounded-md">
        <Button size="sm" variant={"primary"} onClick={() => signOut()}>
          {lang.sign_in}
        </Button>
        {showModal && (
          <AccountSettings showModal={showModal} text_my_account={lang} />
        )}
      </div>
    );
  }

  if (!isConnecting && address && address == session?.web3?.address) {
    return (
      <div className="flex items-center gap-2 rounded-md">
        <section className="flex flex-col gap-1 text-right text-xs font-semibold  my-1">
          <span className="text-text-secondary">
            {session.web3.user.display_name}
          </span>
          <span className="text-text-primary">
             {truncateMiddle(session.web3.user.wallet, 10)}
          </span>
        </section>
        <button onClick={
          () => {
            setShowModal(!showModal);
          }
        }
        >

        <div className="relative w-[40px] h-[40px]" >
          <Image 
            src={session.web3.user.avatar_link ? addURL(session.web3.user.avatar_link) :  DEFAULT_AVATAR_LINK}
            alt="user"
            fill
            className="rounded-[6px] bg-background-layer-2"
          />
          </div>
          </button>

        {showModal && (
          <AccountSettings showModal={showModal} text_my_account={lang} />
        )}

        {chain?.id != 314159 && chain?.id != 80001 && (
          <Button
            variant={"destructive"}
            size="sm"
            onClick={() => setShowModal(!showModal)}
          >
            Change Chain
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        size="md"
        variant="success"
        onClick={() => {
          router.push("/onboard");
        }}
      >
        {lang.sign_up}
      </Button>
    
    </div>
  );
}
"use client";

import { polygonMumbai } from "@/helpers/mumbai";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";


import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import IPFSImageLayer from "../ui/layer";
import AccountSettings from "./account-settings";
import ModalLayout from "./modal-layout";

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
  const { chain, chains } = useNetwork();
  const [showModal, setShowModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const { data: session } = useSession();

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

    // console.log(connectors);
    // connect({ connector: connectors as any });
  }, [connect, connectors, isDisconnected]);

  if (isConnecting || isReconnecting) {
    return (
      <Avatar
      className="animate-pulse bg-accent-primary"
      >
        <AvatarFallback />
      </Avatar>
    );
  }

  if (session?.web3?.address != address && isConnected) {
    //sign message

    return (
      <div className="flex items-center gap-2 rounded-md">
        <Button
          size="sm"
          variant={"primary"}
          className="text-md"
          onClick={() => signOut()}
        >
          {lang.sign_in}
        </Button>
        {showModal && (
          <AccountSettings showModal={showModal} text_my_account={lang} />
        )}
      </div>
    );
  }

  if (!isConnecting && address == session?.web3?.address) {
    return (
      <div className="flex items-center gap-2 rounded-md">
        <Avatar
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:outline hover:outline-accent-primary"
          onClick={() => setShowModal(!showModal)}
        >
          <IPFSImageLayer
            hashes={session?.web3?.user?.avatar ? session.web3.user.avatar : []}
          />
        </Avatar>

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
        size="sm"
        className="text-md"
        onClick={() => {
          setLoginModal(!loginModal);
        }}
      >
        Sign up
      </Button>
      {loginModal && (
        <ConnectModal
          showModal={showModal}
          setShowModal={() => {
            setLoginModal(!loginModal);
          }}
        />
      )}
    </div>
  );
}

const ConnectModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) => {
  const [mounted, setMounted] = React.useState(false);
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [hasSigned, setHasSigned] = React.useState(false);
  const { connect, connectors } = useConnect();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  const handleSign = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        version: "1",
        address: address,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce: await getCsrfToken(),
        chainId: polygonMumbai.id,
      });

      const signedMessage = await signMessageAsync({
        message: message.prepareMessage(),
      });

      setHasSigned(true);

      const response = await signIn("web3", {
        message: JSON.stringify(message),
        signedMessage,
        redirect: true,
      });
      if (response?.error) {
        console.log("Error occured:", response.error);
      }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };
  //after connecting you should be able to create a profile.
  return (
    <ModalLayout title="Sign Up" showModal={showModal}>
      <span>
        By connecting a wallet, you agree to Careerzen’s Terms of Service
      </span>
      <div className="flex flex-col gap-2 my-4">
        {!isConnected && (
          <>
            <div className="flex flex-col gap-4 space-y-1">
              <div
                key={connectors[0].id}
                className="flex items-center gap-6 px-6 py-4 text-lg font-medium border rounded-sm cursor-pointer border-border-div hover:border-blue-500"
                onClick={() => connect({ connector: connectors[1] })}
              >
                <Image
                  src={`/icons/web3auth.png`}
                  height={44}
                  width={44}
                  alt={connectors[1].name}
                />
                Social Login
              </div>

              <div
                key={connectors[1].id}
                className="flex items-center gap-6 px-6 py-4 text-lg font-medium border rounded-sm cursor-pointer border-border-div hover:border-orange-500"
                onClick={() => connect({ connector: connectors[0] })}
              >
                <Image
                  src={`/icons/browser.png`}
                  height={44}
                  width={44}
                  alt={connectors[1].name}
                />
                MetaMask
              </div>
            </div>
          </>
        )}
        {isConnected && !hasSigned && (
          <>
            <p className="text-xl font-semibold text-gray-400">
              Welcome {address?.slice(0, 8)}...
            </p>
            <Button className="" onClick={handleSign}>
              Sign Message to Login
            </Button>
          </>
        )}
        {isConnected && hasSigned && (
          <p>You are being authenticated. Please wait...</p>
        )}
      </div>
    </ModalLayout>
  );
};

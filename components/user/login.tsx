"use client";

import { polygonMumbai } from "@/helpers/mumbai";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import IPFSImageLayer from "../ui/layer";
import AuthenticateButton from "./authenticate-button";
import ModalLayout from "./modal-layout";
import ProfileDetails from "./profile-details";

export default function Login() {
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

    connect({ connector: connectors as any });
  }, [connect, connectors, isDisconnected]);


  if (isConnecting || isReconnecting) {
    return (
      <Button
        size="sm"
        variant={"secondary"}
        className="text-md"
        disabled={true}
      >
        Connect
      </Button>
    );
  }

  if (session?.web3?.address != address) {
    //sign message 
    return (
     <AuthenticateButton />
    );
  }
  if (!isConnecting && address == session?.web3?.address) {
    return (
      <div className="flex rounded-md  items-center gap-2">
        <Link href="/profile">
          <Avatar className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:border hover:border-accent-primary">
            <IPFSImageLayer hashes={session?.web3?.user?.nft ? session.web3.user.nft : []} />
            <AvatarFallback>CZ</AvatarFallback>
          </Avatar>
        </Link>
        <Button
          variant="secondary"
          size="sm"
          className="text_link text-text-primary flex  gap-2 px-4 py-3"
          onClick={() => setShowModal(!showModal)}
        >
          {showModal && (
            <ProfileDetails
              address={address}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </Button>
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
    <div className="flex gap-4 items-center">
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
            <div className="flex flex-col space-y-1 gap-4">
              <div
                key={connectors[0].id}
                className="text-lg font-medium border border-border-div rounded-sm px-6 py-4 flex gap-6 hover:border-blue-500 items-center cursor-pointer"
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
                className="text-lg font-medium border border-border-div rounded-sm px-6 py-4 flex gap-6 hover:border-orange-500 items-center cursor-pointer"
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



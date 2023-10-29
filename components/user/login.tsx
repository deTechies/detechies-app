"use client";

import { defaultAvatar } from "@/lib/constants";
import { truncateMiddle } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import IPFSImageLayer from "../ui/layer";
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


  if (isConnecting) {
    return <Button size="sm" variant={"secondary"}  className="text-md" disabled={true}>Connect</Button>;
  }

  if (!isConnecting && address) {
    return (
      
      <div className="flex rounded-md  items-center gap-2">
              <Link href="/profile">
        <Avatar className="bg-gradient-to-r from-cyan-500 to-blue-500">
          <IPFSImageLayer hashes={defaultAvatar} />
          <AvatarFallback>CZ</AvatarFallback>
        </Avatar>
        </Link>
        <Button
          variant="secondary"
          size="sm"
          className="text_link text-black px-4 py-3"
          onClick={() => setShowModal(!showModal)}
        >
          { truncateMiddle(address, 13)}
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

  if (!isReconnecting && !isConnected && !isConnecting && !address) {
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
  
  return (
    <Button size="sm" className="text-md text-white rounded-full py-1 px-8">
      Something went wrong.
    </Button>
  );
}

const ConnectModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) => {
  const { connect, connectors } = useConnect();
  //after connecting you should be able to create a profile.
  return (
    <ModalLayout title="Sign Up" showModal={showModal}>
      <span>
        By connecting a wallet, you agree to Careerzen’s Terms of Service
      </span>
      <div className="flex flex-col gap-2 my-4">
        {connectors.map((connector) => (
          <div
            key={connector.id}
            className="text-lg font-semibold border border-border-div bg-background-layer-2 rounded-sm px-6 py-4 flex gap-6 hover:bg-gray-200 items-center cursor-pointer"
            onClick={() => connect({ connector })}
          >
            <Image
              src={
                `/images/icons/` + connector.name.toLocaleLowerCase() + `.png`
              }
              height={44}
              width={44}
              alt={connector.name}
            />
            {connector.name == 'Web3Auth' ? 'Social Login' : connector.name}
          </div>
        ))}
      </div>
    </ModalLayout>
  );
};

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { Button } from "../ui/button";
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
  const [hasProfile, setHasProfile] = useState(false);
  
  

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

  function truncateTextMiddle(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }

    const halfLength = Math.floor((maxLength - 3) / 2); // Subtracting 3 to accommodate for the ellipsis

    const start = text.slice(0, halfLength);
    const end = text.slice(-halfLength);

    const truncatedText = start + "..." + end;
    return truncatedText;
  }

  if (isConnecting) {
    return <Button size="sm" variant={"secondary"}  className="text-md" disabled={true}>Connect</Button>;
  }

  if (!isConnecting && address) {
    return (
      
      <div className="flex rounded-md  items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="text_link text-black text-md px-4 py-2"
          onClick={() => setShowModal(!showModal)}
        >
          {truncateTextMiddle(address, 13)}
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
            Unsupported Chain
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

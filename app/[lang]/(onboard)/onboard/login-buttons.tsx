"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { polygonMumbai } from "@/helpers/mumbai";
import { truncateMiddle } from "@/lib/utils";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useSignMessage } from "wagmi";

export default function LoginButtons({
  text,
}: {
  text?: any;
}) {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();
  const { data: session } = useSession();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    if (session && session.web3?.accessToken) {
      if (session.web3.address == address) {
        if(session.web3.user?.verified){
          redirect("/project");
        }
        redirect("/onboard/email");

      }

    }
    console.log(address)
    console.log(session);

  }, [address, session]);

  const handleConnect = (connector: any) => {
    connect({ connector });
  };

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

      const response = await signIn("web3", {
        message: JSON.stringify(message),
        signature: signedMessage,
        address: address,
        redirect: true,
        callbackUrl: "/onboard",
      });
      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
        });
        console.log("Error occured:", response.error);
      }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };

  if (address && (!session?.web3?.accessToken || session?.web3.address != address)) {
    return (
      <Button variant={"secondary"} onClick={() => {
        handleSign()
      }}>
        Authenticate {address && truncateMiddle(address, 13)}
      </Button>
    );
  }
  return (
    <div className="flex flex-col space-y-1 gap-4">
      <div
        key={connectors[0].id}
        className="text-lg bg-accent-secondary text-accent-primary rounded-sm px-6 py-5 flex gap-6 hover:outline hover:outline-accent-primary items-center cursor-pointer"
        onClick={() => handleConnect(connectors[1])}
      >
        <Image
          src={`/icons/google.png`}
          height={24}
          width={24}
          alt={connectors[1].name}
          quality={2}
        />
        <span className="w-full text-center">{text.web3 ? text.web3 : 'Social Wallet'}</span>
      </div>

      <div
        key={connectors[1].id}
        className="text-lg bg-background-layer-2 font-medium border border-border-div rounded-sm px-6 py-4 flex gap-6 hover:border-orange-500 items-center cursor-pointer"
        onClick={() => handleConnect(connectors[0])}
      >
        <Image
          src={`/icons/browser.png`}
          height={24}
          width={24}
          alt={connectors[0].name}
        />
        <span className="w-full text-center text-text-primary">
          {text.browser ? text.browser : 'Browser Wallet'}
        </span>
      </div>
    </div>
  );
}

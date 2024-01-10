"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { polygonMumbai } from "@/helpers/mumbai";
import { truncateMiddle } from "@/lib/utils";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

export default function LoginButtons({ text }: { text?: any }) {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();
  const { data: session } = useSession();
  const { signMessageAsync } = useSignMessage();
  const [signing, setSigning] = useState(false);  
  const { disconnect } = useDisconnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (session && session.web3?.accessToken) {
      if (session.web3.address == address) {
        if (session.web3.user?.verified) {
          redirect("/project");
        }
        redirect("/onboard/email");
      }
    }
  }, [address, session]);

  const handleConnect = (connector: any) => {
    connect({ connector });
  };

  const handleSign = async () => {
    setSigning(true);
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

      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
    
    setSigning(false)
  };

  return (
    <main>
      <div className="flex flex-col space-y-1 gap-4">
        {!address ? (
          <>
            <div
              key={connectors[0].id}
              className="bg-accent-secondary text-accent-primary rounded-sm px-6 py-4 flex gap-6 hover:outline hover:outline-accent-primary items-center cursor-pointer"
              onClick={() => handleConnect(connectors[1])}
            >
              <Image
                src={`/icons/google.png`}
                height={24}
                width={24}
                alt={connectors[1].name}
                quality={2}
              />
              <span className="w-full text-center text-title_m">
                {text?.web3 ? text.web3 : "Social Wallet"}
              </span>
            </div>

            <div
              key={connectors[1].id}
              className="bg-background-layer-2 font-medium border border-border-div rounded-sm px-6 py-4 flex gap-6 hover:border-orange-500 items-center cursor-pointer"
              onClick={() => handleConnect(connectors[0])}
            >
              <Image
                src={`/icons/browser.png`}
                height={24}
                width={24}
                alt={connectors[0].name}
              />
              <span className="w-full text-center text-title_m ">
                {text?.browser ? text.browser : "Browser Wallet"}
              </span>
            </div>
          </>
        ) : (
          <div className="flex w-full">
            <Button
              variant={"secondary"}
              onClick={handleSign}
              className="rounded-none rounded-l-sm flex-grow"
              loading={signing}
            >
              Sign in with {address && truncateMiddle(address, 13)} 
            </Button>
            <Button variant={"destructive"} className="rounded-none rounded-r-sm"
              onClick={() => disconnect()}
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

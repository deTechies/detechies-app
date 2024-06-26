"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { truncateMiddle } from "@/lib/utils";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { arbitrumSepolia } from "viem/chains";
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
          redirect("/mypage");
        }
        redirect("/onboard/email");
      }
    }
  }, [address, session]);

  const handleConnect = (connector: any) => {
    connect({ connector });
  };

  if (!mounted) {
    return (
      <div className="h-[100px]">
        <Skeleton className="h-24 grow shrink animate-pulse bg-background-layer-1" />
      </div>
    );
  }

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
        chainId: arbitrumSepolia.id,
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

    setSigning(false);
  };

  return (
    <main>
      <div className="flex flex-col gap-4 space-y-1">
        {!address ? (
          <>
            <div
              key={connectors[1].id}
              className="flex items-center gap-6 px-6 py-4 rounded-sm cursor-pointer bg-primary-clarity  hover:outline hover:outline-primary"
              onClick={() => handleConnect(connectors[1])}
            >
              <Image
                src={`/icons/google.png`}
                height={24}
                width={24}
                alt={connectors[1].name}
                quality={1}
              />
              <span className="w-full text-center text-1.5lg">
                {text?.web3 ? text.web3 : "Social Login"}
              </span>
            </div>

            <div
              key={connectors[0].id}
              className="flex items-center gap-6 px-6 py-4 font-medium border rounded-sm cursor-pointer bg-light border-border-div hover:border-orange-500"
              onClick={() => handleConnect(connectors[0])}
            >
              <Image
                src={`/icons/browser.png`}
                height={24}
                width={24}
                alt={connectors[0].name}
              />
              <span className="w-full text-center text-1.5lg ">
                {text?.browser ? text.browser : "Browser Wallet"}
              </span>
            </div>
          </>
        ) : (
          <div className="flex">
            <Button
              variant="secondary"
              onClick={handleSign}
              className="flex-grow rounded-r-none rounded-l-sm "

            >
              {text?.sign_in_as ? text.sign_in_as : "Sign is as "}{" "}
              {address && truncateMiddle(address, 13)}
            </Button>
            <Button
              variant={"destructive"}
              className="rounded-l-none rounded-r-sm"
              onClick={() => {
                signOut();
                disconnect();
              }}
            >
              {text?.sign_out ? text.sign_out : "Sign Out"}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

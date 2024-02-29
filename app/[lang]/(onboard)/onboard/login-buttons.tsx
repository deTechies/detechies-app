"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { truncateMiddle } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { polygonMumbai } from "viem/chains";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

export default function LoginButtons({ text }: { text: any }) {
  const { ready, authenticated, login, logout } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  const {address} = useAccount();
  const { data: session } = useSession();
  const { signMessageAsync } = useSignMessage();
  const [signing, setSigning] = useState(false);
  const { disconnect } = useDisconnect();

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

    setSigning(false);
  };

  if (address && authenticated) {
    return (
      <div className="flex w-full">
        <Button
          variant={"secondary"}
          onClick={handleSign}
          className="flex-grow rounded-none rounded-l-sm"
          loading={signing}
        >
          {text.sign_in_as ? text.sign_in_as : "Sign is as "}{" "}
          {address && truncateMiddle(address, 13)}
        </Button>
        <Button
          variant={"destructive"}
          className="rounded-none rounded-r-sm"
          onClick={() => {
            signOut();
            disconnect();
          }}
        >
          {text.sign_out ? text.sign_out : "Sign Out"}
        </Button>
      </div>
    );
  }
  
  if(!address && authenticated) {
    return (
      <Button
        variant={"secondary"}
        onClick={logout}
      >
        {text.sign_out ? text.sign_out : "Sign Out"}
      </Button>
    );
  }
  return (
    <Button disabled={disableLogin} onClick={login}>
      Log in
    </Button>
  );
}

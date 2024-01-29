"use client"
import { polygonMumbai } from "@/helpers/mumbai";
import { truncateMiddle } from "@/lib/utils";
import { getCsrfToken, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useSignMessage } from "wagmi";
import { Button } from "../ui/button";

const AuthenticateButton = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
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


      const response = await signIn("web3", {
        message: JSON.stringify(message),
        signature:signedMessage,
        address: address,
        redirect: true,
        callbackUrl: "/onboard",
      });
    } catch (error) {
      console.log("Error Occured", error);
    }
  };
  return (
    <Button variant={"secondary"} onClick={handleSign}>
      Authenticate {address && truncateMiddle(address, 13)}
    </Button>
  );
};

export default AuthenticateButton;

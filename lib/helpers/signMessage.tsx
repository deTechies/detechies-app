"use client"
// Import necessary dependencies
import { toast } from "@/components/ui/use-toast";
import { polygonMumbai } from "@/helpers/mumbai";
import { getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useSignMessage } from "wagmi";


export const useHandleSign = async () => {
    const { signMessageAsync } = useSignMessage();
  const {address} = useAccount();

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
    console.log("Error Occurred", error);
  }
};

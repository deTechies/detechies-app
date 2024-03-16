//we want to create a group with all the members of th project.
"use client";
import EmptyState from "@/components/metronic/custom/empty-state";
import { Button } from "@/components/ui/button";
import { walletClientToSigner } from "@/lib/utils";
import { Client } from "@xmtp/react-sdk";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Address, useWalletClient } from "wagmi";
import Chat from "./xtmp-chat";

export default function ChatStream({
  chatTo,
  isPWA = false,
  env = "staging",
  isContained = false,
}: {
  chatTo: Address;
  isPWA?: boolean;
  env?: string;
  isContained?: boolean;
}) {
  const [messages, setMessages] = useState<any>(null);
  const convRef = useRef<any>(null);
  const clientRef = useRef<any>(null);
  const {
    data: walletClient,
    isError,
    isLoading,
    isFetched,
  } = useWalletClient();

  const [isConnected, setIsConnected] = useState(false);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [notRegistered, setNotRegistered] = useState(false);
  const newConversation = async function (
    xmtp_client: any,
    addressTo: Address
  ) {
    //Creates a new conversation with the address
    if (await xmtp_client?.canMessage(chatTo)) {
      const conversation = await xmtp_client.conversations.newConversation(
        addressTo
      );
      convRef.current = conversation;
      //Loads the messages of the conversation
      const messages = await conversation.messages();
      setMessages(messages);
    } else {
      console.log("Cannot message because is not on the network.");
      //cant message because is not on the network.
      setNotRegistered(true);
    }
  };

  // Function to initialize the XMTP client
  const initXmtp = async function () { 
    // Create the XMTP client
    if (!walletClient) return;
    const signer = walletClientToSigner(walletClient);
    if (!signer) return;
    const xmtp = await Client.create(signer, {
      env: "production",
    });
    //Create or load conversation with Gm bot
    newConversation(xmtp, chatTo);
    // Set the XMTP client in state for later use
    setIsOnNetwork(!!xmtp.address);
    //Set the client in the ref
    clientRef.current = xmtp as any;
  };

  useEffect(() => {
    if (isOnNetwork && convRef.current) {
      // Function to stream new messages in the conversation
      const streamMessages = async () => {
        if (!convRef.current) return;
        const newStream = await convRef.current.streamMessages();
        for await (const msg of newStream) {
          const exists = messages.find((m: any) => m.id === msg.id);
          if (!exists) {
            setMessages((prevMessages: any) => {
              const msgsnew = [...prevMessages, msg];
              return msgsnew;
            });
          }
        }
      };
      streamMessages();
    }
  }, [messages, isConnected, isOnNetwork]);

  return (
    <div className="">
      {/* Display the ConnectWallet component if not connected */}
      {!isFetched && (
        <div>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </div>
      )}
      {/* Display XMTP connection options if connected but not initialized */}
      {isFetched && !isOnNetwork && (
        <div>
          <Button onClick={initXmtp}>Connect to XMTP</Button>
        </div>
      )}
      {/* Render the Chat component if connected, initialized, and messages exist */}
      {isOnNetwork && messages && (
        <Chat
          client={clientRef.current}
          conversation={convRef.current}
          messageHistory={messages}
        />
      )}
      {notRegistered && (
        <EmptyState
          title="user is not on network"
          subtitle="send email to user "
        />
      )}
    </div>
  );
}

/* const ENCODING = "binary";

export const getEnv = () => {
  // "dev" | "production" | "local"
  return typeof process !== undefined && process.env.REACT_APP_XMTP_ENV
    ? process.env.REACT_APP_XMTP_ENV
    : "production";
};
export const buildLocalStorageKey = (walletAddress:any) => {
  return walletAddress ? `xmtp:${getEnv()}:keys:${walletAddress}` : "";
};

export const loadKeys = (walletAddress:any) => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
  return val ? Buffer.from(val, ENCODING) : null;
};

export const storeKeys = (walletAddress:any, keys:any) => {
  localStorage.setItem(
    buildLocalStorageKey(walletAddress),
    Buffer.from(keys).toString(ENCODING)
  );
};

export const wipeKeys = (walletAddress:any) => {
  localStorage.removeItem(buildLocalStorageKey(walletAddress));
}; */

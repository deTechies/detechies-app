"use client";
import { Button } from "@/components/ui/button";
import { walletClientToSigner } from "@/lib/toSigner";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Address } from "viem";
import { useWalletClient } from "wagmi";
import Chat from "./xtmp-chat";

export default function XTMPSetup({
  params: { address },
}: {
  params: { address: Address };
}) {
  const [messages, setMessages] = useState(null);
  const convRef = useRef(null);
  const clientRef = useRef(null);
  const { data: walletClient, isError, isLoading, isFetched } = useWalletClient();

  const [isConnected, setIsConnected] = useState(false);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [notRegistered, setNotRegistered] = useState(false);
  const newConversation = async function (
    xmtp_client: any,
    addressTo: Address
  ) {
    //Creates a new conversation with the address
    if (await xmtp_client?.canMessage(address)) {
      const conversation = await xmtp_client.conversations.newConversation(
        addressTo
      );
      convRef.current = conversation;
      //Loads the messages of the conversation
      const messages = await conversation.messages();
      setMessages(messages);
    } else {
      console.log("cant message because is not on the network.");
      //cant message because is not on the network.
      setNotRegistered(true);
    }
  };

  // Function to initialize the XMTP client
  const initXmtp = async function () {
    // Create the XMTP client
    const xmtp = await Client.create(walletClientToSigner(walletClient), {
      env: "production",
    });
    //Create or load conversation with Gm bot
    newConversation(xmtp, address);
    // Set the XMTP client in state for later use
    setIsOnNetwork(!!xmtp.address);
    //Set the client in the ref
    clientRef.current = xmtp as any;
  };



  useEffect(() => {
    if (isOnNetwork && convRef.current) {
      // Function to stream new messages in the conversation
      const streamMessages = async () => {
        const newStream = await convRef.current.streamMessages();
        for await (const msg of newStream) {
          const exists = messages.find((m:any) => m.id === msg.id);
          if (!exists) {
            setMessages((prevMessages) => {
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
    <div className="flex flex-col gap-4 h-screen justify-center items-center p-24">
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
      {notRegistered && <NotOnNetwork />}
    </div>
  );
}
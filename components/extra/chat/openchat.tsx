import { useEthersSigner } from "@/lib/utils";
import { Client } from "@xmtp/xmtp-js";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import Chat from "./chat";




export default function ChatModal({user}: {user: any}) {
  const [messages, setMessages] = useState<any>(null);
  const convRef = useRef(null);
  const clientRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const signer = useEthersSigner();
  const {address} = useAccount();
  
  //const {client, error, isLoading} = useClient();
  

  const [isConnected, setIsConnected] = useState(false);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  

  // Function to load the existing messages in a conversation
  const newConversation = async function (xmtp_client: any, addressTo: any) {
    //Creates a new conversation with the address
    if (await xmtp_client?.canMessage(addressTo)) {
      const conversation = await xmtp_client.conversations.newConversation(
        addressTo
      );
      convRef.current = conversation;
      const messages = await conversation.messages();
      setMessages(messages);
    } else {
      console.log("cant message because is not on the network.");
      //cant message because is not on the network.
    }
  };

  useEffect(() => {
    if (signer) {
      setIsConnected(true);
    }
  }, [signer]);

  // Function to initialize the XMTP client
  const initXmtp = async function () {
    // Create the XMTP client
    //@ts-ignore
    const xmtp = await Client.create(signer, { env: "production" });
    //Create or load conversation with Gm bot
    newConversation(xmtp, user);
    // Set the XMTP client in state for later use
    setIsOnNetwork(!!xmtp.address);
    //Set the client in the ref
    //@ts-ignore
    clientRef.current = xmtp;
  };


  useEffect(() => {
    if (isOnNetwork && convRef.current) {
      // Function to stream new messages in the conversation
      const streamMessages = async () => {
        //@ts-ignore
        const newStream = await convRef.current.streamMessages();
        for await (const msg of newStream) {
          //@ts-ignore
          const exists = messages.find((m) => m.id === msg.id);
          if (!exists) {
            //@ts-ignore
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
<div className="max-w max-h">
      {/* Display the ConnectWallet component if not connected */}
      {!isConnected && (
        <Button onClick={() => window.alert("not working")} className="">
          Not yet working..
        </Button>
      )}
      {/* Display XMTP connection options if connected but not initialized */}
      {isConnected && !isOnNetwork && (
        <Button onClick={initXmtp} variant="secondary">
          Setup Chat
        </Button>
      )}
      {/* Render the Chat component if connected, initialized, and messages exist */}
      {isConnected && isOnNetwork && messages && (
         <Chat
         client={clientRef.current}
         conversation={convRef.current}
         messageHistory={messages}
       />
      )}
      {
        isConnected && isOnNetwork && !messages && (
          <Button
            className="w-full"
            variant={"secondary"}
            onClick={() => {}}
          >
            Not installed
          </Button>
          )
      }

      </div>
  );
  
}
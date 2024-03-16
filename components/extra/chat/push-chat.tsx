//we want to create a group with all the members of th project.
"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { PushContext } from "@/lib/usePushProtocol";
import { didToAddress } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Address } from "wagmi";
import MessageItem from "./message-item";

type Chat = {
  cid: string;
  messageContent: string;
  fromDID: string;
  timestamp: number;
};

type MessageProps = {
  chats: Chat[];
  chatTo: any;
};

type MessageInputProps = {
  inputValue: string;
  onInputChange: (event: React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  isDisabled: boolean;
  isLoading: boolean;
};


export default function PushChat({ chatTo }: { chatTo?: Address }) {
  const [chats, setChats] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false);
  const chatter = useContext(PushContext);
  const [chatId, setChatId] = useState<string>(
    "cce4a93b06a91ce0f53310f51b5397584b87f81e09c1ea9d1ae2f94f0bfa4260"
  );

  useEffect(() => {
    const fetchChat = async (newChat: string) => {
      
      if(!chatter.user) {
        chatter.initializeUser();
        return;
      }
      
      
      await chatter.user.chat.history(newChat).then((chatFeed) => {
        setChats(chatFeed);
      });
      
      setLoading(false);
    };

    if (chatTo) {
      setChatId(chatTo);
      fetchChat(chatTo);
    }
  }, [chatter, chatTo]);


  const handleInputChange = (event: any) => {
    if (event.key === "Enter") {
      sendMessage();
    } else {
      setInputValue(event.target.value);
    }
  };

  const sendMessage = async function () {
    //const secondMe = "0xdb1B6961d1F9d1A17C02f23BD186b3bC4f3e7E2A" as Address;
    if (!chatter.user) return;
    if (!chatId) return;
    setSendingMessage(true);

    await chatter.user.chat
      .send(chatId, {
        content: inputValue,
        type: "Text",
      })
      .then((response) => {

        toast({
          title: "Message sent",
        });
        setInputValue("");
        setChats([
          {
            cid: response.cid,
            messageContent: inputValue,
            fromDID: response.fromDID,
            timestamp: response.timestamp,
          },
          ...chats
         
        ]);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast({
          title: "Error sending message",
          description: error.toString(),
        });
      });

    setSendingMessage(false);
  };

  return (
    <div className="m-4">
    <section className="h-[60vh] overflow-auto ">
      {loading ? <div>
        Loading chat... 
      </div> : <MessageList chats={chats} chatTo={chatTo}/>}
    </section>
    <MessageInput
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onSend={sendMessage}
      isDisabled={!inputValue || !chatter || !chatId}
      isLoading={sendingMessage}
    />
  </div>
  );
}

export function MessageList({ chats, chatTo }: MessageProps) {
  return (
    <ul className="flex flex-col gap-6 mb-10 w-full">
      {chats &&
        chats.length > 0 &&
        [...chats].reverse().map((chat:any, index) => (
          <div key={index} className="w-full">
            <MessageItem
              message={{
                id: chat.cid,
                content: chat.messageContent,
                sender: didToAddress(chat.fromDID),
                sent: new Date(chat.timestamp * 1000),
                timestamp: chat.timestamp,
              }}
              push={chat}
              clientAddress={chatTo}
            />
          </div>
        ))}
    </ul>
  );
}

export function MessageInput({ inputValue, onInputChange, onSend, isDisabled, isLoading }: MessageInputProps) {
  return (
    <div className="flex gap-2 border border-border-div rounded-sm px-2 py-2.5 items-center ">
      <Avatar>
        <AvatarFallback>
          ME
        </AvatarFallback>
      </Avatar>
      <Textarea
        value={inputValue}
        placeholder="Type your text here "
        rows={1}
        aria-hidden="true"
        className="bg-transparent border-none focus:none flex w-full flex-wrap text-sm"
      />
      <Button
        onClick={onSend}
        size="sm"
        className="rounded-[6px] border border-accent-primary"
        disabled={isDisabled}
        loading={isLoading}
      >
        <SendHorizonal size={22} />
      </Button>
    </div>
  );
}



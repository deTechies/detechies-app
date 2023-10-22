//we want to create a group with all the members of th project.
"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { PushContext } from "@/lib/usePushProtocol";
import { didToAddress } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Address } from "wagmi";
import MessageItem from "./message-item";

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
      if (!chatter || !newChat) return;
      await chatter.chat.history(newChat).then((chatFeed) => {
        console.log(chatFeed);
        setChats(chatFeed);
      });
      
      setLoading(false)
    };

    //1 - on 1 chat
    if (chatTo) {
      setChatId(chatTo);
      fetchChat(chatTo);
    }

    //groupChat
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
    if (!chatter) return;
    if (!chatId) return;
    setSendingMessage(true);

    await chatter.chat
      .send(chatId, {
        content: inputValue,
        type: "Text",
      })
      .then((response) => {
        console.log("Message sent successfully:", response);
        toast({
          title: "Message sent",
        });
        setInputValue("");
        setChats([
          ...chats,
          {
            cid: response.cid,
            messageContent: inputValue,
            fromDID: response.fromDID,
            timestamp: response.timestamp,
          },
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
        {
          loading ? <Loading /> : (
            <ul className="flex flex-col gap-10">
            {chats &&
              chats.length > 0 &&
              chats.map((chat: any, index: any) => (
                <div key={index} className="p3 ">
                  <MessageItem
                    message={{
                      id: chat.cid,
                      content: chat.messageContent,
                      sender: didToAddress(chat.fromDID),
                      sent: new Date(chat.timestamp * 1000),
                      timestamp: chat.timestamp,
                    }}
                    push={chat}
                    clientAddress={didToAddress(chat.fromDID) as Address}
                  />
                </div>
              ))}
          </ul>
          )
        }
     
      </section>
      <div className="flex gap-2">
        <Input
          type="text"
          onKeyPress={handleInputChange}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type your text here "
          className="col-span-5 bg-secondary flex w-full flex-wrap py-4 text-sm"
        />
        <Button
          onClick={sendMessage}
          size="sm"
          className="rounded-[6px] border border-accent-primary"
          disabled={!inputValue || !chatter || !chatId}
          loading={sendingMessage}
        >
          <SendHorizonal size={22} />
        </Button>
      </div>
    </div>
  );
}

//we want to create a group with all the members of th project.
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { PushContext } from "@/lib/usePushProtocol";
import { didToAddress } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Address, useAccount } from "wagmi";
import MessageItem from "./message-item";



export default function PushGroupChat({
  chatId,
  contract,
  members,
}: {
  contract?: Address;
  chatId: string;
  members?: string[];
}) {
  const [chats, setChats] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const chatter = useContext(PushContext);
  const [chatInfo, setChatInfo] = useState<any>(null);
  const {address:currentUser} = useAccount();

  useEffect(() => {
    const fetchChat = async (newChat: string) => {
      if (!chatter || !newChat) return;
      await chatter.chat.history(newChat).then((chatFeed) => {
        
        setChats(chatFeed);
      });
    };

    const fetchGroupInfo = async () => {
      await chatter?.chat.group
        .info(chatId)
        .then((result) => {
          console.log(result)
          setChatInfo(result);
          const isMemberOf = result.members.some((member: any) => {
            return didToAddress(member.wallet) == currentUser;
          });
          //check group info and see if the user is member or not..
          setIsMember(isMemberOf);
          
        })
        .catch((error) => {
          console.error(error);
        });
        
    };

    if (!chatId) {
      toast({
        title: "Group not found... ",
      });
    }
    if(currentUser && chatId){
      fetchChat(chatId);
      fetchGroupInfo();
    }
    
    console.log("chatId", chatId)
    console.log("currentUser", currentUser)
    console.log("isMember", isMember)
    console.log(contract);
  }, [contract, chatId, chatter, currentUser]);

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
        toast({
          title: "Message succesfully sent",
          description: response.toString(),
        });
        console.log(response)
        setChats([...chats, {
          cid: response.cid,
          messageContent: inputValue,
          fromDID: response.fromDID,
          timestamp: response.timestamp
        }])
        setInputValue("");
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
  
  const joinGroupChat = async function () {
    setSendingMessage(true);
    if (!chatter) return;
    if (!chatId) return;
    
  await chatter.chat.group.join(chatId)
  .then((result) => {
    toast({
      title: "Succesfully joined the chat"
    })
    
    setSendingMessage(false)
    setIsMember(true);
  })
  .catch((err) =>{

    toast({
      title: "Error joining the chat",
      description: "Please see the console log why it did not work"
    })
    setSendingMessage(false)
  })

    
  }

  return (
    
    <Card className="shadow min-w-[700px]">
      <CardHeader className="flex gap-4 justify-between items-center ">
        Group Chat
         <div className="flex -space-x-2 overflow-hidden">
          {chatInfo?.members && chatInfo.members.map((user: any) => (
            <Avatar
              key={user.wallet}
              className="inline-block border-2 border-background"
            >
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.wallet}</AvatarFallback>
              
            </Avatar>
          ))}
        </div> 
      </CardHeader>
      {isMember && (
      <CardContent className="h-[60vh] overflow-auto ">
       
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

    
      </CardContent>
              )}
      <div className="flex gap-2">
        {
          isMember ? (
            <>
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
          </>
          ) : (
            <Button onClick={joinGroupChat} disabled={!chatter || !chatId}>
              Join Group
            </Button>
          )
        }
       
      </div>
    </Card>

  );
}

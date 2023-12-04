//we want to create a group with all the members of th project.
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { PushContext } from "@/lib/usePushProtocol";
import { useContext, useEffect, useState } from "react";
import { Address, useAccount } from "wagmi";
import { MessageInput, MessageList } from "./push-chat";

type Chat = {
  cid: string;
  messageContent: string;
  fromDID: string;
  timestamp: number;
};

type GroupMember = {
  wallet: string;
  image?: string;
};

type GroupInfo = {
  members: GroupMember[];
};

type PushGroupChatProps = {
  contract?: Address;
  chatId: string;
  members?: string[];
};



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
  let chatter = useContext(PushContext);
  const [chatInfo, setChatInfo] = useState<any>(null);
  const {address:currentUser} = useAccount();

  useEffect(() => {
    const fetchChat = async (newChat: string) => {
      if (!newChat) return;
      if(!chatter.user) {
        chatter.initializeUser();
        return;
      }
      await chatter.user.chat.history(newChat).then((chatFeed) => {
        
        setChats(chatFeed);
      });
    };

    const fetchGroupInfo = async () => {
      if(!chatter.user) {
        chatter.initializeUser();
        return;
      }
      await chatter.user.chat.group
        .info(chatId)
        .then((result) => {
          console.log(result)
          setChatInfo(result);
         /*  const isMemberOf = result.members?.some((member: any) => {
            return didToAddress(member.wallet) == currentUser;
          }); */
          //check group info and see if the user is member or not..
          setIsMember(false);
          
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

    if(!chatter.user) {
      toast({
        title: "Please connect your wallet",
      });
      return;
    }
    await chatter.user.chat
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
    if (!chatter.user) {
      await chatter.initializeUser();
      return
    };
    if (!chatId) return;
    
  await chatter.user.chat.group.join(chatId)
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
        {chatInfo?.members && <MemberAvatars members={chatInfo.members} />}
      </CardHeader>
      {isMember && (
      <CardContent className="h-[60vh] overflow-auto ">       
              <MessageList chats={chats} />
      </CardContent>
              )}
      <div className="flex gap-2">
        {
          isMember ? 
            <MessageInput inputValue={inputValue} onInputChange={handleInputChange} onSend={sendMessage} isDisabled={!inputValue || !chatter || !chatId} isLoading={sendingMessage} />
           : 
            <Button onClick={joinGroupChat} disabled={!chatter || !chatId}>
              Join Group
            </Button>
          
        }
       
      </div>
    </Card>

  );
}

type MemberAvatarsProps = {
  members: GroupMember[];
};

const MemberAvatars: React.FC<MemberAvatarsProps> = ({ members }) => {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {members.map((user) => (
        <Avatar key={user.wallet} className="inline-block border-2 border-background">
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.wallet}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

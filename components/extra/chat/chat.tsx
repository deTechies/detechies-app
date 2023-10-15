"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import MessageItem from "./message-item";


function Chat({
  client,
  messageHistory,
  conversation,
  filterWord,
}: {
  client: any;
  messageHistory: any;
  conversation: any;
  filterWord?:string;
}) {
  const [inputValue, setInputValue] = useState("");

  // Function to handle sending a message
  const handleSend = async () => {
    if (inputValue) {
      await onSendMessage(inputValue);
      setInputValue("");
    }
  };
  
  const selectedUsers = [
    {
      name: "Jane Cooper",
      email: "something:",
      avatar:
        "https://images.unsplash.com/photo-1612833603922-2e3f2a5f3a6d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwc2Nob29sfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=400&q=60",
    },
    {
      name: "Jane Cooper",
      email: "something:",
      avatar:
        "https://images.unsplash.com/photo-1612833603922-2e3f2a5f3a6d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwc2Nob29sfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=400&q=60",
    },
    {
      name: "Jane Cooper",
      email: "something:",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2360&q=80",
    },
    
  ]

  // Function to handle sending a text message
  const onSendMessage = async (value: any) => {
    return conversation.send(value);
  };

  // MessageList component to render the list of messages
  const MessageList = ({ messages }: { messages: any }) => {
    // Filter messages by unique id
    messages = messages.filter(
      (v:any, i:any, a:any) => a.findIndex((t:any) => t.id === v.id) === i
    );

    return (
      <ul className="flex flex-col gap-10">
        {messages.map((message: any, index:number) => (
         <MessageItem key={index} message={message} clientAddress={client.address}  />
        ))}
      </ul>
    );
  };

  // Function to handle input change (keypress or change event)
  const handleInputChange = (event: any) => {
    if (event.key === "Enter") {
      handleSend();
    } else {
      setInputValue(event.target.value);
    }
  };
  return (
    <Card className="shadow">
        <CardHeader className="flex gap-4 items-center ">
        
            <div className="flex -space-x-2 overflow-hidden">
                {selectedUsers.map((user) => (
                  <Avatar
                    key={user.email}
                    className="inline-block border-2 border-background"
                  >
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            
        </CardHeader>
      <CardContent className="h-[60vh] overflow-auto ">
        <MessageList messages={messageHistory} />
      </CardContent>
        <div className="flex gap-2">
        <Input
          type="text"
          onKeyPress={handleInputChange}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type your text here "
          className="col-span-5 bg-secondary flex w-full flex-wrap py-4 text-sm"
        />
        <Button onClick={handleSend}  size="sm" className="rounded-[6px] border border-accent-primary">
            <SendHorizonal size={22}/>
        </Button>
        </div>

    </Card>
  );
}

export default Chat;
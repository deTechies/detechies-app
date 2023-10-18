import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import clsx from "clsx";
import React from "react";

interface Message {
  id: string;
  senderAddress: string;
  content: string;
  sent: Date;
}

interface MessageItemProps {
  message: any;
  clientAddress: string;
  timestamp?: number
  push? : any
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  timestamp,
  push,
  clientAddress,
}) => {
  const isSentByClient = message.sender === clientAddress;
  const senderName = isSentByClient ? "You" : message.sender;

  return (
    <li
      key={message.id}
      title="Click to log this message to the console"
      className={clsx("flex flex-col text-sm ", {
        "items-end ": isSentByClient,
        "items-start ": !isSentByClient,
      })}
    >

      <Avatar className="inline-block border-2 border-background h-12 w-12 rounded-full z-10 ">
        <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2360&q=80"
          className="rounded-full"
        />
        <AvatarFallback>{senderName}</AvatarFallback>
      </Avatar>
      <span
        className={clsx(
          "rounded-sm relative pb-6 -my-8 mx-8 px-4 py-4 leading-5 tracking-wide max-w-[80%]",
          {
            "items-end bg-accent-secondary": isSentByClient,
            "items-start bg-background-layer-2": !isSentByClient,
          }
        )}
      >
        {message.content}
        <Popover>
          <PopoverTrigger className="ml-4 cursor-pointer absolute  leading-3 tracking-wider  text-xs italic font-light text-text-secondary left-0 bottom-2">
            {message.sent.toLocaleTimeString()}
          </PopoverTrigger>
          <PopoverContent className=" max-w-[50vw] max-h-[30vh] flex flex-col gap-2 overflow-auto">
            {JSON.stringify(push)}
             <ul>
             {push && Object.entries(push).map(([key, value], subIndex) => (
               <li key={subIndex}>
                 <strong>{key}:</strong> {value?.toString()}
               </li>
             ))}
           </ul>
          </PopoverContent>
        </Popover>
      </span>
    </li>
  );
};

export default MessageItem;

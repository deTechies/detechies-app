import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  timestamp?: number;
  push?: any;
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
    <div
      key={message.id}
      className={clsx("flex flex-row w-full text-sm ", {
        "items-start ": isSentByClient,
        "items-end ": !isSentByClient,
      })}
    >
      <div className={clsx("flex flex-col gap-2 w-full", {
        "items-start ": isSentByClient,
        "items-end ": !isSentByClient,
      })  }>
        <span
          className={clsx("rounded-[12px]  p-4 leading-5 tracking-wide max-w-[80%] ", {
            "justify-end content-end bg-accent-secondary": isSentByClient,
            "justify-start content-start bg-background-layer-2": !isSentByClient,
          })}
        >
          {message.content}
        </span>
        <Popover>
          <PopoverTrigger
            className={clsx("flex text-text-secondary italic flex-row w-full text-sm  ", {
              "justify-start ": isSentByClient,
              "justify-end ": !isSentByClient,
            })}
          >
            {message.sent.toLocaleTimeString()}
          </PopoverTrigger>
          <PopoverContent className=" max-w-[50vw] max-h-[30vh] flex flex-col gap-2 overflow-scroll">
            <ul>
              {
                // @ts-ignore
                message.sent.toLocaleTimeString()
              }
            </ul>
            <span>
              <span className="text-text-secondary">Sender:</span> {senderName}
            </span>
            <span>
              <span className="text-text-secondary">Address:</span>{" "}
              {message.sender}
            </span>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MessageItem;

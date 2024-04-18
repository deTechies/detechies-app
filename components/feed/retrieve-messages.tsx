import { PProjectFeed } from "@/lib/interfaces/waku-types";
import { useFilterMessages, useStoreMessages } from "@waku/react";
import { LightNode, createDecoder } from "@waku/sdk";
import { useEffect, useState } from "react";

export default function RetrieveMessages({
  node,
  contentTopic,
}: {
  node: LightNode;
  contentTopic: string;
}) {
  const decoder = createDecoder('/light-guide/1/message/proto');
  const [messages, setMessages] = useState([]);
  const { messages: storeMessages } = useStoreMessages({
    node,
    decoder,
    options: { pageSize: 10 },
  });
  const { messages: filterMessages } = useFilterMessages({ node, decoder });
  useEffect(() => {
    const allMessages = storeMessages.concat(filterMessages) as any;
    setMessages(
      allMessages.map((wakuMessage: any) => {
        if (!wakuMessage.payload) return;
        return PProjectFeed.decode(wakuMessage.payload);
      })
    );
  }, [filterMessages, storeMessages]);
  return (
    <>
      {messages.map((message: any, index: number) => {
        return (
          <div key={index} className="p-5 border border-border-div rounded-md">
            <p>{message.message}</p>
          </div>
        );
      })}
    </>
  );
}

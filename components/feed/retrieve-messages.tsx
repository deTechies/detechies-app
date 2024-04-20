import { createDecoder } from "@waku/sdk";
import { useState } from "react";

export default function RetrieveMessages({
  node,
  contentTopic,
}: {
  node: any;
  contentTopic: string;
}) {
  const decoder = createDecoder(contentTopic);
  const [messages, setMessages] = useState([]);


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
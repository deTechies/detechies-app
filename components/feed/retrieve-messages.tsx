import { createDecoder } from "@waku/sdk";
import { useEffect, useState } from "react";

export default function RetrieveMessages({
  node,
  contentTopic,
}: {
  node: any;
  contentTopic: string;
}) {
  const decoder = createDecoder(contentTopic);
// Create the callback function
const [messages, setMessages] = useState([]);
useEffect(() => {
    // Retrieve the first page of messages
    // This retrieves all the messages if "return true" is not present
    
    const callback = (wakuMessage:any) => {
      setMessages(wakuMessage);
      // Return "true" to stop retrieving pages
      // Here, it retrieves only the first page
      return true;
  };

    async() =>{
      await node.store.queryWithOrderedCallback(
          [decoder],
          callback,
      );
      
    }
    
}, [node, decoder, messages]);
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
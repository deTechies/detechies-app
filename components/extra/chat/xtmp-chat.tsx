/* "use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  filterWord?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  // Function to handle sending a message
  const handleSend = async () => {
    if (inputValue) {
      await onSendMessage(inputValue);
      setInputValue("");
    }
  };

  // Function to handle sending a text message
  const onSendMessage = async (value: any) => {
    return conversation.send(value);
  };

  // MessageList component to render the list of messages
  const MessageList = ({ messages }: { messages: any }) => {
    // Filter messages by unique id
    messages = messages.filter(
      (v: any, i: any, a: any) => a.findIndex((t: any) => t.id === v.id) === i
    );

    return (
    <div className="flex flex-col gap-6 mb-10 w-full">
        {messages.map((message: any, key:number) => (
            <MessageItem key={key} message={message} clientAddress={client.address} />
        ))}
      </div>
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
    <div className="m-4">
      <section className="h-[60vh] overflow-auto ">
        <MessageList messages={messageHistory} />
      </section>
      <div className="flex gap-2 border border-border-div rounded-sm px-2 py-2.5 items-center ">
        <Avatar>
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <Textarea
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type your text here "
          rows={1}
          aria-hidden="true"
          className="bg-transparent border-none focus:none flex w-full flex-wrap text-sm"
        />
        <Button
          onClick={handleSend}
          size="sm"
          className="rounded-[6px] border border-accent-primary"
        >
            Send
        </Button>
      </div>
    </div>
  );
}

export default Chat;
 */
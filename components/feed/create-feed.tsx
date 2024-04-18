"use client";

import { Button } from "@/components/ui/button";

import { DEFAULT_AVATAR_LINK } from "@/lib/constants";
import { PProjectFeed } from "@/lib/interfaces/waku-types";
import { useLightPush } from "@waku/react";
import { createEncoder } from "@waku/sdk";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
export interface ProjectMatch {
  categories: string[] | null;
  similarity_score: number;
  simiilarity_data: object[];
  scope: string;
  simliar_packages: object[];
  simliar_languages: object[];
  reliability_score: number;
}

export default function CreateFeed({
  contentTopic,
  node,
  projectMatch,
}: {
  contentTopic: string;
  node: any;
  projectMatch?: ProjectMatch;
}) {
  
  const { toast } = useToast();

  const encoder = createEncoder({ contentTopic });
  const { push } = useLightPush({ node, encoder });
  const [message, setMessage] = useState("");

  
  const sendMessage = async () => {
    if (!push || message.length === 0) {
      return;
    }
      const protoMessage = PProjectFeed.create({
      id: crypto.randomUUID(),
      message: message,
      comments: [],
      likes: 0,
    }); 
    const payload = PProjectFeed.encode(protoMessage).finish();



    const result = await push({ payload: payload });

    console.log(result);
    // Check for errors{
    if (result?.failures && result.failures.length > 0) {
      toast({
        title: `Write to ${contentTopic} failed`,
        description: result.failures[0].error,
      });
      return;
    }
    toast({
      title: "Success",
      description: "Message sent",
    });
  };

  return (
    <div className="flex gap-2.5 px-4 py-5 border rounded-md">
      <div className="flex flex-col gap-1">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={DEFAULT_AVATAR_LINK}
            alt="User"
            className="h-20 w-20 bg-info-clarity"
          />
        </Avatar>
      </div>
      <Textarea
        placeholder="Enter your message"
        className="border-none bg-transparent"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        onClick={() => {
          sendMessage();
        }}
      >
        Feedback
      </Button>
    </div>
  );
}

"use client"
import { DEFAULT_AVATAR_LINK } from "@/lib/constants";

import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { sendFeed } from "./send-feed";

export default function ReplyPost({topic}: {topic: string}) {
    const [message, setMessage] = useState<string>("");
    //here we can make a post request to the send the anonymous reply. 
    const createReply = async () => {
        const result = await sendFeed(topic, message);
        if(result == 'OK'){
            setMessage('');
            //refresh the function
        }   
    }
    
  return (
    <div className="parent flex gap-2.5 items-center py-2 px-2.5 border rounded-[6px]">
        <Avatar className="bg-info-clarity">
            <AvatarImage src={DEFAULT_AVATAR_LINK} alt="avatar" />
        </Avatar>
        <Textarea placeholder="Reply to this post" className="w-full rounded-[6px] min-h-4 h-[48px] border-none bg-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="primary" size="sm"
            onClick={createReply}
        >
            Send
        </Button>
    </div>
  )
}

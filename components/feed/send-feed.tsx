"use server";

import { PProjectFeed } from "@/lib/interfaces/waku-types";



export async function sendFeed(contentTopic: string, message: string) {
  const url = "https://forum.vac.dev/relay/v1/auto/messages";

  const randomId = Math.floor(Math.random() * 1000);
  const protoMessage = PProjectFeed.create({
    id: randomId.toString(),
    message: message,
    comments: [],
    likes: 0,
  });
  const payload = PProjectFeed.encode(protoMessage).finish();


  const base64Payload = btoa(String.fromCharCode(...Array.from(payload)));


  const result = fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      contentTopic: contentTopic,
      payload: base64Payload
    }),
  });
  
  const response = (await result).text();
  

  return response;
}

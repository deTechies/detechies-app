
import { PProjectFeed } from "@/lib/interfaces/waku-types";
import Reply from "./reply";
import ReplyPost from "./reply-post";

export default async function Replies({ topic }: { topic: string }) {
  const encodedTopic = encodeURIComponent(topic);

  const data = await fetch(
    `http://127.0.0.1:8645/store/v1/messages?contentTopics=${encodedTopic}&pageSize=50&ascending=true`,
    { cache: "no-store" }
  );

  const response = await data.json();

  for (const message of response.messages) {
    //change the message to the object
    message.payload = base64ToUint8Array(message.payload);
    message.payload = PProjectFeed.decode(message.payload);
    message.payload = message.payload.toJSON();

  }

  function base64ToUint8Array(base64: string) {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  return (
    <div className="flex flex-col gap-5">

      {response.messages.map((message: any, index: number) => (
        <Reply key={index} details={message} />
      ))}
      <ReplyPost topic={topic} />
    </div>
  );
}

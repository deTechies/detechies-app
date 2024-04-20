
import { createLightNode } from "@waku/sdk";
import CreateFeed from "./create-feed";
import RetrieveMessages from "./retrieve-messages";

export default async function WakuFeed({ topic, id }: { topic: string; id: string }) {
  // Create and start a Light Node
  const node = await createLightNode({
    defaultBootstrap: true,
    shardInfo: {
      contentTopics: [topic],
    }
  });
  //what if we add in the messages here to see if towrks 
  
  const messages = [] as any[];

  return (
    <div className="py-5">
      {node && <CreateFeed contentTopic={topic} node={node} />}
      {node && <RetrieveMessages messages={messages} />}
    </div>
  );
}

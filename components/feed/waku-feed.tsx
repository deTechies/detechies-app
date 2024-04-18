import { ContentPairProvider, useWaku } from "@waku/react";
import CreateFeed from "./create-feed";
import RetrieveMessages from "./retrieve-messages";

export default function WakuFeed({ topic, id }: { topic: string; id: string }) {
  // Create and start a Light Node
  const { node, error, isLoading } = useWaku();
  // Create a message encoder and decoder
  //change the topic

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return (
    <ContentPairProvider contentTopic={topic} >
      <div className="py-5">
        {node && <CreateFeed contentTopic={topic} node={node} />}
        {node && <RetrieveMessages contentTopic={topic} node={node} />}
      </div>
      {/* <Post key={index} details={message} /> */}
    </ContentPairProvider>
  );
}

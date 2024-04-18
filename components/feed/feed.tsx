"use client"
import { LightNodeProvider } from "@waku/react";
import { Protocols } from "@waku/sdk";
import PageHeader from "../metronic/header/page-header";
import WakuFeed from "./waku-feed";


export default  function Feed({ topic, id }: { topic: string, id:string}) {
  return (
    <LightNodeProvider options={{defaultBootstrap: true}}
    protocols={[Protocols.Store, Protocols.Filter, Protocols.LightPush]}
    >
    <div className="m-5 flex flex-col gap-5">
      <PageHeader
        title="Feed"
        subtitle="See what other think about this topic"
      />
      <WakuFeed topic={topic} id={id} />
    </div>
    </LightNodeProvider>
  );
}

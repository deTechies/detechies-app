import PageHeader from "@/components/metronic/header/page-header";
import { getTableland, tables } from "@/lib/tableland";
import CreatePool from "./_components/create-pool";
import PoolList from "./_components/pool-list";

export default async function Funds({
    params,
    }: {
    params: { address: string };
}) {
    //now we want to check if there is a profile for this name or uuid. 
    const data = await getTableland(`SELECT * FROM ${tables.profiles} WHERE metadata='${params.address}'`)

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title="Funds" subtitle="Find funds here.">
        {data && data.length > 0 && data[0].profileID && <CreatePool profileId={data[0].profileID} />}
      </PageHeader>
      
      <section>
        {data.length > 0 ? 
        <PoolList profileId={data[0].profileID} />
        : "No data found"   }
      </section>
    </div>
    
    
  );
}

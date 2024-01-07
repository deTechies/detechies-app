import { getClub } from "@/lib/data/groups";
import CreateGroupContract from "./_components/create-group-contract";
import { CreateNFTForm } from "./create-nft-form";


export default async function CreateNFT({
    params
}: {params: any}) {
  
  const group = await getClub(params.address);
  
  if(!group.contract_address){
    return (
      <CreateGroupContract group={group}/>
    )
  }
  return (
    

    <main className="w-full max-w-[60rem] m-8 mx-auto">
        <CreateNFTForm groupId={params.address} />
    </main>
  )
}

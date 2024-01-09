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
<<<<<<< HEAD
    

    <main className="w-full max-w-[60rem] m-8 mx-auto">
=======
    <main className="max-w-2xl mx-auto m-8 w-full">
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0
        <CreateNFTForm groupId={params.address} />
    </main>
  )
}

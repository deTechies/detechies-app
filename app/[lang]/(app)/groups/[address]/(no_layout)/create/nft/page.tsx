import { getClub } from "@/lib/data/groups";
import CreateGroupContract from "./_components/create-group-contract";
import { CreateNFTForm } from "./create-nft-form";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

export default async function CreateNFT({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  
  const {data: group} = await getClub(params.address);
  
  if(!group.contract){
    return (
      <CreateGroupContract group={group} lang={dictionary}/>
    )
  }
  return (
    <main className="w-full max-w-[60rem] m-8 mx-auto">
      <CreateNFTForm group={group} lang={dictionary}/>
    </main>
  );
}

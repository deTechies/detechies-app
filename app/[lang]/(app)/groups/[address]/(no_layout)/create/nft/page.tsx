import { CreateNFTForm } from "./create-nft-form";


export default function CreateNFT({
    params
}: {params: any}) {
  return (
    <main className="max-w-2xl mx-auto m-8 w-full">
        <CreateNFTForm groupId={params.address} />
    </main>
  )
}

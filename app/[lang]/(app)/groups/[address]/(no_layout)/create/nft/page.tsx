import { CreateNFTForm } from "./create-nft-form";


export default function CreateNFT({
    params
}: {params: any}) {
  return (
    <main className="w-full max-w-2xl m-8 mx-auto">
        <CreateNFTForm groupId={params.address} />
    </main>
  )
}

import { CreateNFTForm } from "./create-nft-form";


export default function CreateNFT({
    params
}: {params: any}) {
  return (
    // Temporarily insert fixed values ​​(to work with grid later)

    <main className="w-full max-w-[60rem] m-8 mx-auto">
        <CreateNFTForm groupId={params.address} />
    </main>
  )
}

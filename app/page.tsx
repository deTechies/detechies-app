"use client"
import DisplayNFT from "@/components/nft/display-nft";
import useFetchData from "@/lib/useFetchData";
import { useAccount } from "wagmi";


export default function Home() {
  
  const {address} = useAccount();
  //make sure that we return the full list if ther eis an acount
  

  const {data, loading, error} = useFetchData<any>(`/achievement/all`);

  return (
    <main className="flex flex-col items-center justify-between m-20 gap-4">
      <h2 className="text-2xl font-medium text-text-primary">All available achievements</h2>
      <div className="grid grid-cols-4 gap-4">
        {
          data?.map((achievement:any) => {
            return (
             <DisplayNFT {...achievement}/>
            )
          })
        }
      </div>
      

    
    </main>
  )
}

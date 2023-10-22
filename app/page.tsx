"use client"
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";


export default function Home() {
  
  const {address} = useAccount();
  //make sure that we return the full list if ther eis an acount
  
  const [profile, setProfile] = useState<any>(null);
  
  
  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await fetch(`https://api.web3.bio/profile/0xfff09621f09caa2c939386b688e62e5be19d2d56`);
      const data = await res.json();
      console.log(data);

      setProfile(data);
    }
    
    if(address){
      fetchProfiles();
      
    }
  }, [address])
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        Coming soon!
      </div>
    
    </main>
  )
}

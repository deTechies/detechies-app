"use client";



import { useEffect, useState } from "react";
import { useAccount } from "wagmi";


import useFetchData from "@/lib/useFetchData";
import ProfileDetails from "../../profile/profile-details";
import ProfileItems from "../../profile/profile-items";


//categories 


export default function ProfileMe() {

  const [profile, setProfile] = useState<any>(null);
  const { address } = useAccount();
  
  const {data, loading} = useFetchData<any>("/nft/all/" + address);


  
  useEffect(() => {
    const getUserDetails = async () => {
      const url = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
      const result = await fetch(url + "/polybase/" + address).then((res) => res.json());
      setProfile(result.message);
    }
    
    if(address){
      getUserDetails();
    }
  }, [address])
  
  const categories = [
    "Education", "Hackathon", "Project", "Experience", "Community", "Skills", "Other"
  ]



  //we goging to makes ure taht we have a profile to be minded 
  
  if(loading){
    return <div>Loading...</div>
  }

  return (
          <>
            <ProfileDetails profile={{...profile}} />
            {categories.map((category:string, index:number) => {
                return <ProfileItems items={[]} name={category} key={index} />;
            })}
          </>
  );
}

"use client";



import { useState } from "react";
import { useAccount } from "wagmi";


import useFetchData from "@/lib/useFetchData";
import ProfileDetails from "../../profile/profile-details";
import ProfileItems from "../../profile/profile-items";


//categories 


export default function ProfileMe() {

  const [profile, setProfile] = useState<any>(null);
  const { address } = useAccount();
  
  const {data, loading} = useFetchData<any>("/nft/all/" + address);
  
  const {data:profileData, error:profileError, loading:profileLoading} =useFetchData<any>("/polybase/" + address);


  
 
  
  const categories = [
    "Education", "Hackathon", "Project", "Experience", "Community", "Skills", "Other"
  ]



  //we goging to makes ure taht we have a profile to be minded 
  
  if(loading){
    return <div>Loading...</div>
  }

  return (
          <>
            <ProfileDetails profile={profileData} loading={profileLoading} error={profileError} />
            {categories.map((category:string, index:number) => {
                return <ProfileItems items={[]} name={category} key={index} />;
            })}
          </>
  );
}

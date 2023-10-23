"use client";



import useFetchData from "@/lib/useFetchData";
import { useAccount } from "wagmi";
import GithubProfile from "./github";
import ProfileDetails from "./profile-details";
import ProfileItems from "./profile-items";

//categories 


export default function ProfileMe() {


  const { address } = useAccount();
  
  const {data:profile, loading:profileLoading, error:profileError} = useFetchData<any>("/polybase/" + address);




  //we goging to makes ure taht we have a profile to be minded 
  

  return (
          <>
            <ProfileDetails profile={profile} loading={profileLoading} error={profileError} />
           {address && <ProfileItems address={address} /> }
           
           {profile && profile?.message?.github && <GithubProfile username={profile?.message.github} />}
          </>
  );
}

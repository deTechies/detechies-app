"use client";



import useFetchData from "@/lib/useFetchData";
import { DribbbleIcon, Figma, Github, SunMedium, Twitter } from "lucide-react";
import { useAccount } from "wagmi";
import ProfileDetails from "./profile-details";
import ProfileItems from "./profile-items";

//categories 


export default function ProfileMe() {


  const { address } = useAccount();
  
  const {data:profile, loading:profileLoading, error:profileError} = useFetchData<any>("/polybase/" + address);



  
  const categories = [
    "Main Account", "TokenBound"
  ]


  const oldprofile = {
    name: "Careersona",
    role: "Frontend Developer",
    username: "@Kakaobank",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor. Nulla facilisi. More info at https://careersona.io",
    badges: [
      { name: "Seoul University", color: "bg-green-300" },
      { name: "TOEIC950", color: "bg-red-300" },
      { name: "Kakaobank", color: "bg-blue-300" },
      { name: "EtherTokyo Most Innovate", color: "bg-indigo-300" },
    ],
    links: [
      {
        icon: <Github />,
        url: "https://github.com",
      },
      {
        icon: <Figma />,
        url: "https://github.com",
      },
      {
        icon: <Twitter />,
        url: "https://github.com",
      },
      {
        icon: <SunMedium />,
        url: "https://github.com",
      },
      {
        icon: <DribbbleIcon />,
        url: "https://dribble.com",
      },
    ],
}

  //we goging to makes ure taht we have a profile to be minded 
  

  return (
          <>
            <ProfileDetails profile={profile} loading={profileLoading} error={profileError} />
            {categories.map((category:string, index:number) => {
                return <ProfileItems items={[]} name={category} key={index} />;
            })}
          </>
  );
}

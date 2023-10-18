"use client";



import { DribbbleIcon, Figma, Github, SunMedium, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ProfileDetails from "./profile-details";
import ProfileItems from "./profile-items";

//categories 


export default function ProfileMe() {

  const [profile, setProfile] = useState<any>(null);
  const { address } = useAccount();


  
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
            <ProfileDetails profile={oldprofile} />
            {categories.map((category:string, index:number) => {
                return <ProfileItems items={[]} name={category} key={index} />;
            })}
          </>
  );
}

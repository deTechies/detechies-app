"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useAccount } from "wagmi";
import Connections from "./connections";

export default function ProfileDetails({ profile }: { profile: any }) {
  
  const colors = ["red", "blue", "green", "indigo", "gray"];
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return `bg-${colors[randomIndex]}-300 text-${colors[randomIndex]}-500`;
};
const {address} = useAccount();




//we want to import here all the valuable data from next.id and make sure that we can easily use it. 






  return (
    <Card>
      <CardContent className="flex flex-col gap-8">
        {profile?.description && (
          <section className="border border-border-div rounded-sm flex flex-col px-4 py-3 gap-3">
            <h5 className="text-normal text-black-normal font-medium">Description</h5>

            <p>{profile?.description}</p>
          </section>
        )}
       <Connections />
      </CardContent>
    </Card>
  );
}

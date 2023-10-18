import MemberCard from "@/components/card/member-card";
import AddMemberModal from "@/components/extra/add-member";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Address } from "wagmi";

export default function ProjectMembers({workers}: {workers: string[]}) {
    //getting all the members and holders of this project NFT. 
  return (
    <Card>
        <CardHeader className="flex items-center justify-between">
            Members
            
            <AddMemberModal type="project" />
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
            { workers && 
                workers.map((worker, index) => (
              <MemberCard key={index} address={worker as Address} />
                ))  
            }   
        </CardContent>
    </Card>
  )
}

import MemberCard from "@/components/card/member-card";
import AddMemberModal from "@/components/extra/add-member";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Address, useAccount } from "wagmi";

export default function ProjectMembers({workers, creator}: {workers: string[], creator: string}) {
    //getting all the members and holders of this project NFT. 
    const {address} = useAccount();
  return (
    <Card>
        <CardHeader className="flex items-center justify-between">
            Members
            {creator == address?.toLowerCase() && <AddMemberModal type="project" />}
            
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

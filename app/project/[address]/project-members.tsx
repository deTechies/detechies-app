import MemberCard from "@/components/card/member-card";
import AddMemberModal from "@/components/extra/add-member";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Address, useAccount } from "wagmi";

export default function ProjectMembers({members, creator}: {members: any[], creator: string}) {
    //getting all the members and holders of this project NFT. 
    const {address} = useAccount();

  return (
    <Card>
        <CardHeader className="flex items-center justify-between">
            Members
            {creator == address?.toLowerCase() && <AddMemberModal type="project" />}
            
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
            { members && 
                members.map((member, index) => (
              <MemberCard key={index} address={member.address as Address} />
                ))  
            }   
        </CardContent>
    </Card>
  )
}

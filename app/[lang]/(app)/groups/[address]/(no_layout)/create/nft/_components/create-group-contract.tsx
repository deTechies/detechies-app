"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ABI, MUMBAI } from "@/lib/constants";
import { Club } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { useContractWrite } from "wagmi";

export default function CreateGroupContract({
    group
}: {group: Club}) {
    
    const { write, data, isLoading, error } = useContractWrite({
      address: MUMBAI.groupRegistry,
      abi: ABI.groupRegistry,
      functionName: "createGroup",
    });
  
    const createGroup = async () => {
        
        const groupDetails = await uploadContent(JSON.stringify(group));
        
        await write({
            args: [group.name, group.image, groupDetails],
        });
    }
  return (
    <main className="m-8">
    <Card>
        <p>
            In order to use the achievements you need to create your own achievements collection on chain. 
            
        </p>
        <Button className="mt-4"
            onClick={createGroup}
        >
            Create Group Contract
        </Button>
    </Card>
    </main>
  )
}

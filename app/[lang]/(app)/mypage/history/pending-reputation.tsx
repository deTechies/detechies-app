"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { postServer } from "@/lib/data/postRequest";
import { useRouter } from "next/navigation";

export default function PendingReputation({ item }: any) {
    const router = useRouter();
    const acceptRequest = async () => {
        
        const body = JSON.stringify({
            id: item.id,
            status: "accepted"
        })
        const result = await postServer(`/survey-access/grantReportAccess`, body);
        console.log(result);
        toast({
            description: "You have accepted the request",
        })
        router.refresh();
    }
  return (
    <div >
      {item.id}

      {item.status === "pending" &&
      <Button onClick={acceptRequest}>Accept</Button>}
    </div>
  );
}

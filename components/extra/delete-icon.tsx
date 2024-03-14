"use client"
import { API_URL } from "@/lib/constants";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function DeleteIcon({ url }: { url: string }) {
  const { data: session } = useSession();
  const deleteMe = async () => {
    const result = await fetch(API_URL + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.web3.accessToken}`,
        "x-api-key": "API_KEY",
      },
    });
    
    
    if (!result.ok) {
        const data = await result.json();
        toast({ title: "Error", description: data.message });
      return;
    }
    

    
    
    
    toast({ title: "Deleted", description: result.toString()});
  };
  return (
    <Button onClick={deleteMe} variant={"destructive"}>
      <Trash2 />
    </Button>
  );
}

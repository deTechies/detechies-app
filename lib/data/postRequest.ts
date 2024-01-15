import { toast } from "@/components/ui/use-toast";
import { getSession } from "next-auth/react";
import { API_URL } from "../constants";

export async function postServer(endpoint:string, body?:string){
    const session = await getSession();
  
    if (!session || !session.web3 || !session.web3.accessToken) {
      throw new Error("Invalid session or missing access token");
    }
  
    const url = `${API_URL}${endpoint}`;
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
    } as any;
  
    if (body) {
      options.body = body;
    }
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
        const result = await response.json();
        toast({
            title: `Failed to POST data from ${endpoint}`,
            description: result.message,
        });
    }else {
        toast({
            title: "Success",
            description: `You will be redirected to the shortly page`,
          });
    }
  
    return response.json();
  }

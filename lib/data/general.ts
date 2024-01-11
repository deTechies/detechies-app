import { toast } from "@/components/ui/use-toast";
import { API_URL } from "../constants";
import { auth } from "../helpers/authOptions";

export async function serverApi(endpoint:string, method = 'GET', body = null) {
    const session = await auth();
  
    if (!session || !session.web3 || !session.web3.accessToken) {
      throw new Error("Invalid session or missing access token");
    }
  
    const url = `${API_URL}${endpoint}`;
  
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
    } as any;
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
        toast({
            title: "Error",
            description: `Failed to ${method} data from ${endpoint}`,
          });
          
    }
  
    return response.json();
  }
  
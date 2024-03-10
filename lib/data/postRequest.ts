import { toast } from "@/components/ui/use-toast";
import { getSession } from "next-auth/react";
import { API_URL } from "../constants";

export async function postServer(endpoint: string, body?: string, lang?: any) {
  const session = await getSession();

  if (!session || !session.web3 || !session.web3.accessToken) {
    toast({
      title: "You are not logged in",
      description: "Please log in to continue, if not possible. Please try again.",
      variant: "destructive"
    })
    return;
  }

  const url = `${API_URL}${endpoint}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "API_KEY",
      Authorization: `Bearer ${session.web3.accessToken}`,
    },
  } as any;

  if (body) {
    options.body = body;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const result = await response.json();

    if(result.messageCode == "invalid_verification_code" && lang){
      toast({
        description: lang.validation.onboard.email.invalid_verification_code,
        variant: "destructive"
      });
    } else{
      toast({
        description: result.message,
        variant: "destructive"
      });
    }
    console.log(result);
    return;
  } else {
    toast({
      title: "Success",
      description: `You will be redirected to the page shortly.`,
    });
  }

  return response.json();
}

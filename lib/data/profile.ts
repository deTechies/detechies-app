import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { API_URL } from "../constants";

export async function updateUserProfile(data: any) {
    console.log("testing if it works");
    const session = await getSession();
  if (!session?.web3?.user) {
    redirect("/onboard");
  }
  const address = session.web3.address;
  
  const result = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({
      ...data,
      userId: address,
    }),
  });
  
    
  
  return result.json();
}

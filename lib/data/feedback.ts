import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { auth } from "../helpers/authOptions";

export async function getQuestions() {
    console.log("testing if it works");
    const session = await auth();
  
  const result = await fetch(`${API_URL}/question`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.web3?.accessToken}`,
    },
  });
  
  return result.json();
}

export async function createQuestion(data: any){
    const session = await getSession();
    const result = await fetch(`${API_URL}/question`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.web3?.accessToken}`,
        },
        body: JSON.stringify({
        ...data,
        }),
    });
    
    return result.json();
}
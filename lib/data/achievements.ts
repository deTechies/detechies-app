
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { auth, authOptions } from "../helpers/authOptions";

export async function getUserAchievements(address?:string) {
  //getting profile session
  
  if(!address){
    const session = await getServerSession(authOptions) as Session;
    address = session?.web3?.address;

  }
  
  return [];
  //TODO: needs implementation

  }
  
  export async function getGroupAchievements(address:string){
    const session = await auth();
    
    //getting all the achievemnts
    const response = await fetch(`${API_URL}/achievement/club/${address}`, {
      method: 'GET', 
      headers: {
        Authorization: `Bearer ${session?.web3.accessToken}`
      }
    })
    return response.json();
  }
  
  
  export async function getAllAchievements(){
    const res = await fetch(`${API_URL}/achievement/all`)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
  }
  
  export async function uploadAchievement(data:any){
    const session = await getSession();

    // Check for a valid session and required tokens
    if (!session || !session.web3 || !session.web3.accessToken) {
      throw new Error("Invalid session or missing access token");
    }
  
    const response = await fetch(`${API_URL}/achievement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
      body: JSON.stringify(data),
    });
  
    return response.json();
    
  }
  
  export async function requestAchievement(achievementId:string){
    const session = await getSession();

    // Check for a valid session and required tokens
    if (!session || !session.web3 || !session.web3.accessToken) {
      throw new Error("Invalid session or missing access token");
    }
  
    const response = await fetch(`${API_URL}/achievement-rewards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
      body: JSON.stringify({
        achievementId: achievementId,
        userId: session.web3.user.id,
      }),
    });
  
    return response.json();
  }

  
  export async function getPendingAchievements(address:string){

   return [];
  }
   
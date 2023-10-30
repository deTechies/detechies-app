import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { API_URL } from "../constants";

export async function getUserAchievements(address?:string) {
  //getting profile session
  
  if(!address){
    const session = await getServerSession(authOptions) as Session;
    address = session?.web3?.address;
  }
    const res = await fetch(`${API_URL}/achievement/userAchievements/${address}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
  
  export async function getGroupAchievements(address:string){
    const res = await fetch(`${API_URL}/achievement/getByGroup/${address}`)
    
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
  }
  
  export async function getPendingAchievements(address:string){
    const res = await fetch(`${API_URL}/achievement/getAchievementRequests/${address}`)
    
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
  }
   
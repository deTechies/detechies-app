import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { API_URL } from "../constants";

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
    return [];
  }
  
  export async function getAllAchievements(){
    const res = await fetch(`${API_URL}/achievement/all`)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
  }

  
  export async function getPendingAchievements(address:string){

   return [];
  }
   
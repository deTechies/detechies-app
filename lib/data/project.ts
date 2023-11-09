import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { API_URL } from "../constants";

export async function getSingleProject(address:string) {
  //getting profile session
  const session = (await getServerSession(authOptions)) as any;
  
    const res = await fetch(`${API_URL}/project/single/${address}`, { next: { revalidate: 60 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    
    
    console.log(res)
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
    //we want to check if the user is amember 
    
    const data = await res.json()
    
    //check if creator and if memerb
    data.isCreator = data.creator === session?.web3?.address.toLowerCase();
    data.isMember = data.members.find((member: any) => member.address === session?.web3?.address.toLowerCase());
    
   
    return data;
  }

export async function getProjects() {
    const res = await fetch(`${API_URL}/project/all`, { next: { revalidate: 60 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}
   
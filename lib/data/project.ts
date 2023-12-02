import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import { API_URL } from "../constants";
import { CreateProject } from "../interfaces";

export async function getSingleProject(id:string) {
  //getting profile session
  const session = (await getServerSession(authOptions)) as any;
  
    const res = await fetch(`${API_URL}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.web3?.accessToken}`,
      },
    } )

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
    const result = await res.json()
    
    result.isCreator = result.owner === session?.web3?.address
    
    
    //we want to check if the user is amember 
    
    return result;
   
  }
  
  export async function updateProject(id: string, name:string, description:string){
    const session = await getSession();
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.web3?.accessToken}`,
      },
      body: JSON.stringify({ name: name, description: description }),
    });
    
    if(!response.ok){
      throw new Error("Failed to update project")
    }

    revalidateTag('projects')
    return response.json();
  }
  
  export async function createProject(formData: CreateProject) {
    const session = await getSession();
    const response = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.web3?.accessToken}`,
      },
      body: JSON.stringify({ ...formData, owner: session?.web3?.address }),
    });
    
    if(!response.ok){
      throw new Error("Failed to create project")
    }

    revalidateTag('projects')
    return response.json();
  }

export async function getProjects() {
  const session = (await getServerSession(authOptions)) as any;
    const res = await fetch(`${API_URL}/projects`,  {
      headers: {
        Authorization: `Bearer ${session?.web3?.accessToken}`,
      },
       next: { tags: ['projects'] } 
      
    }, )
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}
   
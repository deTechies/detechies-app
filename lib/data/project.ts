
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { authOptions } from "../helpers/authOptions";
import { CreateProject, JoinProject } from "../interfaces";

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


export async function inviteProjectMembers(members: string[], role:string,  projectId: string){
  const session = await getSession();
  const response = await fetch(`${API_URL}/project-member/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({ userId: members, projectId: projectId,role:role, inviterId: session?.web3?.address}),
  });
  
  if(!response.ok){
    throw new Error("Failed to invite members")
  }

  return response.json();
}

export async function getPendingProjectMembers(address: string) {
  const session = (await getServerSession(authOptions)) as any;
  if(!address){
    return;
  }
  const response = await fetch(
    `${API_URL}/project-member/invites/${address}`,
    
    { 
      headers: {
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
      next: { revalidate: 1 } }
  );
  const data = await response.json();
  
  console.log(data);

  return data;
}
   

export async function joinProject(data: JoinProject ){
  const session = await getSession();
  
  const response = await fetch(`${API_URL}/project-member/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({ userId: session?.web3.address, projectId: data.projectId, message: data.message, role: data.role }),
  });
  
  if(!response.ok){
    throw new Error("Failed to join project")
  }
  
  return true;
}

export async function inviteByEmail(name: string, email:string, projectId: string){
  return null;
}
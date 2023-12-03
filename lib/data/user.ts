

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { API_URL } from "../constants";

const newURL = 'http://localhost:4000'
export async function getUserProfile(address?: string) {
  //getting profile session
  

  if (!address) {
    const session = (await getServerSession(authOptions)) as Session;
    
    
    const user = await fetch(`http://localhost:4000/users/${session?.web3.address}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.web3.accessToken}`,
      },
    });
    

    const data = await user.json();
    console.log(data)

    if (!user.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    
    return data;
    //return session.web3.user;
  }
  
  

  const res = await fetch(`${API_URL}/users/${address}`);
  // The return value is *not* serializedå
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null;
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getUsers(){
  const res = await fetch(`${API_URL}/users`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function sendVerifyEmail(code: string) {
  //const session = (await getServerSession(authOptions)) as Session;
  const session = await getSession() as Session
  
  const res = await fetch(`${newURL}/users/verify?token=${code}`, 
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.web3.accessToken}`
    }
  }
  )

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}



export async function getUserSession(){
  const session = (await getServerSession(authOptions)) as Session;
  if(!session?.web3?.user) {
    redirect("/onboard");
  }
  return session.web3;
}

export async function getUserConnections(address: string) {
  const res = await fetch(`${API_URL}/nextid/user/profile/ethereum/${address}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getGithubToken() {
  const res = await fetch(`/api/auth/github`);
  const result = await res.json();


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  
  return result;
}

// src/services/accountService.ts
export async function checkTBA(): Promise<any> {
  const session = await getSession() as Session;
  if(!session?.web3?.user) {
    redirect("/onboard");
  }
  const result = await fetch(`${API_URL}/polybase/${session.web3.user.id}`).then(res => res.json());
  return result;
}

export const createUser = async (formData: FormData) => {
  
  const session = await getSession() as Session;
  
  try{
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
  }catch(err){
    console.log(err)
  }
 
}

export async function updateTBA(tba: any): Promise<any> {
  const session =await getSession() as Session;
  if(!session?.web3?.user) {
    redirect("/onboard");
  }
  
  console.log(tba)
  const address = session.web3.user.id;
  const result = await fetch(`${API_URL}/polybase/update/tba`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address: address,
      tba: tba
    })
  }).then(res => res.json());
  return result;
}

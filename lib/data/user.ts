
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { API_URL } from "../constants";

export async function getUserProfile(address?: string) {
  //getting profile session

  if (!address) {
    const session = (await getServerSession(authOptions)) as Session;
    if(!session?.web3?.user) {
      redirect("/onboard");
    }
    return session.web3.user;
  }

  const res = await fetch(`${API_URL}/polybase/${address}`);
  // The return value is *not* serializedå
  // You can return Date, Map, Set, etc.

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
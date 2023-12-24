import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { auth, authOptions } from "../helpers/authOptions";
import { CreateClub } from "../interfaces";

export async function getGroups(search?: string) {
  const session = (await getServerSession(authOptions)) as any;
  const response = await fetch(`${API_URL}/clubs`, {
    headers: {
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  return response.json();
}

export async function getClub(clubId: string) {
  const session = (await getServerSession(authOptions)) as any;

  if (!session?.web3?.accessToken) {
    throw new Error("Session not found or address missing in session");
  }
  const response = await fetch(`${API_URL}/clubs/${clubId}`, {
    headers: {
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  return response.json();
}

//get the interface for the group
export async function createGroup(formData: CreateClub) {
  const session = await getSession();
  const response = await fetch(`${API_URL}/clubs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({ ...formData, owner: session?.web3?.address }),
  });
  const data = await response.json();
  return data;
}

/* export async function getGroupDetail(address: string) {
  const response = await fetch(`${API_URL}/group/single/${address}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  const session = (await getServerSession(authOptions)) as any;

  console.log(data);

  const isMember = data.members.find(
    (member: any) => member.address === session?.web3?.address.toLowerCase()
  );
  const isOwner = data.creator === session?.web3?.address.toLowerCase();
  return { ...data, isMember: isMember, isOwner: isOwner };
} */

export async function getPendingMembers(address: string) {
  const session = await auth();
  const response = await fetch(`${API_URL}/project/${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  return response.json();
}

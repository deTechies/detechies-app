
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { authOptions } from "../helpers/authOptions";

async function getSessionAddress() {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session || !session.web3?.address) {
    throw new Error("Session not found or address missing in session");
  }
  return session;
}

export async function getFollowingList(address?: string) {
/*   const session = await getSessionAddress();
  address = address || session.web3.address;
  const response = await fetch(`${API_URL}/networking/following/${address}`, {
    headers: {
      Authorization: `Bearer ${session.web3.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch following list");
  }

  return response.json(); */
  return [];
}

export async function getFollowersList(address?: string) {
  const session = await getSessionAddress();
  address = address || session.web3.address;
  const response = await fetch(`${API_URL}/networking/followers/${address}`, {
    headers: {
      Authorization: `Bearer ${session.web3.accessToken}`,
    },
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch followers list");
  }

  return response.json();
}

export async function startFollow(address: string) {
  const session = (await getSession()) as Session;
  const response = await fetch(`${API_URL}/networking/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.web3.accessToken}`,
    },
    body: JSON.stringify({following: address, follower: session.web3.address }),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to start following");
  }

  return response.json();
}

export async function deleteFollowUser(address: string) {
  const session = (await getSession()) as Session;
  const response = await fetch(`${API_URL}/networking/${address}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.web3.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to unfollow user");
  }

  return response.json();
}

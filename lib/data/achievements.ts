import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { auth } from "../helpers/authOptions";

export async function getUserAchievements(address?: string) {
  //getting profile session
  const session = await auth();
  if (!address) {
    address = session?.web3?.address;
  }

  const response = await fetch(`${API_URL}/achievement-rewards/wallet/${address}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.web3.accessToken}`,
    },
  });
  return response.json();
  //TODO: needs implementation
}

export async function getGroupAchievements(address: string) {
  const session = await auth();

  //getting all the achievemnts
  const response = await fetch(`${API_URL}/achievement/club/${address}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.web3.accessToken}`,
    },
  });
  return response.json();
}

export async function getAllAchievements() {
  const res = await fetch(`${API_URL}/achievement/all`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function uploadAchievement(data: any) {
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

export async function requestAchievement(achievementId: string) {
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

export async function updateNFTRequest(
  achievementId: string,
  status: string,
  transactionHash?: string
) {
  const session = await getSession();

  // Check for a valid session and required tokens
  if (!session || !session.web3 || !session.web3.accessToken) {
    throw new Error("Invalid session or missing access token");
  }

  const response = await fetch(`${API_URL}/achievement-rewards/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.web3.accessToken}`,
    },
    body: JSON.stringify({
      achievementId: achievementId,
      status: status,
      data: transactionHash,
    }),
  });

  return response.json();
}

export async function getPendingAchievements(address: string) {
  const session = await auth();
  const response = await fetch(
    `${API_URL}/achievement-rewards/${address}/pending`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.web3.accessToken}`,
      },
    }
  );

  return response.json();
}

export async function rewardMissionNFT(
  userId: string,
  achievementId: string,
  tokenId: string,
  data?: string
) {
  const session = await getSession();

  // Check for a valid session and required tokens
  if (!session || !session.web3 || !session.web3.accessToken) {
    throw new Error("Invalid session or missing access token");
  }

  const response = await fetch(`${API_URL}/achievement-rewards/nft-reward`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.web3.accessToken}`,
    },
    body: JSON.stringify({
      userId: userId,
      achievementId: achievementId,
      tokenId: tokenId,
    }),
  });

  return response.json();
}

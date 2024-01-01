import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { auth } from "../helpers/authOptions";

export async function createMissionCampaign(data: any, groupId: string) {
  const session = await getSession();

  const url = new URL(`${API_URL}/mission/campaign`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({ ...data, clubId: groupId }),
  });

  // revalidatePath('/', 'layout')

  if (!response.ok) {
    //show me the result why its not ok
    return response.json();
  }

  return response.json();
}

export async function getClubMissions(groupId: string) {
  const session =  await auth();
  const url = new URL(`${API_URL}/mission/campaign/${groupId}`);

  if (!session?.web3?.accessToken) {
    throw new Error("No access token found");
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the survey id");
  }

  return response.json();
}

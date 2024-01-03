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
  const session = await auth();
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

export async function getUsersMissionProgress(missionId: string) {
  const session = await auth();
  const url = new URL(`${API_URL}/mission/progress/${missionId}`);

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

  if (response.status === 404) return null;

  return response.json();
}

export async function getMissionDetails(missionId: string) {
  const session = await auth();
  const url = new URL(`${API_URL}/mission/${missionId}`);

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
    return {
      error: "Failed to fetch the mission details",
    };
  }

  return response.json();
}



export async function startMissionCampaign(missionId: string) {
  const session = await getSession();

  const url = new URL(`${API_URL}/mission/progress`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({ campaignId: missionId, userId: session?.web3.address }),
  });

  // revalidatePath('/', 'layout')

  if (!response.ok) {
    //show me the result why its not ok
    return response.json();
  }

  return response.json();
}

export async function uploadMissionChanges(addedMissions: string[], removedMissions:string[], userId:string) {
  const payload = {
    addedMissionIds: addedMissions,
    removedMissionIds: removedMissions
  };
  
  const session = await getSession();

  try {
    const response = await fetch(API_URL + '/mission/progress/update', {
      method: 'PATCH', // or 'POST' depending on your backend setup
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.web3?.accessToken}`,
      },
      body: JSON.stringify({
        userId: userId,
        ...payload
      })
    });
    
    console.log(response)
    
    

    if (!response.ok) {
      const message = await response.json();
      throw new Error(`HTTP error! Status: ${message}`);
    }

    const data = await response.json();
    return({ title: "Successfully updated missions", description: data.message });
  } catch (error: any) {
    console.error('Failed to update user progress', error);
    return({ title: "Error updating missions", description: error.message });
  }
};


import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { auth, authOptions } from "../helpers/authOptions";
import { JoinProject } from "../interfaces";

export async function getSingleProject(id: string) {
  //getting profile session
  const session = (await getServerSession(authOptions)) as any;

  const res = await fetch(`${API_URL}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();

  return result.data;
}

export async function updateProject(data: any) {
  const session = await getSession();

  const response = await fetch(`${API_URL}/projects/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
      'x-api-key': 'API_KEY'
    },
    body: JSON.stringify({ ...data, owner: session?.web3?.address }),
  });
  

  if (!response.ok) {
    throw new Error("Failed to update project");
  }



  return response.json();
}

export async function deleteProject(id: string) {
  const session = await getSession();
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return response.json();
}

export async function createProject(formData: any) {
  const session = await getSession();
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
      "x-api-key": "API_KEY",
    },
    body: JSON.stringify({ ...formData, owner: session?.web3?.address }),
  });

  if (!response.ok) {

    throw new Error("Failed to create project");
  }

  return response.json();
}

export async function getProjects() {
  //const session = (await getServerSession(authOptions)) as any;

  const session = await auth();
  if (!session?.web3?.address) {
    throw new Error("No address found");
  }
  const res = await fetch(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    next: { tags: ["projects"] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function inviteProjectMembers(
  members: string[],
  role: string,
  projectId: string
) {
  const session = await getSession();
  const response = await fetch(`${API_URL}/project-member/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({
      userId: members,
      projectId: projectId,
      role: role,
      inviterId: session?.web3?.address,
    }),
  });

  return response.json();
}

export async function getPendingProjectMembers(address: string) {
  const session = (await getServerSession(authOptions)) as any;
  if (!address) {
    return;
  }
  const response = await fetch(
    `${API_URL}/project-member/invites/${address}`,

    {
      headers: {
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
      next: { revalidate: 1 },
    }
  );
  const data = await response.json();

  return data.data;
}

export async function acceptProjectMember(projectMemberId: string){
  const session = await getSession();

  const response = await fetch(`${API_URL}/project-member/accept/member/${projectMemberId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });
  
  return response.json();
}


export async function acceptProjectInvitation(projectMemberId: string){
  const session = await getSession();

  const response = await fetch(`${API_URL}/project-member/accept/invite/${projectMemberId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  
  return response.json();
}

export async function joinProject(data: JoinProject) {
  const session = await getSession();

  const response = await fetch(`${API_URL}/project-member/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({
      userId: session?.web3.address,
      projectId: data.projectId,
      message: data.message,
      role: data.role,
    }),
  });


  return response;
}

export async function inviteByEmail(
  name: string,
  email: string,
  projectId: string
) {
  return null;
}

export async function getSessionToken() {
  const session = await auth();
  return session;
}

export async function addMembersWork(
  contributionData: any,
  projectId: string
) {
  const session = await getSession();

  // Check for a valid session and required tokens
  if (!session || !session.web3 || !session.web3.accessToken) {
    throw new Error("Invalid session or missing access token");
  }

  const response = await fetch(`${API_URL}/project-work`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "API_KEY", // TODO: replace with "x-api-key"
      Authorization: `Bearer ${session.web3.accessToken}`,
    },
    body: JSON.stringify({
      userId: session.web3.address,
      projectId,
      ...contributionData,
      percentage: contributionData.percentage[0],
    }),
  });

  return response.json();
}

export async function removeProjectWork(
  projectId: string
) {
  const session = await getSession();

  // Check for a valid session and required tokens
  if (!session || !session.web3 || !session.web3.accessToken) {
    throw new Error("Invalid session or missing access token");
  }

  const response = await fetch(`${API_URL}/project-work/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.web3.accessToken}`,
    },
    body: JSON.stringify({
      userId: session.web3.address,
      projectId,
    }),
  });

  return response.json();
}

export async function removeProjectMember(memberId:string){
  const url = API_URL + '/project-member/' + memberId
  const session = await getSession();

  // Check for a valid session and required tokens
  if (!session || !session.web3 || !session.web3.accessToken) {
    throw new Error("Invalid session or missing access token");
  }
  const response = await fetch(url, 
    {
      method: "DELETE", 
      headers: {
        Authorization: `Bearer ${session.web3.accessToken}`
      } 
    })

  return response.json();
}

export async function getProjectMember(projectId: string, userId: string) {
  const session = await auth();
  const url = new URL(`${API_URL}/project-member/single`);
  url.searchParams.append("projectId", projectId);
  url.searchParams.append("userId", userId);

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
    throw new Error("Failed to fetch project member");
  }

  return response.json();
}


//TODO: renaming for better understanding
export async function getProjectWork(id:string){
  const session = await auth();
  const url = new URL(`${API_URL}/survey-response/surveyByWork/${id}`);

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
  
  return response.json();
}

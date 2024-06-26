"use server";

import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { API_URL } from "../constants";
import { auth, authOptions } from "../helpers/authOptions";

export async function getUserProfile(address?: string) {
  const session = (await auth()) as Session;
  if (!address) {
    if (!session) {
      redirect("/onboard");
    }
    if (!session?.web3?.address) {
      redirect("/onboard");
    }
    const user = await fetch(`${API_URL}/users/${session?.web3?.address}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "API_KEY",
        Authorization: `Bearer ${session?.web3.accessToken}`,
      },
    });
    if (!user.ok) {
      // This will activate the closest `error.js` Error Boundary
      const result = await user.json();
      throw new Error(result.message);
    }

    const result = await user.json();

    return result;
  }

  const res = await fetch(`${API_URL}/users/${address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "API_KEY",
      Authorization: `Bearer ${session?.web3.accessToken}`,
    },
  });
  // The return value is *not* serializedå
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getUsers() {
  const session = await auth();
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3.accessToken}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function sendVerifyEmail(code: string) {
  const session = await getSession();

  const res = await fetch(`${API_URL}/users/verify?token=${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  if (!res.ok) {
    return null;
  }

  return true;
}

export async function getUserSession() {
  const session = (await getServerSession(authOptions)) as Session;
  if (!session?.web3?.user) {
    redirect("/onboard");
  }
  return session.web3;
}

export async function getUserById(id: string) {
  const session = await auth();
  const res = await fetch(
    `${API_URL}/users/profile/${id}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.web3?.accessToken}`,
      },
    }
  );

  const result = await res.json();

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return result;
}

export async function getUserConnections(address: string) {
  //TODO: needs implementation

  return null;
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
  const session = (await getSession()) as Session;
  if (!session?.web3?.user) {
    redirect("/onboard");
  }
  const result = await fetch(
    `${API_URL}/polybase/${session.web3.user.id}`
  ).then((res) => res.json());
  return result;
}

export const createUser = async (formData: FormData) => {
  const session = (await getSession()) as Session;

  try {
    await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (err) {
    return;
  }
};

export async function updateTBA(tba: any): Promise<any> {
  const session = (await getSession()) as Session;
  if (!session?.web3?.user) {
    redirect("/onboard");
  }

  const address = session.web3.user.id;
  const result = await fetch(`${API_URL}/polybase/update/tba`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      tba: tba,
    }),
  }).then((res) => res.json());
  return result;
}

export async function updateUserAvatar(avatar: string[]) {
  const session = await auth();

  const result = await fetch(`${API_URL}/users/save-avatar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({ avatar: avatar }),
  });

  return result.json();
}

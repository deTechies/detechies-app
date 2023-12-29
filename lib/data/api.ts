// api.ts
import { NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { API_URL } from "../constants";

const getHeaders = async (): Promise<HeadersInit> => {
  const session: Session | null = await getSession();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.web3?.accessToken}`,
  };
};

const handleResponse = async <T>(
  response: Response
): Promise<NextApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API request failed");
  }
  return response.json();
};

export const fetchGet = async <T>(url: string): Promise<NextApiResponse<T>> => {
  const headers = await getHeaders();
  const response = await fetch(url, { headers });
  return handleResponse<T>(response);
};

export const fetchPost = async <T>(url: string, body: any): Promise<any> => {
  const session = await getSession();
  if (!session || !session.web3 || !session.web3.accessToken) {
    throw new Error("Invalid session or missing access token");
  }
  const response = await fetch(API_URL + url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const fetchPatch = async <T>(
  url: string,
  body: object
): Promise<NextApiResponse<T>> => {
  const headers = await getHeaders();
  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
};

export const fetchDelete = async <T>(
  url: string
): Promise<NextApiResponse<T>> => {
  const headers = await getHeaders();
  const response = await fetch(url, {
    method: "DELETE",
    headers,
  });
  return handleResponse<T>(response);
};

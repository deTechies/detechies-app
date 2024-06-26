import { clsx, type ClassValue } from "clsx";

import { getWalletClient } from "@wagmi/core";
import { Signer, providers } from "ethers";
import * as React from "react";
import { extendTailwindMerge } from "tailwind-merge";
import { WalletClient } from "viem";
import { useWalletClient } from "wagmi";
import { timezoneInt } from "./helpers/timezone";

export function addURL(link: string) {
  return link.includes("http") ? link : `https://ipfs.io/ipfs/${link}`;
}

export function getTimezone(current: number) {
  const timezone = timezoneInt.find((timezone) => {
    if (timezone.value === current.toString()) {
      return timezone.label;
    }
  });
  return timezone?.label;
}
//TODO: move this in a global util file do it can be used anywhere.
export function formatDateToTimeAgo(inviteTimeStr: string) {
  const inviteTime = new Date(inviteTimeStr);
  const now = new Date();
  const timeDiff = Number(now) - Number(inviteTime);

  const minutes = Math.floor(timeDiff / 60000);
  const hours = Math.floor(timeDiff / 3600000);
  const days = Math.floor(timeDiff / 86400000);

  if (minutes < 1) {
    return "now";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

const customTwMerge = extendTailwindMerge({
  classGroups: {
    // FontSize group
    "font-size": [
      "text-heading_l",
      "text-heading_m",
      "text-heading_s",
      "text-subhead_l",
      "text-subhead_m",
      "text-subhead_s",
      "text-title_l",
      "text-title_m",
      "text-title_s",
      "text-label_l",
      "text-label_m",
      "text-label_s",
      "text-body_l",
      "text-body_m",
      "text-body_s",
    ],
    // Color group
    "text-color": [
      "text-accent-primary",
      "text-accent-secondary",
      "text-accent-on-primary",
      "text-accent-on-secondary",
      "text-text-primary",
      "text-text-secondary",
      "text-text-placeholder",
      "text-icon-primary",
      "text-icon-secondary",
      "text-state-error",
      "text-state-success",
      "text-state-warning",
      "text-state-info",
    ],
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
  // return twMerge(clsx(inputs))
}

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  return `${addr.substring(0, 8)}...`;
};

export function truncateMiddle(input: string, maxLength: number): string {
  // If the input string is shorter than or equal to the maxLength, return the original string
  if (input.length <= maxLength) {
    return input;
  }

  const charsToShow = maxLength - 3; // 3 for the ellipsis
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return (
    input.substr(0, frontChars) + "..." + input.substr(input.length - backChars)
  );
}

//convert a date into a format of 01.01.2023 for me

export function formatDate(stringDate: string | Date): string {
  const date = new Date(stringDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}.${month}.${day}`;
}

export function beginEndDates(
  beginDate: string | Date,
  endDate?: string | Date
): string {
  // const lang = useDictionary();
  // lang.beginEndDates.ongoing
  if (!beginDate) {
    return "Not Set Date";
  }

  return endDate
    ? `${formatDate(beginDate)} ~ ${formatDate(endDate)}`
    : `${formatDate(beginDate)} ~ 진행중`;
}

/* export function walletClientToSigner(walletClient: any) {
  const ethersWalletClient = {
    getAddress: async (): Promise<`0x${string}`> => {
      return (await walletClient?.account.address) ?? "";
    },
    signMessage: async (message: string): Promise<string> => {
      const signature = await walletClient?.signMessage({ message });
      return signature ?? "";
    },
  };

  const { signMessage, ...rest } = walletClient ?? {};

  return {
    ...ethersWalletClient,
    ...{ ...rest },
  };
} */

export function walletToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain?.contracts?.ensRegistry?.address,
  };
  //@ts-ignore
  const provider = new providers.Web3Provider(transport, network);
  //@ts-ignore
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () => (walletClient ? walletToSigner(walletClient) : undefined),
    [walletClient]
  );
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;

  if (!account) return undefined;
  if (!chain) return undefined;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address) as Signer;
  return signer;
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient({ chainId });
  if (!walletClient) return undefined;
  return walletClientToSigner(walletClient);
}

export function didToAddress(did: string) {
  return did.split(":")[1];
}

const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export function isValidLink(s: string): boolean {
  return URL_REGEX.test(s);
}

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

type Job = {
  id: number;
  groupName: string;
  name: string;
};

export const jobList: Job[] = [
  { id: 1, groupName: "Developer", name: "Front-end Developer" },
  { id: 2, groupName: "Developer", name: "Back-end Developer" },
  { id: 3, groupName: "Developer", name: "Data Scientist" },
  { id: 4, groupName: "Developer", name: "BI Engineer" },
  { id: 5, groupName: "Developer", name: "Data Engineer" },
  { id: 6, groupName: "Developer", name: "DBA" },
  { id: 7, groupName: "Developer", name: "Embeded Developer" },
  { id: 8, groupName: "Developer", name: "DevOps" },
  { id: 9, groupName: "Developer", name: "QA" },
  { id: 10, groupName: "Developer", name: "Android Developer" },
  { id: 11, groupName: "Developer", name: "IOS Developer" },
  { id: 12, groupName: "Developer", name: "Security Specialist" },
  { id: 13, groupName: "Developer", name: "Blockchain Developer" },
  { id: 14, groupName: "Developer", name: "AI Developer" },
  { id: 15, groupName: "Developer", name: "Game Developer" },
  { id: 16, groupName: "Developer", name: "System Analyst" },
  { id: 17, groupName: "Developer", name: "Full-stack Developer" },
  { id: 18, groupName: "Developer", name: "CIO" },
  { id: 19, groupName: "Developer", name: "CTO" },
  { id: 20, groupName: "Designer", name: "UI/UX Designer" },
  { id: 21, groupName: "Designer", name: "Graphic Designer" },
  { id: 22, groupName: "Designer", name: "Contents Designer" },
  { id: 23, groupName: "Designer", name: "Product Designer" },
  { id: 24, groupName: "Designer", name: "Game Art Designer" },
  { id: 25, groupName: "Designer", name: "NFT Art Designer" },
  { id: 27, groupName: "Designer", name: "Brand Designer" },
  { id: 28, groupName: "Designer", name: "UX Writer" },
  { id: 29, groupName: "Designer", name: "UX Researcher" },
  { id: 30, groupName: "Business", name: "Product Manager" },
  { id: 31, groupName: "Business", name: "Project Manager" },
  { id: 32, groupName: "Business", name: "Scrum Master" },
  { id: 33, groupName: "Business", name: "Business Development" },
  { id: 34, groupName: "Business", name: "Data Analyst" },
  { id: 35, groupName: "Business", name: "Sales Manager" },
  { id: 36, groupName: "Business", name: "CPO" },
  { id: 37, groupName: "Business", name: "Lead PM" },
  { id: 38, groupName: "Business", name: "Finance Manager" },
  { id: 39, groupName: "Business", name: "Tax Specialist" },
  { id: 40, groupName: "Business", name: "Certified Public Accountant" },
  { id: 41, groupName: "Business", name: "Internal Auditor" },
  { id: 42, groupName: "Business", name: "Bookkeeper" },
  { id: 43, groupName: "Business", name: "Treasury Manager" },
  { id: 44, groupName: "Business", name: "CFO" },
  { id: 45, groupName: "Business", name: "Strategic Planner" },
  { id: 46, groupName: "Business", name: "General Affairs" },
  { id: 47, groupName: "Business", name: "Communication Manager" },
  { id: 48, groupName: "Business", name: "CSO" },
  { id: 49, groupName: "Business", name: "COO" },
  { id: 50, groupName: "Marketing", name: "Community Manager" },
  { id: 51, groupName: "Marketing", name: "Performance Marketer" },
  { id: 52, groupName: "Marketing", name: "CMO" },
  { id: 53, groupName: "Marketing", name: "SNS Marketer" },
  { id: 54, groupName: "Marketing", name: "Influencer" },
  { id: 55, groupName: "Marketing", name: "Youtuber" },
  { id: 56, groupName: "HR", name: "HR Specialist" },
  { id: 57, groupName: "HR", name: "HR Coordinator" },
  { id: 58, groupName: "HR", name: "HR Analyst" },
  { id: 59, groupName: "HR", name: "HR Manager" },
  { id: 60, groupName: "HR", name: "Talent Acquisition Specialist" },
  { id: 61, groupName: "HR", name: "DEIB Officer" },
  { id: 62, groupName: "HR", name: "Comp & Ben Specialist" },
  { id: 63, groupName: "HR", name: "HR Data Scientist" },
  { id: 64, groupName: "HR", name: "Learning & Development Manager" },
  { id: 65, groupName: "HR", name: "Head of Digital HR" },
  { id: 66, groupName: "HR", name: "Head Hunter" },
];

export async function fetchWithAuthorization(
  url: string,
  options: RequestInit,
  githubAccess: string,
  accessToken: string
) {
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("x-additional-token", `${githubAccess}`);
  headers.set("x-api-key", "API_KEY");

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Fetch error: ${errorData.message || response.statusText}`);
  }

  return response.json();
};


export function smallDate(inputDate: string): string {
  const date = new Date(inputDate);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${month} ${year}`;
}


export function formatTimestampToTimeAgo(timestamp: number) {
  const now = Date.now();
  const timeDiff = now  - timestamp /  1000000;
  
  const minutes = Math.floor(timeDiff / 60000);
  const hours = Math.floor(timeDiff / 3600000);
  const days = Math.floor(timeDiff / 86400000);

  if (minutes < 1) {
    return "now";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}
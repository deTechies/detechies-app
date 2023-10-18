"use client";
import Link from "next/link";

import Image from "next/image";
import { useConnect } from "wagmi";

export default function OnboardPage() {

  const { connect, connectors } = useConnect();
  return (
    <div className="flex flex-col space-y-4 gap-4">
      {connectors.map((connector) => (
        <div
          key={connector.id}
          className="text-lg font-semibold border border-gray-300 rounded-sm px-6 py-4 flex gap-6 hover:bg-gray-200 items-center cursor-pointer"
          onClick={() => connect({ connector })}
        >
          <Image
            src={`/images/icons/` + connector.name.toLocaleLowerCase() + `.png`}
            height={44}
            width={44}
            alt={connector.name}
          />
          {connector.name == "Web3Auth" ? "Social Login" : connector.name}
        </div>
      ))}
    </div>
  );
};


const FinishedCard = () => (
  <div className="flex flex-col space-y-4">
    <span>Please continue and enjoy your career NFT.</span>
    <Link href="/dashboard" className="text-blue-500">
      Go to Dashboard
    </Link>
  </div>
);

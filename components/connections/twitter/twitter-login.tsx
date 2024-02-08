"use client"


import { LucideTwitter, Twitter } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";



const TwitterLogin = () => {
  const { data: sessionData } = useSession() as any;
  const pathName = usePathname();


  const twitterAccess = sessionData?.twitter?.account;


  if (twitterAccess) {
    return (
        <span
          className="flex gap-2">
          <Twitter />
          {sessionData?.twitter.user.name}
          Succesfull connected
        </span>
      );
  }

  return (
    <button
      className="flex gap-2 text-sm items-center"
      onClick={() =>
        signIn("twitter", { callbackUrl: `http://localhost:3000/${pathName}` })
      }
    >
      <LucideTwitter />
      Twitter
    </button>
  );
};






export default TwitterLogin;

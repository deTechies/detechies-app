"use client"
import { Button } from "@/components/ui/button";


import { LucideGithub, LucideTwitter } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";



const TwitterLogin = () => {
  const { data: sessionData } = useSession() as any;
  const pathName = usePathname();


  const linkedinAccess = sessionData?.linkedin?.accessToken;


  if (linkedinAccess) {
    return (
        <Button
          className="w-full bg-black text-white flex gap-8"

        >
          <LucideGithub />
          Succesfull connected
        </Button>
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

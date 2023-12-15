"use client"
import { Button } from "@/components/ui/button";


import { LucideGithub, LucideLinkedin } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";



const LinkedinLogin = () => {
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
    <Button
      className="flex gap-8 text-sm"
      onClick={() =>
        signIn("linkedin", { callbackUrl: `http://localhost:3000/${pathName}` })
      }
    >
      <LucideLinkedin />
      Linkedin
    </Button>
  );
};






export default LinkedinLogin;

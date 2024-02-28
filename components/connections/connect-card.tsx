"use client";

import { Button } from "@/components/ui/button";
import { postServer } from "@/lib/data/postRequest";
import { formatDate } from "@/lib/utils";
import { Replace, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

interface ConnectionItem {
  image: string;
  name: string;
  label: string;
  connection: string;
  sublabel: string | null | undefined;
}
interface IConnectionCardProps {
  item: ConnectionItem;
  connected: boolean;
  verified?: any;
  user?: any;
}

export default function ConnectCard({
  item,
  connected = false,
  user,
  verified,
}: IConnectionCardProps) {
  const pathName = usePathname();
  const router = useRouter();

  async function verifyMe() {
    console.log("verifyMe");

    const postData = JSON.stringify({
      social: item.connection,
      user_id: user.id,
      display_name: user.display_name,
      verified: true,
    });
    
    //do it differently and get the right profile with more detailed information
    const result = await postServer("/socials", postData);

    if (result) {
      toast({
        description: "You successfully verified your account, Congratutations",
      });
      router.refresh();
      return;
    }

    toast({
      description: "failed to verify your account",
    });
  }
  return (
    <div
      className={`flex border  rounded-sm p-2 pb-4 gap-6 px-4 py-2 bg-background-layer-1 w-full items-center justify-evenly`}
    >
      <div className="flex flex-col justify-start relative aspect-square w-[32px] h-[32px] rounded-full ">
        <Image
          src={item.image}
          fill={true}
          sizes={"48"}
          alt={item.name}
          className="aspect-square"
        />
      </div>
      <div className="flex flex-row items-center gap-2">
        {verified ? (
          <div className="flex flex-col gap-1">
            <p className="text-title_s capitalize">{verified.display_name}</p>
            <p className="text-label_s">{formatDate(verified.last_updated)}</p>
          </div>
        ) : 
        connected ? (
          <>
          <div className="flex gap-2">
            
          <Button
            className="text-label_s text-text-primary"
            size="icon"
            variant="secondary"
            onClick={verifyMe}
          >
            <ShieldCheck />
          </Button>
          <Button size="icon" variant="secondary" 
           onClick={() =>
            signIn(item.connection, {
              callbackUrl: `http://localhost:3000/${pathName}`,
            })
          }
          >
            <Replace />
          </Button>  
          </div>
          
          </>
        ) : (
          <>
          <Button
            className="text-label_s text-text-secondary"
            variant={"secondary"}
            size="sm"
            onClick={() =>
              signIn(item.connection, {
                callbackUrl: `http://localhost:3000/${pathName}`,
              })
            }
          >
            Connect
          </Button>
          </>
        )}
      </div>
    </div>
  );
}

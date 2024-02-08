"use client";

import { Button } from "@/components/ui/button";
import { postServer } from "@/lib/data/postRequest";
import { formatDate } from "@/lib/utils";
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
      display_name: user.name,
      verified: true,
    });
    const result = await postServer("/socials", postData);

    if (result) {
      toast({
        description: "verified your account congratutations",
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
      className={`flex border border-border-div rounded-sm p-4 pb-5 gap-4 bg-background-layer-1 w-full`}
    >
      <div className="flex justify-center relative aspect-square w-[48px] h-[48px] rounded-full ">
        <Image
          src={item.image}
          fill={true}
          sizes={"48"}
          alt={item.name}
          className="aspect-square"
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        {verified ? (
          <>
            <p className="text-title_s">{verified.display_name}</p>
            <p className="text-label_s">{formatDate(verified.last_updated)}</p>
          </>
        ) : 
        connected ? (
          <>
          <p className="text-title_s">{user.display_name}</p>
          <Button
            className="text-label_s text-text-primary"
            size="sm"
            variant="secondary"
            onClick={verifyMe}
          >
            Verify
          </Button>
          </>
        ) : (
          <>
          <p className="text-title_s">{item.name}</p>
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
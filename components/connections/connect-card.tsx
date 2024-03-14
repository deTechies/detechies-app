"use client";

import { Button } from "@/components/ui/button";
import { deleteServer, postServer } from "@/lib/data/postRequest";
import { Trash2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Switch } from "../ui/switch";
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
  const [isPublic, setIsPublic] = useState(verified ? verified.public : false);

  async function verifyMe() {


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

  async function removeConnection() {
    const result = await deleteServer(`/socials/${verified.id}`);
    if (result) {
      toast({
        description: "You successfully removed your account, Congratutations",
      });
      router.refresh();
      return;
    }
  }

  return (
    <div
      className={`flex border border-border-div rounded-md p-4 gap-6  bg-background-layer-1 w-full items-center justify-between`}
    >
      <div className="flex gap-3 items-center">
        <div className="relative aspect-square w-[32px] h-[32px] rounded-full ">
          <Image
            src={item.image}
            fill={true}
            sizes={"48"}
            alt={item.name}
            className="aspect-square"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium capitalize">{item.name}</p>
          {verified && (
            <p className="text-sm text-text-secondary">
              {verified.display_name}
            </p>
          )}
          {
            !verified && connected && (
              <p className="text-sm text-text-secondary">
                {user.display_name}
              </p>
            )
          }
        </div>
      </div>

      <div className="flex flex-row items-center gap-5">
        {verified ? (
          <div className="flex items-center gap-2">
            <Switch
              checked={isPublic}
              onCheckedChange={(value) => {
                setIsPublic(value);
              }}
            />
            <Button
              variant="ghost"
              className="text-text-secondary"
              onClick={removeConnection}
            >
              <Trash2 />
            </Button>
          </div>
        ) : connected ? (
          <>
            <div className="flex gap-5">
              <Button
                className="text-label_s text-text-primary"
                size="sm"
                variant="secondary"
                onClick={verifyMe}
              >
                Import
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  signIn(item.connection, {
                    callbackUrl: `http://localhost:3000/${pathName}`,
                  })
                }
              >
                Change
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

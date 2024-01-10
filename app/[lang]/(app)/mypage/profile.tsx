"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { useToast } from "@/components/ui/use-toast";
import { updateUserAvatar } from "@/lib/data/user";
import { User } from "@/lib/interfaces";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Profile({
  text,
  profile,
}: {
  text: any;
  profile: User;
}) {
  const pathName = usePathname();
  const searchParams = useSearchParams()!;
  const [refresh, setRefresh] = useState<boolean>(false);
  const { toast } = useToast();

  const clothes = searchParams.get("clothes") || profile.avatar[0];
  const face = searchParams.get("face") || profile.avatar[1];
  const head = searchParams.get("eyes") || profile.avatar[2];
  const hair = searchParams.get("hair") || profile.avatar[3];
  const hashes = [
    clothes,
    face,
    head,
    hair,
    profile.avatar[4],
    profile.avatar[5],
  ];

  const updateAvatar = async () => {
    setRefresh(true);

    const avatar = [
      clothes,
      face,
      head,
      hair,
      profile.avatar[4],
      profile.avatar[5],
    ];

    const result = await updateUserAvatar(avatar);

    toast({
      title: "Avatar updated",
      description: <pre>{JSON.stringify(result, null, 2)}</pre>,
    });

    setRefresh(false);
  };

  if (pathName.includes("/mypage/avatar")) {
    return (
      <Card className="flex flex-col gap-5 w-[400px]">
        <div className="w-full aspect-square relative m-0 z-0 bg-gradient-to-b from-[#7CFDCE] to-[#98E2F9] rounded-md">
          <IPFSImageLayer hashes={profile.avatar ? hashes : []} />
        </div>
        <div className="flex gap-4 ">
          <Button size="lg" variant="secondary">
            Reset
          </Button>
          <Button size="lg" onClick={updateAvatar}
            loading={refresh}
          >
            Save
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-5 w-[400px]">
      <div className="flex">
        <div>
          <Image
            src={
              profile?.avatar_link
                ? profile.avatar_link
                : "https://ipfs.io/ipfs/bafybeiaw4okk76pbpihg4tyfnrufkizy4f6y2g3xlbisvq6zk5xxuhrrju"
            }
            width={120}
            height={120}
            className=" rounded-sm bg-background-layer-2"
            alt={"avatar"}
          />
        </div>
        <div className="flex flex-col justify-between basis-auto ml-4">
          <div className="flex flex-col gap-3">
            <p className="text-title_l"># {profile.display_name}</p>
            <span className="text-title_m mb-4">
              {profile.profile_details?.full_name
                ? "Name: " + profile.profile_details?.full_name
                : "Name: Not Set"}
            </span>
          </div>
          <Button disabled variant={"secondary"} size="sm">
            {text?.avatar_settings}
          </Button>
        </div>
      </div>

      <div className="grid px-5 py-3  border rounded-sm border-border-div">
        <div className="flex p-1">
          <div className="basis-1/2 gap-2">
            <p className="text-subhead_s font-semibold">2,334</p>
            <p className="text-title_m text-text-secondary capitalize">
              {text?.following}
            </p>
          </div>
          <div className="basis-1/2">
            <p className="text-subhead_s font-semibold">15</p>
            <p className="text-title_m text-text-secondary capitalize">
              {text?.followers}
            </p>
          </div>
        </div>
      </div>

      <div className="grid border rounded-sm border-border-div">
        <div className="flex justify-between p-5 items-center">
          <div className="flex items-center mr-4 text-nowrap">
            {text?.address}
          </div>
          <a
            href={`https://polygonscan.com/address/${profile.wallet}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge>
              {profile.wallet.slice(0, 5) + "..." + profile.wallet.slice(-4)}
            </Badge>
          </a>
        </div>
      </div>
    </Card>
  );
}

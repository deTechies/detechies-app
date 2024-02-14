"use client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { updateUserAvatar } from "@/lib/data/user";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AvatarUpdate = ({ profile }: any) => {
  const pathName = usePathname();
  const searchParams = useSearchParams()!;

  const [avatar, setAvatar] = useState(profile.avatar);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data, update } = useSession();

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

  const handleUpdateAvatar = async () => {
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
      description: "settings avatar",
    });

    if (!data || !data.web3.user) {
      return;
    }
    await update({
      ...data,
      web3: {
        ...data.web3,
        user: {
          ...data?.web3?.user,
          avatar: avatar,
        },
      },
    });

    setRefresh(false);
  };

  // Component UI
  return (
    <Card className="flex flex-col w-full gap-5">
      <div className="relative max-w-[320px] aspect-square bg-background-layer-2 rounded-[8px]">
        <IPFSImageLayer hashes={profile.avatar ? hashes : []} />
      </div>

      <div className="flex gap-4">
        <Button
          size="lg"
          variant="secondary"
          onClick={() => setAvatar(profile.avatar)}
        >
          Reset
        </Button>
        <Button size="lg" onClick={handleUpdateAvatar} loading={refresh}>
          Save
        </Button>
      </div>
    </Card>
  );
};

export default AvatarUpdate;

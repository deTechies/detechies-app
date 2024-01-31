"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { useToast } from "@/components/ui/use-toast";
import { updateUserAvatar } from "@/lib/data/user";
import { User } from "@/lib/interfaces";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDictionary } from "@/lib/dictionaryProvider";

export default function ProfilePageCard({
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

  const dictionary = useDictionary();

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

  const reset = () => {
    router.replace(pathName);
  };

  if (pathName.includes("/mypage/avatar")) {
    return (
      <Card className="flex w-full flex-col gap-5">
        <div className="relative max-w-[320px] aspect-square bg-gradient-to-b from-[#7CFDCE] to-[#98E2F9] rounded-[8px]">
          <IPFSImageLayer hashes={profile.avatar ? hashes : []} />
        </div>
        <div className="flex gap-4">
          <Button size="lg" variant="secondary" onClick={reset}>
            {dictionary.mypage.edit_avatar.reset}
          </Button>
          <Button size="lg" onClick={updateAvatar} loading={refresh}>
          {dictionary.mypage.edit_avatar.save}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-5 w-full pt-[24px] pb-[28px] px-5 max-w-[376px]">
      <div className="flex gap-4">
        <div className="relative w-[120px] aspect-square rounded-[8px] bg-background-layer-2">
          <IPFSImageLayer hashes={profile.avatar ? hashes : []} />
        </div>
        <div className="flex flex-col justify-between basis-auto mt-1">
          <div className="flex flex-col gap-3">
            <p className="text-title_l">#{profile.display_name}</p>
            <div className="text-title_m mb-4">
              <span className="capitalize">{text.name}: </span>
              <span className="ml-">
                {profile.profile_details?.full_name
                  ? profile.profile_details?.full_name
                  : "Not Set"}
              </span>
            </div>
          </div>
          <Link href="/mypage/avatar" passHref>
            <Button variant={"secondary"} size="sm">
              {text?.avatar_settings}
            </Button>
          </Link>
        </div>
      </div>
                  
      <div className="flex flex-col gap-3">
      <div className="grid pt-3 pb-4 px-5  border rounded-sm border-border-div">
        <div className="flex">
          <div className="basis-1/2 gap-2 flex flex-col">
            <p className="text-title_l font-semibold">0</p>
            <p className="text-title_s text-text-secondary capitalize">
              {text?.following}
            </p>
          </div>
          <div className="basis-1/2 flex flex-col gap-2">
            <p className="text-title_l font-semibold">0</p>
            <p className="text-title_s text-text-secondary capitalize">
              {text?.followers}
            </p>
          </div>
        </div>
      </div>

      <div className="grid border rounded-sm border-border-div">
        <div className="flex justify-between px-5 py-7 items-center gap-4">
          <div className="flex items-center text-nowrap text-title_m">
            {text?.address}
          </div>
          <Link
            href={`https://polygonscan.com/address/${profile.wallet}`}
            target="_blank"
            passHref
          >
            <Button variant={"secondary"} size="ts">
              {profile.wallet.slice(0, 5) + "..." + profile.wallet.slice(-4)}
            </Button>
          </Link>
        </div>
      </div>
      </div>
    </Card>
  );
}

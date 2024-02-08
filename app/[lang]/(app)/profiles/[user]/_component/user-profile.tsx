import UserChat from "@/components/extra/chat/user-chat";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { Address } from "wagmi";

export default function UserProfile({
  profile,
  text,
}: {
  profile: any;
  text: any;
}) {
  return (
    <Card className="flex flex-col gap-5 w-[328px]">
      <div className="flex flex-col gap-4">
        <div className="relative w-full rounded-md aspect-square bg-background-layer-2">
          <IPFSImageLayer
            hashes={profile.avatar ? profile.avatar : defaultAvatar}
          />
        </div>
        <div className="flex flex-col justify-between ml-4 basis-auto">
          <div className="flex flex-col gap-3">
            <p className="text-title_l"># {profile.display_name}</p>
          </div>
        </div>
      </div>

      <div className="grid px-5 py-3 border rounded-sm border-border-div">
        <div className="flex p-1">
          <div className="gap-2 basis-1/2">
            <p className="font-semibold text-subhead_s">0</p>
            <p className="capitalize text-title_m text-text-secondary">
              {text?.following}
            </p>
          </div>
          <div className="basis-1/2">
            <p className="font-semibold text-subhead_s">0</p>
            <p className="capitalize text-title_m text-text-secondary">
              {text?.followers}
            </p>
          </div>
        </div>
      </div>

      <div className="grid border rounded-sm border-border-div">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center mr-4 text-nowrap">
            {text?.address}
          </div>
          <a
            href={`https://polygonscan.com/address/${profile.wallet}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge>
              {profile.wallet?.slice(0, 5) + "..." + profile.wallet.slice(-4)}
            </Badge>
          </a>
        </div>
      </div>
      <UserChat to={profile.address as Address} />
    </Card>
  );
}
